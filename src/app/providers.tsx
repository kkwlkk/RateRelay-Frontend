'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../contexts/AuthContext';
import { SessionRefresher } from '@/components/auth/SessionRefresher';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { isDev } from '@/utils/environmentUtils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
                <SessionRefresher />
                <AuthProvider>
                        {children}
                </AuthProvider>
            </SessionProvider>
            {isDev && (
                <ReactQueryDevtools initialIsOpen={false} position="left" />
            )}
        </QueryClientProvider>
    );
}