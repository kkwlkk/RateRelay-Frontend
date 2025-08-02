'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Stepper } from '@/components/ui/Stepper';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { OnboardingUserDropdown } from '@/components/onboarding/OnboardingUserDropdown';
import { GenericCenterLoader } from '@/components/GenericLoader';
import { hasFlag } from '@/utils/accountUtils';
import { AccountFlags } from '@/enums/accountFlags';

const steps = [
    { id: AccountOnboardingStep.BusinessVerification.toString(), label: 'Zweryfikuj dane' },
    { id: AccountOnboardingStep.Welcome.toString(), label: 'Poznaj platformę' },
    { id: AccountOnboardingStep.Completed.toString(), label: 'Przejdź do aplikacji' }
];

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status: sessionStatus } = useSession();
    const { status, isLoading } = useOnboarding();
    const { user, logout } = useAuth();
    const router = useRouter();

    const isSessionResolved = sessionStatus !== 'loading';
    const isAuthenticated = sessionStatus === 'authenticated';

    useEffect(() => {
        if (!isSessionResolved) {
            return;
        }

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!user) {
            return;
        }

        if (user.hasCompletedOnboarding && hasFlag(user.flags, AccountFlags.HasSeenLastOnboardingStep)) {
            router.push('/dashboard');
            return;
        }

        if (isLoading) {
            return;
        }

        if (!status) {
            return;
        }

        if (typeof window !== 'undefined' && window.location.pathname === '/onboarding') {
            const correctPath = getOnboardingStepPath(status.currentStep);
            router.push(correctPath);
            return;
        }
    }, [sessionStatus, isSessionResolved, isAuthenticated, user, isLoading, status, router]);

    if (!isSessionResolved || (isAuthenticated && isLoading)) {
        return <GenericCenterLoader />;
    }

    if (!isAuthenticated) {
        return <GenericCenterLoader />;
    }

    if (!user) {
        return <GenericCenterLoader />;
    }

    if (user.hasCompletedOnboarding && hasFlag(user.flags, AccountFlags.HasSeenLastOnboardingStep)) {
        return <GenericCenterLoader />;
    }

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
            <div className="w-full border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-[100] shadow-sm">
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                                Konfiguracja konta
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Skonfiguruj swoje konto, aby w pełni korzystać z TrustRate
                            </p>
                        </div>
                        <OnboardingUserDropdown user={user} logout={logout} />
                    </div>
                    <Stepper
                        steps={steps}
                        currentStep={status?.currentStep || 0}
                    />
                </div>
            </div>
            <main className="flex-grow">
                {children}
            </main>
        </div>
    );
}