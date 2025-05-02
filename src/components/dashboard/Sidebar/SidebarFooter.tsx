import { SidebarFooter } from "@/components/ui/sidebar";
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { LogOut } from 'lucide-react';
import { User } from '@/types/User';

interface SidebarFooterProps {
    isOpen: boolean;
    user: User | null;
    onLogout: () => void;
}

export function AppSidebarFooter({ isOpen, user, onLogout }: SidebarFooterProps) {
    return (
        <SidebarFooter className="mt-auto pb-4">
            <div className="flex flex-col gap-2">
                <Separator className="mb-2" />
                <div className="flex items-center gap-3">
                    <Popover>
                        <PopoverTrigger asChild className='hover:bg-transparent hover:text-muted-foreground' disabled={isOpen}>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback>
                                        {user?.username?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56" align="start">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{user?.username}</span>
                                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                                </div>
                                <Separator />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full justify-start gap-2"
                                    onClick={onLogout}
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Wyloguj</span>
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                    {isOpen && (
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{user?.username}</span>
                            <span className="text-xs text-muted-foreground">{user?.email}</span>
                        </div>
                    )}
                </div>
                {isOpen && (
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start gap-2 hover:bg-black/5 hover:text-muted-foreground"
                            onClick={onLogout}
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Wyloguj</span>
                        </Button>
                    </div>
                )}
            </div>
        </SidebarFooter>
    );
} 