'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { GenericCenterLoader } from '../GenericLoader';
import { hasFlag } from '@/utils/accountUtils';
import { AccountFlags } from '@/enums/accountFlags';

type OnboardingRouteProps = {
    children: React.ReactNode;
    step?: AccountOnboardingStep;
};

export default function OnboardingRoute({ children, step }: OnboardingRouteProps) {
    const { isLoading: authLoading, user, isAuthenticated } = useAuth();
    const { status: onboardingStatus, isLoading: onboardingLoading } = useOnboarding();
    const router = useRouter();

    const isLoading = authLoading || onboardingLoading;

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!user) return;

        if (user.hasCompletedOnboarding && hasFlag(user.flags, AccountFlags.HasSeenLastOnboardingStep)) {
            router.push('/dashboard');
            return;
        }

        if (!onboardingStatus) return;

        if (step && step !== onboardingStatus.currentStep) {
            const correctPath = getOnboardingStepPath(onboardingStatus.currentStep);
            router.push(correctPath);
            return;
        }
    }, [isLoading, isAuthenticated, user, onboardingStatus, step, router]);

    if (isLoading) {
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

    if (!onboardingStatus) {
        return <GenericCenterLoader />;
    }

    if (step && step !== onboardingStatus.currentStep) {
        return <GenericCenterLoader />;
    }

    return <>{children}</>;
}