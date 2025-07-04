import React, { useState } from 'react';
import { RecentRewardCard } from './RecentRewardCard';
import { ReferralRewardDto } from '@/types/dtos/Referrals';
import { ChevronDown, ChevronUp, Gift } from 'lucide-react';

interface RecentRewardsSectionProps {
    rewards: ReferralRewardDto[];
}

export const RecentRewardsSection = ({ rewards }: RecentRewardsSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!rewards || rewards.length === 0) {
        return (
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Ostatnie nagrody
                    </h2>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        Twoje najnowsze osiągnięcia
                    </p>
                </div>
                <div className="p-6">
                    <div className="text-center py-8">
                        <Gift className="h-8 w-8 text-zinc-400 mx-auto mb-2" />
                        <p className="text-zinc-500 dark:text-zinc-400">
                            Brak nagród do wyświetlenia
                        </p>
                        <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-1">
                            Kontynuuj polecanie, aby zdobyć nagrody
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const maxVisibleRewards = 5;
    const visibleRewards = isExpanded ? rewards : rewards.slice(0, maxVisibleRewards);
    const hasMoreRewards = rewards.length > maxVisibleRewards;

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Ostatnie nagrody
                        </h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                            Twoje najnowsze osiągnięcia
                        </p>
                    </div>
                    {rewards.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Gift className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                                {rewards.length} nagród
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative">
                {isExpanded ? (
                    <div className="max-h-96 overflow-y-auto">
                        <div className="p-6 space-y-3">
                            {visibleRewards.map((reward, index) => (
                                <RecentRewardCard key={index} reward={reward} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 space-y-3">
                        {visibleRewards.map((reward, index) => (
                            <RecentRewardCard key={index} reward={reward} />
                        ))}
                    </div>
                )}

                {hasMoreRewards && (
                    <div className="border-t border-zinc-200 dark:border-zinc-700">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                            {isExpanded ? (
                                <>
                                    <span>Pokaż mniej</span>
                                    <ChevronUp className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    <span>Pokaż wszystkie ({rewards.length - maxVisibleRewards} więcej)</span>
                                    <ChevronDown className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};