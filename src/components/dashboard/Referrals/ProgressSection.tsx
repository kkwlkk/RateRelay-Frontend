import React, { useState } from 'react';
import { Target, Trophy, Gift, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ReferralProgressDto } from '@/types/dtos/Referrals';
import { cn } from '@/lib/utils';
import { ProgressCard } from './ProgressCard';

interface ProgressSectionProps {
    progress?: ReferralProgressDto[];
    isLoading: boolean;
}

const GoalGroup = ({ goalName, goalDescription, items }: { goalName: string; goalDescription?: string; items: ReferralProgressDto[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const completedCount = items.filter(item => item.isCompleted).length;

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <div
                className={cn(
                    "p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors",
                    { "rounded-xl": !isExpanded },
                    { "rounded-t-xl": isExpanded }
                )}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800">
                            <Star className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                                {goalName}
                            </h3>
                            {goalDescription && (
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    {goalDescription}
                                </p>
                            )}
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                {completedCount} / {items.length} ukończone
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {completedCount > 0 && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-50 dark:bg-green-900/20 rounded">
                                <Trophy className="h-3 w-3 text-green-600 dark:text-green-400" />
                                <span className="text-xs font-medium text-green-700 dark:text-green-400">
                                    {completedCount}
                                </span>
                            </div>
                        )}
                        {isExpanded ? (
                            <ChevronUp className="h-4 w-4 text-zinc-400" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-zinc-400" />
                        )}
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="border-t border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
                    {items.map((item, index) => (
                        <ProgressCard key={index} progress={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const ProgressSection = ({ progress, isLoading }: ProgressSectionProps) => {
    if (!progress) return null;

    const groupedByGoal = progress.reduce((acc, item) => {
        if (!acc[item.goalName]) {
            acc[item.goalName] = [];
        }
        acc[item.goalName].push(item);
        return acc;
    }, {} as Record<string, ReferralProgressDto[]>);

    const completedGoals = progress.filter(p => p.isCompleted).length;
    const totalRewardPoints = progress.filter(p => p.isCompleted).reduce((sum, p) => sum + p.rewardPoints, 0);

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm bg-white dark:bg-zinc-900">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Twój postęp
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Postęp celów dla każdego poleconego użytkownika
                        </p>
                    </div>
                    {!isLoading && progress.length > 0 && (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <Trophy className="h-4 w-4 text-green-600 dark:text-green-400" />
                                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                    {completedGoals}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <Gift className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                    {totalRewardPoints}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-6">
                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                        <div>
                                            <Skeleton className="h-4 w-32 mb-2" />
                                            <Skeleton className="h-3 w-24" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-6 w-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : progress.length === 0 ? (
                    <div className="text-center py-12">
                        <Target className="h-12 w-12 text-zinc-400 mx-auto mb-4" />
                        <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium">
                            Brak celów do wyświetlenia
                        </p>
                        <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-2">
                            Rozpocznij polecanie użytkowników, aby zobaczyć swój postęp
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {Object.entries(groupedByGoal).map(([goalName, items]) => {
                            const goalDescription = items[0]?.goalDescription;
                            return (
                                <GoalGroup 
                                    key={goalName} 
                                    goalName={goalName} 
                                    goalDescription={goalDescription}
                                    items={items} 
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};