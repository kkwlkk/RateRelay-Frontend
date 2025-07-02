'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSession } from 'next-auth/react';
import { GenericCenterLoader } from '../GenericLoader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const { user, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const isAuthenticated = status === 'authenticated';
    const isLoading = status === 'loading' || authLoading;

    useEffect(() => {
        if (isLoading) {
            return;
        }

        const currentPath = window.location.pathname;
        setIsRedirecting(true);

        if (!isAuthenticated && currentPath !== '/login') {
            console.log('Redirecting to login');
            router.push('/login');
            return;
        }

        if (isAuthenticated && user) {
            if (!user.hasCompletedOnboarding && !currentPath.startsWith('/onboarding')) {
                router.push('/onboarding');
                return;
            }

            if (user.hasCompletedOnboarding &&
                (currentPath === '/login' || currentPath === '/onboarding' || currentPath === '/')) {
                router.push('/dashboard');
                return;
            }
        }

        setIsRedirecting(false);
    }, [status, router, user, isAuthenticated, isLoading]);

    if (isLoading || isRedirecting) {
        return <GenericCenterLoader />;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (isAuthenticated && user && !user.hasCompletedOnboarding) {
        return null;
    }

    return <>{children}</>;
}