import React from 'react';
import { Trophy, Users, Gift } from 'lucide-react';
import { ReferralRewardDto } from '@/types/dtos/Referrals';

interface RecentRewardCardProps {
    reward: ReferralRewardDto
}

export const RecentRewardCard = ({ reward }: RecentRewardCardProps) => (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl border border-green-200 dark:border-green-900/20 hover:shadow-sm transition-all duration-200">
        <div className="p-2.5 rounded-xl bg-green-100 dark:bg-green-900/20 shrink-0">
            <Trophy className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{reward.goalName}</h4>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <Users className="h-3 w-3" />
                <span>Polecony: {reward.referredUserName}</span>
            </div>
        </div>
        <div className="text-right shrink-0">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-100 dark:bg-green-900/30">
                <Gift className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-bold text-green-700 dark:text-green-400">
                    +{reward.rewardPoints} pkt
                </span>
            </div>
            <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
                {reward.dateAwarded ? new Date(reward.dateAwarded).toLocaleDateString('pl-PL') : 'Oczekuje'}
            </div>
        </div>
    </div>
);