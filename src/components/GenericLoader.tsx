import { Center } from "./ui/center";

export const GenericCenterLoader = () => {
    return (
        <Center>    
            <div className="h-8 w-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
        </Center>
    );
};
