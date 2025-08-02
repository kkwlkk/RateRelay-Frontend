'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSession } from 'next-auth/react';
import { GenericCenterLoader } from '../GenericLoader';
import { hasFlag } from '@/utils/accountUtils';
import { AccountFlags } from '@/enums/accountFlags';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const { user, isLoading: authLoading, error: authError } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const isAuthenticated = status === 'authenticated' && !!session;
    const isLoading = status === 'loading' || authLoading;
    const hasBackendError = session?.error === 'BackendAuthError' || authError;

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const currentPath = window.location.pathname;
        setIsRedirecting(true);

        if (hasBackendError || (!isAuthenticated && currentPath !== '/login')) {
            console.log('Redirecting to login due to authentication failure');
            router.push('/login?error=backend_unavailable');
            return;
        }


        if (!isAuthenticated && currentPath !== '/login') {
            console.log('Redirecting to login');
            router.push('/login');
            return;
        }

        if (isAuthenticated && user) {
            const userHasCompletedOnboarding = user.hasCompletedOnboarding && hasFlag(user.flags, AccountFlags.HasSeenLastOnboardingStep);

            if (!userHasCompletedOnboarding && !currentPath.startsWith('/onboarding')) {
                router.push('/onboarding');
                return;
            }

            if (userHasCompletedOnboarding &&
                (currentPath === '/login' || currentPath === '/onboarding' || currentPath === '/')) {
                router.push('/dashboard');
                return;
            }
        }

        setIsRedirecting(false);
    }, [status, router, user, isAuthenticated, isLoading, hasBackendError, session]);

    if (isLoading || isRedirecting) {
        return <GenericCenterLoader />;
    }

    if (!isAuthenticated || hasBackendError) {
        return null;
    }

    if (isAuthenticated && user && !user.hasCompletedOnboarding) {
        return null;
    }

    return <>{children}</>;
}