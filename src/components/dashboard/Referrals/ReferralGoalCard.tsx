import React from 'react';
import { Target, Gift } from 'lucide-react';
import { ReferralGoalsResponseDto } from '@/types/dtos/Referrals';
import { cn } from '@/lib/utils';

interface ReferralGoalCardProps {
    goal: ReferralGoalsResponseDto
}

export const ReferralGoalCard = ({ goal }: ReferralGoalCardProps) => (
    <div className={cn(
        "relative rounded-xl p-5 border transition-all duration-200 hover:shadow-md",
        {
            "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700": goal.isActive,
            "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700": !goal.isActive
        }
    )}>
        {!goal.isActive && (
            <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
                    Nieaktywny
                </span>
            </div>
        )}

        <div className="flex items-start gap-4 mb-4">
            <div className={cn(
                "p-2.5 rounded-xl",
                {
                    "bg-blue-100 dark:bg-blue-900/20": goal.isActive,
                    "bg-zinc-200 dark:bg-zinc-700": !goal.isActive
                }
            )}>
                <Target className={cn(
                    "h-5 w-5",
                    {
                        "text-blue-600 dark:text-blue-400": goal.isActive,
                        "text-zinc-500 dark:text-zinc-400": !goal.isActive
                    }
                )} />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className={cn(
                    "font-semibold mb-1",
                    {
                        "text-zinc-900 dark:text-zinc-100": goal.isActive,
                        "text-zinc-600 dark:text-zinc-400": !goal.isActive
                    }
                )}>
                    {goal.name}
                </h3>
                <p className={cn(
                    "text-sm leading-relaxed",
                    {
                        "text-zinc-600 dark:text-zinc-400": goal.isActive,
                        "text-zinc-500 dark:text-zinc-500": !goal.isActive
                    }
                )}>
                    {goal.description}
                </p>
            </div>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "text-sm",
                    {
                        "text-zinc-600 dark:text-zinc-400": goal.isActive,
                        "text-zinc-500 dark:text-zinc-500": !goal.isActive
                    }
                )}>
                    <span className="font-medium">Cel:</span> {goal.targetValue}
                </div>
            </div>
            <div className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                {
                    "bg-green-50 dark:bg-green-900/20": goal.isActive,
                    "bg-zinc-100 dark:bg-zinc-700": !goal.isActive
                }
            )}>
                <Gift className={cn(
                    "h-4 w-4",
                    {
                        "text-green-600 dark:text-green-400": goal.isActive,
                        "text-zinc-500 dark:text-zinc-400": !goal.isActive
                    }
                )} />
                <span className={cn(
                    "text-sm font-semibold",
                    {
                        "text-green-700 dark:text-green-400": goal.isActive,
                        "text-zinc-600 dark:text-zinc-400": !goal.isActive
                    }
                )}>
                    {goal.rewardPoints} pkt
                </span>
            </div>
        </div>
    </div>
);