import React from 'react';
import { Users, Star, Trophy, Gift } from 'lucide-react';
import { StatCard } from './StatCard';
import { Skeleton } from '@/components/ui/skeleton';

interface StatsSectionProps {
    stats?: {
        totalReferrals: number;
        activeReferrals: number;
        completedGoals: number;
        totalPointsEarned: number;
    };
    isLoading: boolean;
}

export const StatsSection = ({ stats, isLoading }: StatsSectionProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-8 w-16 mb-1" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                title="Łączne polecenia"
                value={stats?.totalReferrals || 0}
                subtitle="wszystkich czasów"
                icon={Users}
                color="blue"
            />
            <StatCard
                title="Aktywne polecenia"
                value={stats?.activeReferrals || 0}
                subtitle="obecnie aktywne"
                icon={Star}
                color="green"
            />
            <StatCard
                title="Ukończone cele"
                value={stats?.completedGoals || 0}
                subtitle="osiągnięte"
                icon={Trophy}
                color="purple"
            />
            <StatCard
                title="Zdobyte punkty"
                value={stats?.totalPointsEarned || 0}
                subtitle="z poleceń"
                icon={Gift}
                color="orange"
            />
        </div>
    );
};