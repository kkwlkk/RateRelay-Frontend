'use client';

import { useState } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { CompleteHeader } from '@/components/onboarding/complete/CompleteHeader';
import { WhatYouCanDo } from '@/components/onboarding/complete/WhatYouCanDo';
import { PointsSystem } from '@/components/onboarding/complete/PointsSystem';
import { PointsBalance } from '@/components/onboarding/complete/PointsBalance';
import { onboardingText } from '@/data/onboardingText';

export default function OnboardingCompletePage() {
    const { user, fetchUserProfile } = useAuth();
    const { completeOnboarding } = useOnboarding();
    const [isLoading, setIsLoading] = useState(false);

    const handleFinish = async () => {
        setIsLoading(true);
        try {
            await completeOnboarding();
            await fetchUserProfile();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OnboardingRoute step={AccountOnboardingStep.Completed}>
            <div className="mx-auto space-y-16 text-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                    <CompleteHeader username={user?.username || ''} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <WhatYouCanDo hasCompletedOnboarding={user?.hasCompletedOnboarding || false} />
                        <PointsSystem />
                    </div>

                    <div className="space-y-8">
                        <PointsBalance pointBalance={user?.pointBalance || 0} />

                        <Button
                            onClick={handleFinish}
                            disabled={isLoading}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-200"
                            loading={isLoading}
                        >
                            {onboardingText.button.text}
                        </Button>
                    </div>
                </div>
            </div>
        </OnboardingRoute>
    );
}