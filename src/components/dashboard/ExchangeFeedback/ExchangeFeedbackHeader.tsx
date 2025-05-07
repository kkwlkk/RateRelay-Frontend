import { Progress } from "@/components/ui/progress";
import { Timer } from "lucide-react";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

type ExchangeFeedbackHeaderProps = {
    remainingTime: number,
    initialTime: number
}

const formatTime = (seconds: number) => {
    return dayjs(seconds * 1000).format('mm:ss');
};

export const ExchangeFeedbackHeader = ({ remainingTime, initialTime }: ExchangeFeedbackHeaderProps) => {
    const timePercentage = remainingTime / initialTime * 100;
    const isTimeLow = remainingTime < initialTime * 0.2;

    return (
        <div className="w-full pb-8 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="max-w-full">
                    <h1 className="text-2xl sm:text-3xl font-medium text-zinc-900 dark:text-zinc-100 break-words">Podziel się doświadczeniem</h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1 break-words">Twoje doświadczenie pomoże innym podjąć lepsze decyzje</p>
                </div>
                <div className={cn(
                    "flex shrink-0 items-center gap-2 px-4 py-2 rounded-lg",
                    isTimeLow ? "bg-red-500/10 text-red-500 dark:bg-red-500/20" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                )}>
                    <Timer className="w-5 h-5" />
                    <span className="font-medium tabular-nums">{formatTime(remainingTime)}</span>
                </div>
            </div>
            <div className="mt-6">
                <Progress
                    value={timePercentage}
                    className={`h-1 ${isTimeLow ? 'bg-red-500/20' : 'bg-zinc-200 dark:bg-zinc-800'}`}
                />
            </div>
        </div>
    );
};
