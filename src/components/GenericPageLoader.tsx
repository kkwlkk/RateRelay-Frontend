import { cn } from "@/lib/utils"

export const GenericPageLoader = ({ className }: { className?: string }) => {
    return (
        <div className={cn(
            "w-full min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950",
            className
        )}>
            <div className="h-8 w-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
        </div>
    );
};
