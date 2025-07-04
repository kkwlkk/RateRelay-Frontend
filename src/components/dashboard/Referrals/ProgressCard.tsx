import { cn } from "@/lib/utils";
import { ReferralProgressDto } from "@/types/dtos/Referrals";
import { Target, Trophy } from "lucide-react";

export const ProgressCard = ({ progress }: { progress: ReferralProgressDto }) => {
    return (
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:shadow-sm transition-all duration-200">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "p-2 rounded-lg",
                        progress.isCompleted
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-blue-100 dark:bg-blue-900/20"
                    )}>
                        {progress.isCompleted ? (
                            <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                        ) : (
                            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        )}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-zinc-900 dark:text-zinc-100">
                            {progress.referredUserName}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                            <span>{progress.currentValue} / {progress.targetValue}</span>
                            {progress.isCompleted && (
                                <span className="text-green-600 dark:text-green-400">
                                    • {progress.rewardPoints} pkt
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <div className={cn(
                        "text-lg font-semibold",
                        progress.isCompleted
                            ? "text-green-600 dark:text-green-400"
                            : "text-blue-600 dark:text-blue-400"
                    )}>
                        {progress.progressPercentage}%
                    </div>
                </div>
            </div>

            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <div
                    className={cn(
                        "h-2 rounded-full transition-all duration-500",
                        progress.isCompleted
                            ? "bg-green-500 dark:bg-green-400"
                            : "bg-blue-500 dark:bg-blue-400"
                    )}
                    style={{ width: `${Math.min(progress.progressPercentage, 100)}%` }}
                />
            </div>
        </div>
    );
};
