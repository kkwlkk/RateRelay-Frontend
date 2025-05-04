import { SidebarFooter, SidebarSeparator } from "@/components/ui/sidebar";
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { LogOut, Settings, HelpCircle } from 'lucide-react';
import { User } from '@/types/User';
import { cn } from '@/lib/utils';

interface SidebarFooterProps {
    isOpen: boolean;
    user: User | null;
    onLogout: () => void;
    onSettings?: () => void;
    onHelp?: () => void;
}

export function AppSidebarFooter({
    isOpen,
    user,
    onLogout,
    onSettings,
    onHelp
}: SidebarFooterProps) {
    return (
        <SidebarFooter className="mt-auto bg-white dark:bg-zinc-900 p-2">
            <SidebarSeparator className="bg-zinc-200 dark:bg-zinc-800 mx-0 mb-2" />
            <div className={cn(
                "px-2 pb-2",
                isOpen ? "space-y-2" : "flex flex-col items-center space-y-2"
            )}>
                {isOpen && (onSettings || onHelp) && (
                    <div className="flex gap-1">
                        {onSettings && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "flex-1 justify-start h-8 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50 transition-colors",
                                    !isOpen && "rounded-full"
                                )}
                                onClick={onSettings}
                            >
                                <Settings className="h-4 w-4 mr-2" />
                                Settings
                            </Button>
                        )}
                        {onHelp && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "flex-1 justify-start h-8 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/50 transition-colors",
                                    !isOpen && "rounded-full"
                                )}
                                onClick={onHelp}
                            >
                                <HelpCircle className="h-4 w-4 mr-2" />
                                Help
                            </Button>
                        )}
                    </div>
                )}
                <div className={cn(
                    "flex items-center",
                    isOpen ? "gap-3" : "justify-center"
                )}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50 transition-colors",
                                    isOpen ? "flex-1 justify-start h-auto p-1 px-2" : "h-8 w-8 p-0",
                                    !isOpen && "rounded-full"
                                )}
                            >
                                <Avatar className="h-8 w-8 bg-zinc-100 dark:bg-zinc-800">
                                    <AvatarFallback className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">
                                        {user?.username?.charAt(0)?.toUpperCase() || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                {isOpen && user && (
                                    <div className="flex flex-col items-start text-left ml-2">
                                        <span className="text-sm font-medium">
                                            {user.username}
                                        </span>
                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
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
                                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{user?.username}</span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{user?.email}</span>
                                </div>

                                {(onSettings || onHelp) && (
                                    <>
                                        <div className="flex flex-col gap-1">
                                            {onSettings && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className={cn(
                                                        "w-full justify-start text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100",
                                                        "dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50 transition-colors",
                                                        "px-2 py-1",
                                                    )}
                                                    onClick={() => {
                                                        onSettings();
                                                        document.body.click();
                                                    }}
                                                >
                                                    <Settings className="h-4 w-4 mr-2" />
                                                    Settings
                                                </Button>
                                            )}
                                            {onHelp && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="w-full justify-start text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/50 transition-colors"
                                                    onClick={() => {
                                                        onHelp();
                                                        document.body.click();
                                                    }}
                                                >
                                                    <HelpCircle className="h-4 w-4 mr-2" />
                                                    Pomoc i wsparcie
                                                </Button>
                                            )}
                                        </div>
                                    </>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-colors",
                                        "px-2 py-1"
                                    )}
                                    onClick={() => {
                                        onLogout();
                                        document.body.click();
                                    }}
                                >
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Wyloguj
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    {isOpen && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 transition-colors"
                            onClick={onLogout}
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                {!isOpen && (onSettings || onHelp) && (
                    <div className="flex flex-col gap-1">
                        {onSettings && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
                                onClick={onSettings}
                            >
                                <Settings className="h-4 w-4" />
                            </Button>
                        )}
                        {onHelp && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800/50 transition-colors"
                                onClick={onHelp}
                            >
                                <HelpCircle className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </SidebarFooter>
    );
}