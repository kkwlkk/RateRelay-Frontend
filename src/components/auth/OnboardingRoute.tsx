'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { useSession } from 'next-auth/react';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { GenericCenterLoader } from '../GenericLoader';

type OnboardingRouteProps = {
    children: React.ReactNode;
    step?: AccountOnboardingStep;
};

export default function OnboardingRoute({ children, step }: OnboardingRouteProps) {
    const { status: sessionStatus } = useSession();
    const { isLoading: authLoading, user } = useAuth();
    const { status: onboardingStatus, isLoading: onboardingLoading } = useOnboarding();
    const router = useRouter();

    const isSessionReady = sessionStatus !== 'loading';
    const isAuthenticated = sessionStatus === 'authenticated';
    const hasUser = !!user;
    const hasOnboardingStatus = !!onboardingStatus;

    const isDataReady = isSessionReady && !authLoading && !onboardingLoading;

    useEffect(() => {
        if (!isDataReady) return;

        if (!isAuthenticated) {
            router.push('/login');
            return;
        }

        if (!hasUser || !hasOnboardingStatus) return;

        if (user.hasCompletedOnboarding && step !== AccountOnboardingStep.Completed) {
            router.push('/dashboard');
            return;
        }

        if (step !== onboardingStatus.currentStep) {
            const correctPath = getOnboardingStepPath(onboardingStatus.currentStep);
            router.push(correctPath);
            return;
        }
    }, [isDataReady, isAuthenticated, hasUser, hasOnboardingStatus, user?.hasCompletedOnboarding, step, onboardingStatus?.currentStep, router]);

    if (!isDataReady) {
        return <GenericCenterLoader />;
    }

    if (!isAuthenticated || !hasUser || !hasOnboardingStatus) {
        return <GenericCenterLoader />;
    }

    if (user.hasCompletedOnboarding && step !== AccountOnboardingStep.Completed) {
        return <GenericCenterLoader />;
    }

    if (step !== onboardingStatus.currentStep) {
        return <GenericCenterLoader />;
    }

    return <>{children}</>;
}