'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Star } from 'lucide-react';

const StatCard = ({ title, value, icon, color }: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}) => (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <div className={`p-2 sm:p-3 rounded-xl ${color} bg-opacity-10 flex-shrink-0`}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-1">{value}</p>
                </div>
            </div>
        </div>
    </div>
);

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    title="Łączna liczba punktów"
                    value={user?.pointBalance || 0}
                    color="text-blue-600"
                    icon={<Star className="w-6 h-6" />}
                />
            </div>
        </div>
    );
}