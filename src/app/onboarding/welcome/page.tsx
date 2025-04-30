'use client';

import { useState } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { Button } from '@/components/ui/Button';
import WelcomeHeader from '@/components/onboarding/welcome/WelcomeHeader';
import HowItWorks from '@/components/onboarding/welcome/HowItWorks';
import TermsAndConditions from '@/components/onboarding/welcome/TermsAndConditions';

export default function WelcomePage() {
    const { completeWelcomeStep } = useOnboarding();
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleContinue = async () => {
        setIsLoading(true);
        try {
            await completeWelcomeStep(acceptedTerms);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OnboardingRoute step={AccountOnboardingStep.Welcome}>
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-5xl mx-auto px-4 pt-16 pb-6 sm:px-6 lg:px-8">
                    <WelcomeHeader />

                    <div className="space-y-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dołączenie do programu TrustRate</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Zapoznaj się z naszymi zasadami bezpieczeństwa oraz zasadami działania naszego programu,
                                aby w pełni świadomie korzystać z naszego serwisu.
                            </p>
                        </div>

                        <HowItWorks />

                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dołączenie do programu TrustRate</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Zapoznaj się z naszymi zasadami bezpieczeństwa oraz zasadami działania naszego programu,
                                aby w pełni świadomie korzystać z naszego serwisu.
                            </p>
                        </div>

                        <TermsAndConditions
                            acceptedTerms={acceptedTerms}
                            onTermsChange={setAcceptedTerms}
                        />

                        <div className="flex justify-center">
                            <Button
                                onClick={handleContinue}
                                disabled={!acceptedTerms || isLoading}
                                className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                loading={isLoading}
                            >
                                Kontynuuj
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </OnboardingRoute>
    );
}