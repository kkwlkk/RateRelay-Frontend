import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { NavigationRoute } from '@/lib/navigationRoutes';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

interface SidebarMenuItemProps {
    route: NavigationRoute;
    isOpen: boolean;
    isExpanded: boolean;
    onToggle: (path: string) => void;
}

export function AppSidebarMenuItem({ route, isOpen, isExpanded, onToggle }: SidebarMenuItemProps) {
    const pathname = usePathname();
    const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;
    const isActive = pathname === route.path || (route.subRoutes?.some(subRoute => pathname === subRoute.path) ?? false);

    const menuItemContent = (
        <SidebarMenuItem key={route.path}>
            <SidebarMenuButton
                asChild={!hasSubRoutes}
                isActive={isActive}
                onClick={hasSubRoutes ? () => onToggle(route.path) : undefined}
                className={cn(
                    "px-3 py-2 text-sm cursor-pointer",
                    "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                    "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                    isActive && "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100"
                )}
            >
                {hasSubRoutes ? (
                    <div className="flex w-full justify-between items-center">
                        <div className="flex items-center gap-2">
                            {route.icon && <route.icon className="h-4 w-4" />}
                            {isOpen && <span>{route.label}</span>}
                        </div>
                        <ChevronRightIcon
                            className={cn(
                                "h-4 w-4 transition-transform",
                                isExpanded ? "rotate-90" : ""
                            )}
                        />
                    </div>
                ) : (
                    <Link href={route.path} className="flex items-center gap-2 w-full">
                        {route.icon && <route.icon className="h-4 w-4" />}
                        <span>{route.label}</span>
                    </Link>
                )}
            </SidebarMenuButton>

            {hasSubRoutes && isExpanded && (
                <SidebarMenuSub>
                    {route.subRoutes?.map((subRoute) => (
                        <SidebarMenuSubItem key={subRoute.path}>
                            <SidebarMenuSubButton
                                asChild
                                isActive={pathname === subRoute.path}
                                className={cn(
                                    "px-3 py-2 text-sm",
                                    "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                                    "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                                    pathname === subRoute.path && "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100"
                                )}
                            >
                                <Link href={subRoute.path}>
                                    <span>{subRoute.label}</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            )}
        </SidebarMenuItem>
    );

    if (!isOpen) {
        return (
            <Tooltip key={route.path}>
                <TooltipTrigger asChild>
                    {menuItemContent}
                </TooltipTrigger>
                <TooltipContent side="right" align="center" className={cn(
                    "bg-zinc-900 dark:bg-zinc-800 text-zinc-100 border-zinc-800 dark:border-zinc-700"
                )}>
                    {route.label}
                </TooltipContent>
            </Tooltip>
        );
    }

    return menuItemContent;
}