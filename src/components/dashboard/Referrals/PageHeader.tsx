import React from 'react';
import { Users } from 'lucide-react';

export const PageHeader = () => {
    return (
        <div className="relative mb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 rounded-3xl blur-3xl" />
            <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 shrink-0">
                    <Users className="size-6 text-white dark:text-zinc-900" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
                        Program polecajacych
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm sm:text-base">
                        Polecaj znajomych i zdobywaj punkty za każde udane polecenie
                    </p>
                </div>
            </div>
        </div>
    );
};