import React from 'react';
import { Target } from 'lucide-react';
import { ReferralGoalCard } from './ReferralGoalCard';
import { Skeleton } from '@/components/ui/skeleton';
import { ReferralGoalsResponseDto } from '@/types/dtos/Referrals';

interface GoalsSectionProps {
    goals: ReferralGoalsResponseDto[];
    isLoading: boolean;
}

export const GoalsSection = ({ goals, isLoading }: GoalsSectionProps) => {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm h-full">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Dostępne cele
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Realizuj cele, aby zdobywać punkty
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {goals.length > 0 && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                    {goals.length} {goals.length === 1 ? 'cel' : goals.length < 5 ? 'cele' : 'celów'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="p-6">
                {isLoading && (
                    <div className="space-y-4 max-h-[30rem] overflow-y-auto">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                                <Skeleton className="h-4 w-32 mb-2" />
                                <Skeleton className="h-3 w-48 mb-3" />
                                <Skeleton className="h-2 w-full mb-2" />
                                <Skeleton className="h-6 w-20" />
                            </div>
                        ))}
                    </div>
                )}
                {!isLoading && goals.length > 0 ? (
                    <div className="space-y-4 max-h-[30rem] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent">
                        {goals.map((goal) => (
                            <div key={goal.id} className="h-fit">
                                <ReferralGoalCard goal={goal} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <Target className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Nie ma obecnie dostępnych celów
                        </p>
                        <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
                            Sprawdź ponownie później
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}