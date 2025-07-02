'use client';

import { useState } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import WelcomeHeader from '@/components/onboarding/welcome/WelcomeHeader';
import HowItWorks from '@/components/onboarding/welcome/HowItWorks';
import TermsAndConditions from '@/components/onboarding/welcome/TermsAndConditions';
import { Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <div className="bg-zinc-50 dark:bg-zinc-900">
                <div className="max-w-4xl mx-auto px-4 pt-8 pb-8 sm:px-6 lg:px-8">
                    <WelcomeHeader />

                    <div className="space-y-8">
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                                    <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    Dołączenie do programu TrustRate
                                </h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Zapoznaj się z naszymi zasadami bezpieczeństwa oraz zasadami działania naszego programu,
                                aby w pełni świadomie korzystać z naszego serwisu.
                            </p>
                        </div>

                        <HowItWorks />

                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                                    <Award className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                                    Czym są punkty?
                                </h2>
                            </div>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                                Za każdy udzielony feedback zdobywasz punkt - za każdy otrzymany feedback tracisz go.
                                Dzięki temu systemowi firmy są zmotywowane, by nie tylko zbierać feedback/opinie, ale także aktywnie dzielić się swoimi doświadczeniami z innymi.
                                Im więcej punktów zdobędziesz, tym większa Twoja widoczność w społeczności.
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
                                loading={isLoading}
                                size="lg"
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:text-zinc-500"
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