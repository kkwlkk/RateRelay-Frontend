'use client';

import { Stepper } from '@/components/ui/Stepper';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GenericPageLoader } from '@/components/GenericPageLoader';

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
    const { isAuthenticated, isLoading: authLoading, user } = useAuth();
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
        <div className="min-h-screen flex flex-col bg-white">
            <div className="w-full border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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