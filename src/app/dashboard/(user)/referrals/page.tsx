'use client';

import { apiService } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { GoalsSection } from "@/components/dashboard/Referrals/GoalsSection";
import { PageHeader } from "@/components/dashboard/Referrals/PageHeader";
import { ProgressSection } from "@/components/dashboard/Referrals/ProgressSection";
import { RecentRewardsSection } from "@/components/dashboard/Referrals/RecentRewardsSection";
import { ReferralCodeSection } from "@/components/dashboard/Referrals/ReferralCodeSection";
import { StatsSection } from "@/components/dashboard/Referrals/StatsSection";

export default function UserReferralPage() {
    // const { user } = useAuth();

    const { data: referralStats, isLoading: referralStatsLoading } = useQuery({
        queryKey: ['referralStats'],
        queryFn: () => apiService.getReferralStats()
    });

    const { data: referralGoals, isLoading: referralGoalsLoading } = useQuery({
        queryKey: ['referralGoals'],
        queryFn: () => apiService.getReferralGoals()
    });

    const stats = referralStats?.data;
    const goals = referralGoals?.data || [];

    return (
        <div className="w-full px-6">
            <PageHeader />

            <StatsSection
                stats={stats}
                isLoading={referralStatsLoading}
            />

            <ReferralCodeSection
                referralCode={stats?.referralCode}
                referredByCode={stats?.referredByCode}
                isLoading={referralStatsLoading}
            />

            <div className="space-y-6 my-6">
                <ProgressSection
                    progress={stats?.progress}
                    isLoading={referralStatsLoading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <GoalsSection
                        goals={goals}
                        isLoading={referralGoalsLoading}
                    />
                </div>
                
                <div className="lg:col-span-1">
                    <RecentRewardsSection
                        rewards={stats?.recentRewards || []}
                    />
                </div>
            </div>            
        </div>
    );
}