'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { GenericPageLoader } from '../GenericPageLoader';

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
        return <GenericPageLoader />;
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