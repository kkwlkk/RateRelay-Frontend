import { Store, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const NoBusinessFound = ({ isRefreshing, onRefresh }: { isRefreshing: boolean, onRefresh: () => void }) => {
    const messages = [
        "Sprawdzamy dostępne firmy...",
        "Chwilowo pusto w kolejce...",
        "Szukamy dla Ciebie biznesów...",
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    return (
        <div className="size-full flex items-center justify-center p-4">
            <div className="w-full max-w-96 sm:max-w-md p-4 sm:p-8 transform transition-all duration-300 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg">
                <div className="relative flex flex-col items-center text-center">
                    <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                        <div className={`absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-800 ${isRefreshing ? 'animate-ping opacity-75' : ''}`} />
                        <div className="absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                            <Store className="h-10 w-10 text-zinc-500 dark:text-zinc-400" />
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                        Brak dostępnych firm
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-2">
                        {randomMessage}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-6">
                        Aktualnie nie ma firm do oceny w Twojej kolejce.
                        Możesz sprawdzić ponownie za kilka minut.
                    </p>
                    <Button
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        className="w-full"
                        variant="default"
                        size="default"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
                            <span>{isRefreshing ? "Odświeżanie..." : "Odśwież teraz"}</span>
                        </div>
                    </Button>
                    <div className="mt-4 text-xs text-zinc-400 dark:text-zinc-600">
                        Lub wróć później, gdy pojawią się nowe firmy
                    </div>
                </div>
            </div>
        </div>
    );
};