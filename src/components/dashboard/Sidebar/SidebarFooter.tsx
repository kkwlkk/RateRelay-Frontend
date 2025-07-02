import { SidebarFooter, SidebarSeparator, useSidebar } from "@/components/ui/sidebar";
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { HelpCircle, LogOut, Settings } from 'lucide-react';
import { User } from '@/types/User';
import { cn } from '@/lib/utils';

interface SidebarFooterProps {
    isOpen: boolean;
    user: User | null;
    onLogout: () => void;
    onSettings?: () => void;
    onHelp?: () => void;
}

interface ActionButtonConfig {
    icon: React.ElementType;
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive';
}

export function AppSidebarFooter({
    isOpen,
    user,
    onLogout,
    onSettings,
    onHelp
}: SidebarFooterProps) {
    const { isMobile } = useSidebar();
    const showExpandedContent = isMobile || isOpen;

    const actionButtons: ActionButtonConfig[] = [
        ...(onSettings ? [{
            icon: Settings,
            label: 'Ustawienia',
            onClick: onSettings
        }] : []),
        ...(onHelp ? [{
            icon: HelpCircle,
            label: 'Pomoc i wsparcie',
            onClick: onHelp
        }] : [])
    ];

    const logoutButton: ActionButtonConfig = {
        icon: LogOut,
        label: 'Wyloguj',
        onClick: onLogout,
        variant: 'destructive'
    };

    const getButtonStyles = (variant: 'default' | 'destructive' = 'default') => {
        const baseStyles = "transition-colors";
        
        if (variant === 'destructive') {
            return cn(
                baseStyles,
                "text-red-600 hover:text-red-700 hover:bg-red-50",
                "dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
            );
        }
        
        return cn(
            baseStyles,
            "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100",
            "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50"
        );
    };

    const renderActionButton = (config: ActionButtonConfig) => {
        const { icon: Icon, label, onClick, variant } = config;
        
        return (
            <Button
                key={label}
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", getButtonStyles(variant))}
                onClick={onClick}
            >
                <Icon className="h-4 w-4" />
            </Button>
        );
    };

    const renderPopoverActionButton = (config: ActionButtonConfig) => {
        const { icon: Icon, label, onClick, variant } = config;
        
        return (
            <Button
                key={`popover-${label}`}
                variant="ghost"
                size="sm"
                className={cn(
                    "w-full justify-start px-2 py-1",
                    getButtonStyles(variant)
                )}
                onClick={() => {
                    onClick();
                    document.body.click();
                }}
            >
                <Icon className="h-4 w-4 mr-2" />
                {label}
            </Button>
        );
    };

    return (
        <SidebarFooter className="mt-auto bg-white dark:bg-zinc-900 p-2">
            <SidebarSeparator className="bg-zinc-200 dark:bg-zinc-800 mx-0 mb-2" />
            <div className={cn(
                "px-2 pb-2 transition-all duration-200",
                showExpandedContent ? "space-y-2" : "flex flex-col items-center space-y-2"
            )}>
                {showExpandedContent && actionButtons.length > 0 && (
                    <div className="flex flex-col space-y-1">
                        {actionButtons.map(config => (
                            <Button
                                key={config.label}
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "flex-1 justify-start h-8 px-3 py-2",
                                    getButtonStyles(config.variant)
                                )}
                                onClick={config.onClick}
                            >
                                <config.icon className="h-4 w-4 mr-2" />
                                {config.label}
                            </Button>
                        ))}
                    </div>
                )}

                {showExpandedContent ? (
                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        getButtonStyles(),
                                        "flex-1 justify-start h-auto p-2 min-h-[40px]"
                                    )}
                                >
                                    <Avatar className="h-8 w-8 bg-zinc-100 dark:bg-zinc-800">
                                        <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">
                                            {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                                        </AvatarFallback>
                                    </Avatar>
                                    {user && (
                                        <div className="flex flex-col items-start text-left ml-2 flex-1 min-w-0 max-w-24">
                                            <span className="text-sm font-medium truncate w-full">
                                                {user.username}
                                            </span>
                                            <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate w-full">
                                                {user.email}
                                            </span>
                                        </div>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-56 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                                align="start"
                                side="top"
                                sideOffset={8}
                                collisionPadding={16}
                                avoidCollisions={true}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col px-2 py-1">
                                        <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                            {user?.username}
                                        </span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                            {user?.email}
                                        </span>
                                    </div>

                                    {actionButtons.length > 0 && (
                                        <div className="flex flex-col gap-1">
                                            {actionButtons.map(renderPopoverActionButton)}
                                        </div>
                                    )}

                                    {renderPopoverActionButton(logoutButton)}
                                </div>
                            </PopoverContent>
                        </Popover>
                        
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                                "h-8 w-8 shrink-0",
                                getButtonStyles('destructive')
                            )}
                            onClick={onLogout}
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    getButtonStyles(),
                                    "h-8 w-8 p-0 rounded-full"
                                )}
                            >
                                <Avatar className="h-8 w-8 bg-zinc-100 dark:bg-zinc-800">
                                    <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">
                                        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent
                            className="w-56 bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                            align="start"
                            side="top"
                            sideOffset={8}
                            collisionPadding={16}
                            avoidCollisions={true}
                        >
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col px-2 py-1">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">
                                        {user?.username}
                                    </span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        {user?.email}
                                    </span>
                                </div>

                                {actionButtons.length > 0 && (
                                    <div className="flex flex-col gap-1">
                                        {actionButtons.map(renderPopoverActionButton)}
                                    </div>
                                )}

                                {renderPopoverActionButton(logoutButton)}
                            </div>
                        </PopoverContent>
                    </Popover>
                )}

                {!showExpandedContent && actionButtons.length > 0 && (
                    <div className="flex flex-col gap-1">
                        {actionButtons.map(renderActionButton)}
                    </div>
                )}
            </div>
        </SidebarFooter>
    );
}