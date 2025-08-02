import { useAuth } from '@/contexts/AuthContext';
import { useLocalStorage } from 'usehooks-ts';
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { dashboardRoutes, NavigationRoute } from '@/lib/navigationRoutes';
import { AppSidebarHeader } from './SidebarHeader';
import { AppSidebarContent } from './SidebarContent';
import { AppSidebarFooter } from './SidebarFooter';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { hasPermission } from '@/utils/accountUtils';
import { useModalStore } from '@/contexts/ModalStoreContext';
import { HelpModal } from '@/components/modals/HelpModal';

export function AppSidebar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { open, isMobile } = useSidebar();
    const { openModal } = useModalStore();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const filterRoutesByPermissions = (routes: NavigationRoute[]): NavigationRoute[] => {
        return routes.filter(route => {
            if (!route.requiredPermission) return true;
            if (!user?.permissions || !user.mappedPermissions) return false;

            if (!hasPermission(user.mappedPermissions, route.requiredPermission)) {
                return false;
            }

            if (route.subRoutes) {
                const filteredSubRoutes = filterRoutesByPermissions(route.subRoutes);
                route.subRoutes = filteredSubRoutes;
                return filteredSubRoutes.length > 0;
            }

            return true;
        });
    };

    const filteredRoutes = filterRoutesByPermissions([...dashboardRoutes]);

    const getDefaultExpandedItems = () => {
        const defaultExpanded: Record<string, boolean> = {};
        filteredRoutes.forEach(route => {
            const routeKey = route.path || route.href || route.label;
            if (route.subRoutes) {
                defaultExpanded[routeKey] = true;
            }
        });
        return defaultExpanded;
    };

    const [expandedItems, setExpandedItems] = useLocalStorage<Record<string, boolean>>(
        'sidebar-expanded-items',
        getDefaultExpandedItems()
    );

    const shouldShowContent = isClient && (open || isMobile);

    const toggleSubMenu = (path: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    const { ungroupedRoutes, groupedRoutes } = filteredRoutes.reduce((acc, route) => {
        if (!route.section) {
            acc.ungroupedRoutes.push(route);
        } else {
            if (!acc.groupedRoutes[route.section]) {
                acc.groupedRoutes[route.section] = [];
            }
            acc.groupedRoutes[route.section].push(route);
        }
        return acc;
    }, {
        ungroupedRoutes: [] as NavigationRoute[],
        groupedRoutes: {} as Record<string, NavigationRoute[]>
    });

    const handleSettings = () => {
        router.push('/dashboard/settings');
    };

    const handleHelp = () => {
        openModal(HelpModal);
    };

    return (
        <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="!border-r !border-zinc-200 dark:!border-zinc-800 bg-white dark:bg-zinc-900"
        >
            <AppSidebarHeader isOpen={shouldShowContent} />
            <AppSidebarContent
                ungroupedRoutes={ungroupedRoutes}
                groupedRoutes={groupedRoutes}
                isOpen={shouldShowContent}
                expandedItems={expandedItems}
                onToggle={toggleSubMenu}
            />
            <AppSidebarFooter
                isOpen={shouldShowContent}
                user={user}
                onLogout={logout}
                onSettings={handleSettings}
                onHelp={handleHelp}
            />
        </Sidebar>
    );
}