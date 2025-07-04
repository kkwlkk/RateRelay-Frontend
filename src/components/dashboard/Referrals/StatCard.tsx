import React from 'react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';

interface StatCardProps {
    title: string;
    value: number;
    subtitle?: string;
    icon: React.ElementType;
    color: string;
}

export const StatCard = ({ title, value, subtitle, icon: Icon, color }: StatCardProps) => (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</p>
                <AnimatedCounter
                    value={value}
                    className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 my-1"
                />
                {subtitle && <p className="text-xs text-zinc-500 dark:text-zinc-500">{subtitle}</p>}
            </div>
            <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
                <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
            </div>
        </div>
    </div>
);