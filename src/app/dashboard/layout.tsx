'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DashboardBreadcrumb } from '@/components/dashboard/DashboardBreadcrumb';
import { AppSidebar } from '@/components/dashboard/Sidebar/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import React from 'react';

const DashboardLayoutContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider defaultOpen>
            <TooltipProvider>
                <div className="flex min-h-screen w-full">
                    <AppSidebar />
                    <div className="flex flex-col flex-1 min-w-0">
                        <header className={cn(
                            "border-b border-zinc-200 dark:border-zinc-800",
                            "sticky top-0 z-10 flex h-14 items-center gap-2",
                            "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xs px-4",
                            "text-zinc-900 dark:text-zinc-50 flex-shrink-0"
                        )}>
                            <SidebarTrigger className='transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:hover:text-zinc-100 rounded-md p-1' />
                            <hr className="h-4 border-l border-zinc-200 dark:border-zinc-800 hidden sm:block text-zinc-900 dark:text-zinc-50" />
                            <DashboardBreadcrumb />
                        </header>
                        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 overflow-auto">
                            {children}
                        </main>
                    </div>
                </div>
            </TooltipProvider>
        </SidebarProvider>
    );
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <DashboardLayoutContent>
                {children}
            </DashboardLayoutContent>
        </ProtectedRoute>
    );
}