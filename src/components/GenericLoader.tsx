import { cn } from "@/lib/utils";
import { Center } from "./ui/center";

export const GenericCenterLoader = ({ className }: { className?: string }) => {
    return (
        <Center className={cn("fixed inset-0", className)}>
            <div className="h-8 w-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
        </Center>
    );
};

export const GenericPageCenterLoader = ({ className }: { className?: string }) => {
    return (
        <Center className={cn("flex inset-0", className)}>
            <div className="h-8 w-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
        </Center>
    );
};