import { ChevronDown, LogOut } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState } from "react"
import { User } from "@/types/User"

type OnboardingUserDropdownProps = {
    user: User | null,
    logout: () => Promise<void>
}

const OnboardingUserDropdown = ({ user, logout }: OnboardingUserDropdownProps) => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const getUserInitials = (username: string) => {
        return username.substring(0, 2).toUpperCase();
    };

    return (
        <div className="flex-shrink-0 ml-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-3 h-auto p-2 px-6 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                                {user?.username ? getUserInitials(user.username) : 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:flex flex-col items-start min-w-0">
                            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-40">
                                {user?.username || 'Użytkownik'}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                Konfiguracja
                            </span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-zinc-500 dark:text-zinc-400 ml-1" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 p-2 z-[105]">
                    <div className="flex items-center gap-3 px-2 py-3">
                        <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium">
                                {user?.username ? getUserInitials(user.username) : 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0 flex-1">
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                {user?.username || 'Użytkownik'}
                            </div>
                            <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                                {user?.email}
                            </div>
                            <div className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                                Zalogowany jako
                            </div>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 px-2 py-2 text-red-600 dark:text-red-400 focus:text-red-700 dark:focus:text-red-300 focus:bg-red-50 dark:focus:bg-red-900/15 cursor-pointer rounded-md"
                    >
                        <LogOut className={`h-4 w-4 ${isLoggingOut ? 'animate-spin' : ''}`} />
                        <span className="font-medium">
                            {isLoggingOut ? 'Wylogowywanie...' : 'Wyloguj się'}
                        </span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div >
    )
}

export { OnboardingUserDropdown }