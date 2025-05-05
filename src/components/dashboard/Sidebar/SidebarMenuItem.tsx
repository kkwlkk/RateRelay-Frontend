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
    const isActive = pathname === route.path;
    const isChildActive = route.subRoutes?.some(subRoute => pathname === subRoute.path) ?? false;

    const handleClick = (e: React.MouseEvent) => {
        if (hasSubRoutes) {

            const rect = e.currentTarget.getBoundingClientRect();
            const clickPosition = e.clientX - rect.left;
            const arrowAreaStart = rect.width - 64;

            if (clickPosition > arrowAreaStart) {
                e.preventDefault();
                onToggle(route.path);
            }
        }
    };

    const menuButton = (
        <SidebarMenuButton
            asChild
            isActive={isActive || isChildActive}
            className={cn(
                "px-3 py-2 text-sm cursor-pointer",
                "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                (isActive || isChildActive) && "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100"
            )}
        >
            <Link href={route.path} onClick={handleClick} className="flex items-center justify-between gap-2 w-full">
                <div className="flex items-center gap-2">
                    {route.icon && <route.icon className="h-4 w-4" />}
                    {isOpen && <span>{route.label}</span>}
                </div>
                {hasSubRoutes && isOpen && (
                    <ChevronRightIcon
                        className={cn(
                            "h-4 w-4 transition-transform",
                            isExpanded ? "rotate-90" : ""
                        )}
                    />
                )}
            </Link>
        </SidebarMenuButton>
    );

    const menuButtonWithTooltip = !isOpen && !hasSubRoutes ? (
        <Tooltip>
            <TooltipTrigger asChild>
                {menuButton}
            </TooltipTrigger>
            <TooltipContent side="right" align="center" className={cn(
                "bg-zinc-900 dark:bg-zinc-800 text-zinc-100 border-zinc-800 dark:border-zinc-700"
            )}>
                {route.label}
            </TooltipContent>
        </Tooltip>
    ) : menuButton;

    return (
        <SidebarMenuItem key={route.path}>
            {menuButtonWithTooltip}

            {hasSubRoutes && isExpanded && isOpen && (
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
}