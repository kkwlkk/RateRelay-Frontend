'use client';

import { Stepper } from '@/components/ui/Stepper';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GenericPageLoader } from '@/components/GenericPageLoader';
import { OnboardingUserDropdown } from '@/components/onboarding/OnboardingUserDropdown';

const steps = [
    { id: AccountOnboardingStep.BusinessVerification.toString(), label: 'Weryfikacja firmy' },
    { id: AccountOnboardingStep.Welcome.toString(), label: 'Witaj' },
    { id: AccountOnboardingStep.ProfileSetup.toString(), label: 'Profil' },
    { id: AccountOnboardingStep.Completed.toString(), label: 'Koniec' }
];

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status, isLoading } = useOnboarding();
    const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        if (status?.currentStep === undefined) return;
        if (user?.hasCompletedOnboarding) return;
        if (window.location.pathname === '/onboarding') {
            const currentStepPath = getOnboardingStepPath(status.currentStep);
            router.push(currentStepPath);
        }
    }, [status?.currentStep, router, isLoading, user?.hasCompletedOnboarding]);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, authLoading, router]);

    useEffect(() => {
        if (authLoading) return;
        if (!user) return;
        if (user.hasCompletedOnboarding) {
            router.push('/dashboard');
        }
    }, [user, authLoading, router]);

    if (authLoading) return <GenericPageLoader />;
    if (!isAuthenticated) return <GenericPageLoader />;
    if (user?.hasCompletedOnboarding) return <GenericPageLoader />;

    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-900">
            <div className="w-full border-b border-zinc-200 dark:border-zinc-800 sticky top-0 bg-white dark:bg-zinc-900 z-10 shadow-sm">
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