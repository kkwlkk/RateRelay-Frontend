'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { DashboardBreadcrumb } from '@/components/dashboard/DashboardBreadcrumb';
import { AppSidebar } from '@/components/dashboard/Sidebar/Sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';
import React from 'react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <ProtectedRoute>
            <SidebarProvider defaultOpen>
                <TooltipProvider>
                    <AppSidebar />
                    <div className="flex flex-col flex-1">
                        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                            <SidebarTrigger />
                            <hr className="h-4 border-l border-gray-200 hidden sm:block" />
                            <DashboardBreadcrumb />
                        </header>
                        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-screen">
                            {children}
                        </main>
                    </div>
                </TooltipProvider>
            </SidebarProvider>
        </ProtectedRoute>
    );
} 