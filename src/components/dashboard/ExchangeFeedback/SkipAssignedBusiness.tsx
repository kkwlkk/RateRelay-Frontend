import { Button } from "@/components/ui/button";
import { SkipForward } from "lucide-react";

type SkipAssignedBusinessProps = {
    onSkipBusiness: () => void;
    isFetching: boolean;
}

export const SkipAssignedBusiness = ({ onSkipBusiness, isFetching }: SkipAssignedBusinessProps) => {
    return (
        <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-zinc-100">Jak oceniasz tę firmę?</h3>
            <Button
                size="sm"
                variant="ghost"
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                onClick={onSkipBusiness}
                loading={isFetching}
            >
                <SkipForward className="w-4 h-4 mr-1" />
                <span>Pomiń firmę</span>
            </Button>
        </div>
    )
}
