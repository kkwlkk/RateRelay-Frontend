'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { getOnboardingStepPath } from '@/lib/onboarding';

export default function OnboardingPage() {
    const { status, isLoading } = useOnboarding();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && status) {
            router.push(getOnboardingStepPath(status.currentStep));
        } else if (!isLoading && !status) {
            router.push('/onboarding/welcome');
        }
    }, [isLoading, status, router]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 my-8"></div>
            <p className="text-gray-600">Redirecting to your current onboarding step...</p>
        </div>
    );
}