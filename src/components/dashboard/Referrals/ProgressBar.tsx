import { cn } from '@/lib/utils';
import React from 'react';

interface ProgressBarProps {
    percentage: number;
    className?: string;
}

export const ProgressBar = ({ percentage, className = "" }: ProgressBarProps) => (
    <div className={`w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5 overflow-hidden ${className}`}>
        <div
            className={cn(
                "h-2.5 rounded-full transition-all duration-500 ease-out",
                {
                    "bg-gradient-to-r from-green-500 to-green-600": percentage >= 100,
                    "bg-gradient-to-r from-blue-500 to-blue-600": percentage < 100,
                }
            )}
            style={{ width: `${Math.min(percentage, 100)}%` }}
        />
    </div>
);