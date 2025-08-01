import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu } from "@/components/ui/sidebar";
import { NavigationRoute } from '@/lib/navigationRoutes';
import { AppSidebarMenuItem } from './SidebarMenuItem';
import { cn } from '@/lib/utils';

interface SidebarContentProps {
    ungroupedRoutes: NavigationRoute[];
    groupedRoutes: Record<string, NavigationRoute[]>;
    isOpen: boolean;
    expandedItems: Record<string, boolean>;
    onToggle: (path: string) => void;
}

export function AppSidebarContent({
    ungroupedRoutes,
    groupedRoutes,
    isOpen,
    expandedItems,
    onToggle
}: SidebarContentProps) {
    return (
        <SidebarContent className={cn(
            "bg-white dark:bg-zinc-900 my-2 gap-4",
            !isOpen && "gap-1"
        )}
        >
            {ungroupedRoutes.length > 0 && (
                <SidebarGroup>
                    <SidebarMenu>
                        {ungroupedRoutes.map((route) => {
                            const routeKey = route.path || route.href || route.label;
                            return (
                                <AppSidebarMenuItem
                                    key={routeKey}
                                    route={route}
                                    isOpen={isOpen}
                                    isExpanded={expandedItems[routeKey] || false}
                                    onToggle={onToggle}
                                />
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            )}
            {Object.entries(groupedRoutes).map(([group, routes]) => (
                <SidebarGroup key={group}>
                    <SidebarGroupLabel
                        className={cn(
                            "flex items-center justify-between px-3 py-2 text-sm font-medium",
                            "text-zinc-500 dark:text-zinc-400 select-none",
                            !isOpen && "hidden"
                        )}
                    >
                        <span>{group}</span>
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="mt-1">
                        <SidebarMenu>
                            {routes.map((route) => {
                                const routeKey = route.path || route.href || route.label;
                                return (
                                    <AppSidebarMenuItem
                                        key={routeKey}
                                        route={route}
                                        isOpen={isOpen}
                                        isExpanded={expandedItems[routeKey] || false}
                                        onToggle={onToggle}
                                    />
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            ))}
        </SidebarContent>
    );
}