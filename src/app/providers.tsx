'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '../contexts/AuthContext';
import { OnboardingProvider } from '../contexts/OnboardingContext';
import { SessionRefresher } from '@/components/auth/SessionRefresher';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/react-query';
import { isDev } from '@/utils/environmentUtils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import { toastOptions } from '@/lib/reactHotToastConfiguration';
import ModalRenderer from '@/components/ModalRenderer';
import { ModalProvider } from '@/contexts/ModalStoreContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider refetchInterval={5 * 60000} refetchOnWindowFocus={true}>
                <SessionRefresher />
                <AuthProvider>
                    <ModalProvider>
                        <ModalRenderer />
                        <OnboardingProvider>
                            {children}
                        </OnboardingProvider>
                    </ModalProvider>
                </AuthProvider>
            </SessionProvider>
            <Toaster
                position="top-right"
                toastOptions={toastOptions}
            />
            {isDev && (
                <>
                    <ReactQueryDevtools initialIsOpen={false} position="left" />
                </>
            )}
        </QueryClientProvider>
    );
};