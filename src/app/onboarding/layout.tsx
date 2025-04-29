'use client';

import { Stepper } from '@/components/ui/Stepper';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        if (status?.currentStep === undefined) return;
        const currentStepPath = getOnboardingStepPath(status.currentStep);
        router.push(currentStepPath);
    }, [status?.currentStep, router, isLoading]);

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