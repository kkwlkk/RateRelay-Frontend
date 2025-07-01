'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { GenericPageLoader } from '../GenericPageLoader';
import { useSession } from 'next-auth/react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { status } = useSession();
    const { user } = useAuth();
    const router = useRouter();

    const isAuthenticated = status === 'authenticated';

    useEffect(() => {
        if (status === 'loading') {
            return;
        }

        const currentPath = window.location.pathname;

        if (!isAuthenticated && currentPath !== '/login') {
            console.log('Redirecting to login');
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
    }, [status, router, user, isAuthenticated]);

    if (status === 'loading') {
        return <GenericPageLoader />;
    }

    if (!isAuthenticated || (user && !user.hasCompletedOnboarding)) {
        return null;
    }

    return <>{children}</>;
}