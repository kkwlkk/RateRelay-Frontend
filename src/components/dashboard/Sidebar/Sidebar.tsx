import { useAuth } from '@/contexts/AuthContext';
import { useLocalStorage } from 'usehooks-ts';
import { Sidebar, useSidebar } from "@/components/ui/sidebar";
import { dashboardRoutes, NavigationRoute } from '@/lib/navigationRoutes';
import { AppSidebarHeader } from './SidebarHeader';
import { AppSidebarContent } from './SidebarContent';
import { AppSidebarFooter } from './SidebarFooter';
import { useRouter } from 'next/navigation';

export function AppSidebar() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [expandedItems, setExpandedItems] = useLocalStorage<Record<string, boolean>>('sidebar-expanded-items', {});
    const { open } = useSidebar();

    const toggleSubMenu = (path: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    const { ungroupedRoutes, groupedRoutes } = dashboardRoutes.reduce((acc, route) => {
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
        router.push('/dashboard/help');
    };

    return (
        <Sidebar
            variant="sidebar" 
            collapsible="icon" 
            className="!border-r !border-zinc-200 dark:!border-zinc-800 bg-white dark:bg-zinc-900"
        >
            <AppSidebarHeader isOpen={open} />
            <AppSidebarContent
                ungroupedRoutes={ungroupedRoutes}
                groupedRoutes={groupedRoutes}
                isOpen={open}
                expandedItems={expandedItems}
                onToggle={toggleSubMenu}
            />
            <AppSidebarFooter
                isOpen={open}
                user={user}
                onLogout={logout}
                onSettings={handleSettings}
                onHelp={handleHelp}
            />
        </Sidebar>
    );
}