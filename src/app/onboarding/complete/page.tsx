'use client';

import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useAuth } from '@/contexts/AuthContext';
import { CompleteHeader } from '@/components/onboarding/complete/CompleteHeader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FeatureCards } from '@/components/onboarding/complete/FeatureCards';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';

export default function OnboardingCompletePage() {
    const { user } = useAuth();
    const { completeOnboarding } = useOnboarding();
    const router = useRouter();
    const queryClient = useQueryClient();

    const finishOnboardingMutation = useMutation({
        mutationFn: async () => {
            await completeOnboarding();
            await queryClient.invalidateQueries({ queryKey: ['userProfile'] });
        },
        onSuccess: () => {
            showToast.success('Konfiguracja zakończona pomyślnie!', 'onboarding-success');
            router.push('/dashboard');
        },
        onError: (error: Error) => {
            console.error('Error completing onboarding:', error);
            showToast.error('Wystąpił błąd podczas kończenia konfiguracji', 'onboarding-error');
        },
    });

    const handleFinish = () => {
        finishOnboardingMutation.mutate();
    };

    return (
        <OnboardingRoute step={AccountOnboardingStep.Completed}>
            <div className="bg-zinc-50 dark:bg-zinc-900 py-8 px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    <CompleteHeader username={user?.googleUsername || user?.email || 'Użytkowniku'} />

                    <FeatureCards pointBalance={user?.pointBalance || 0} />

                    <div className="flex justify-center">
                        <Button
                            onClick={handleFinish}
                            disabled={finishOnboardingMutation.isPending}
                            loading={finishOnboardingMutation.isPending}
                            className="bg-blue-600 hover:bg-blue-700"
                            size="lg"
                        >
                            Przejdź do panelu
                        </Button>
                    </div>
                </div>
            </div>
        </OnboardingRoute>
    );
}