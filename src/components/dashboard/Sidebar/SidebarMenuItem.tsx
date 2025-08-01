import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRightIcon } from 'lucide-react';
import { SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from "@/components/ui/sidebar";
import { NavigationRoute } from '@/lib/navigationRoutes';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../../ui/tooltip';

interface SidebarMenuItemProps {
    route: NavigationRoute;
    isOpen: boolean;
    isExpanded: boolean;
    onToggle: (path: string) => void;
}

export function AppSidebarMenuItem({ route, isOpen, isExpanded, onToggle }: SidebarMenuItemProps) {
    const pathname = usePathname();
    const hasSubRoutes = route.subRoutes && route.subRoutes.length > 0;
    const isActive = pathname === route.path;
    const isChildActive = route.subRoutes?.some(subRoute => pathname === subRoute.path) ?? false;
    const routeKey = route.path || route.href || route.label;
    const isExternalLink = !!route.href;

    const handleClick = (e: React.MouseEvent) => {
        if (hasSubRoutes && isOpen) {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const arrowAreaStart = rect.width - 64;

            if (clickPosition > arrowAreaStart) {
                e.preventDefault();
                onToggle(routeKey);
                return;
            }
        }
    };

    const renderLinkContent = () => (
        <div className={cn(
            "flex items-center gap-2 w-full",
            isOpen ? "justify-between" : "justify-center"
        )}>
            <div className={cn(
                "flex items-center gap-2",
                !isOpen && "justify-center"
            )}>
                {route.icon && <route.icon className="h-4 w-4 flex-shrink-0" />}
                {isOpen && <span>{route.label}</span>}
                {isOpen && route.labelIcon && (
                    <route.labelIcon className="h-3 w-3 flex-shrink-0" />
                )}
            </div>
            {hasSubRoutes && isOpen && (
                <ChevronRightIcon
                    className={cn(
                        "h-4 w-4 transition-transform flex-shrink-0",
                        isExpanded ? "rotate-90" : ""
                    )}
                />
            )}
        </div>
    );

    const menuButton = (
        <SidebarMenuButton
            asChild
            isActive={isActive || isChildActive}
            className={cn(
                "text-sm cursor-pointer relative",
                "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                (isActive || isChildActive) && "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100",
                isOpen ? "px-3 py-2" : "p-2 w-10 h-10 justify-center"
            )}
        >
            {isExternalLink ? (
                <a
                    href={routeKey}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClick}
                >
                    {renderLinkContent()}
                </a>
            ) : (
                <Link href={routeKey} onClick={handleClick}>
                    {renderLinkContent()}
                </Link>
            )}
        </SidebarMenuButton>
    );

    const menuButtonWithTooltip = !isOpen ? (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {menuButton}
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    align="center"
                    className={cn(
                        "bg-zinc-900 dark:bg-zinc-800 text-zinc-100 border-zinc-800 dark:border-zinc-700",
                        "ml-1"
                    )}
                    sideOffset={8}
                >
                    {route.label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    ) : menuButton;

    const renderSubMenuLink = (subRoute: NavigationRoute) => {
        const subRouteKey = subRoute.path || subRoute.href || subRoute.label;
        const isSubExternal = !!subRoute.href;

        return isSubExternal ? (
            <a
                href={subRouteKey}
                target="_blank"
                rel="noopener noreferrer"
            >
                <span>{subRoute.label}</span>
            </a>
        ) : (
            <Link href={subRouteKey}>
                <span>{subRoute.label}</span>
            </Link>
        );
    };

    return (
        <SidebarMenuItem key={route.path}>
            {menuButtonWithTooltip}

            {hasSubRoutes && isExpanded && isOpen && (
                <SidebarMenuSub>
                    {route.subRoutes?.map((subRoute) => (
                        <SidebarMenuSubItem key={subRoute.path || subRoute.href}>
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
                                {renderSubMenuLink(subRoute)}
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSub>
            )}
        </SidebarMenuItem>
    );
}