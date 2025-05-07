'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { GenericPageLoader } from '../GenericPageLoader';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        const currentPath = window.location.pathname;

        if (!isAuthenticated && currentPath !== '/login') {
            router.push('/login');
            return;
        }

        if (user) {
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
    }, [isAuthenticated, isLoading, router, user]);

    if (isLoading) {
        return <GenericPageLoader />;
    }

    if (!isAuthenticated || (user && !user.hasCompletedOnboarding)) {
        return null;
    }

    return <>{children}</>;
}