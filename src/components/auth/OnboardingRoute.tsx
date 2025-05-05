'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { getOnboardingStepPath } from '@/lib/onboarding';

type OnboardingRouteProps = {
    children: React.ReactNode;
    step: AccountOnboardingStep;
};

export default function OnboardingRoute({ children, step }: OnboardingRouteProps) {
    const { isAuthenticated, isLoading: authLoading, user } = useAuth();
    const { status, isLoading: onboardingLoading } = useOnboarding();
    const router = useRouter();

    useEffect(() => {
        if (authLoading || onboardingLoading) return;

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!user) return;

        if (user.hasCompletedOnboarding && step !== AccountOnboardingStep.Completed) {
            router.push('/dashboard');
            return;
        }

        if (!status) return;

        if (step > status.currentStep) {
            const currentStepPath = getOnboardingStepPath(status.currentStep);
            router.push(currentStepPath);
            return;
        }

        if (step < status.currentStep) {
            const currentStepPath = getOnboardingStepPath(status.currentStep);
            router.push(currentStepPath);
            return;
        }
    }, [isAuthenticated, authLoading, user, status, onboardingLoading, step, router]);

    if (authLoading || onboardingLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
                <div className="h-8 w-8 border-2 border-zinc-200 dark:border-zinc-800 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    if (!user) {
        return null;
    }

    if (user.hasCompletedOnboarding && step !== AccountOnboardingStep.Completed) {
        return null;
    }

    if (!status) {
        return null;
    }

    if (step > status.currentStep || step < status.currentStep) {
        return null;
    }

    return <>{children}</>;
}