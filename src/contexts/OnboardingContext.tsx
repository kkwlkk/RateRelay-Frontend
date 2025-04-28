import React, { createContext, useContext, useCallback } from 'react';
import { apiService } from '@/services/api';
import { AccountOnboardingStep, CompleteBusinessVerificationStepRequestDto } from '@/types/dtos/Onboarding';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type OnboardingStatus = {
    currentStep: AccountOnboardingStep;
    currentStepName: string;
    lastUpdated?: string;
    isCompleted: boolean;
    completedSteps: string[];
    remainingSteps: string[];
};

type OnboardingContextType = {
    status: OnboardingStatus | null;
    isLoading: boolean;
    refreshStatus: () => Promise<void>;
    completeWelcomeStep: (acceptedTerms: boolean) => Promise<void>;
    completeProfileSetupStep: (displayName: string) => Promise<void>;
    completeBusinessVerificationStep: (placeId: string) => Promise<void>;
    completeOnboarding: () => Promise<void>;
    isError?: boolean;
    currentStepUrl: string;
};

const defaultStatus: OnboardingStatus = {
    currentStep: AccountOnboardingStep.Welcome,
    currentStepName: 'Welcome',
    isCompleted: false,
    completedSteps: [],
    remainingSteps: [],
};

const OnboardingContext = createContext<OnboardingContextType>({
    status: defaultStatus,
    isLoading: true,
    refreshStatus: async () => { },
    completeWelcomeStep: async () => { },
    completeProfileSetupStep: async () => { },
    completeBusinessVerificationStep: async () => { },
    completeOnboarding: async () => { },
    currentStepUrl: '/onboarding/welcome',
});

export const useOnboarding = () => useContext(OnboardingContext);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const queryClient = useQueryClient();

    const fetchOnboardingStatus = useCallback(async () => {
        if (!isAuthenticated) return null;
        const response = await apiService.getOnboardingStatus();
        if (response.success) {
            return response.data;
        }
        throw new Error(response.error?.message || 'Failed to fetch onboarding status');
    }, [isAuthenticated]);

    const {
        data: status,
        isLoading,
        isError,
        refetch: refreshStatus
    } = useQuery({
        queryKey: ['onboardingStatus', user?.id],
        queryFn: fetchOnboardingStatus,
        enabled: !!user?.id && !authLoading && isAuthenticated && !user.hasCompletedOnboarding,
        initialData: user?.hasCompletedOnboarding ? {
            currentStep: AccountOnboardingStep.Completed,
            currentStepName: 'Completed',
            isCompleted: true,
            completedSteps: [],
            remainingSteps: [],
        } : null,
        staleTime: 0,
        gcTime: 0,
    });

    const welcomeMutation = useMutation({
        mutationFn: (acceptedTerms: boolean) =>
            apiService.completeWelcomeStep({ acceptedTerms }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['onboardingStatus'] });
            if (data.success) {
                router.push(getOnboardingStepPath(data.data.nextStep));
            }
        },
        onError: (error) => {
            console.error('Error completing welcome step:', error);
        }
    });

    const profileSetupMutation = useMutation({
        mutationFn: (displayName: string) =>
            apiService.completeProfileSetupStep({ displayName }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['onboardingStatus'] });
            if (data.success) {
                router.push(getOnboardingStepPath(data.data.nextStep));
            }
        },
        onError: (error) => {
            console.error('Error completing profile setup step:', error);
        }
    });

    const businessVerificationMutation = useMutation({
        mutationFn: (data: CompleteBusinessVerificationStepRequestDto) =>
            apiService.completeBusinessVerificationStep(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['onboardingStatus'] });
            if (data.success) {
                router.push(getOnboardingStepPath(data.data.nextStep));
            }
        },
        onError: (error) => {
            console.error('Error completing business verification step:', error);
        }
    });

    const completeOnboardingMutation = useMutation({
        mutationFn: () => apiService.completeOnboardingStep(),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['onboardingStatus'] });
            if (data.success) {
                router.push('/dashboard');
            }
        },
        onError: (error) => {
            console.error('Error completing onboarding:', error);
        }
    });

    const refresh = useCallback(async () => {
        await refreshStatus();
    }, [refreshStatus]);

    const completeWelcomeStep = async (acceptedTerms: boolean) => {
        await welcomeMutation.mutateAsync(acceptedTerms);
    };

    const completeProfileSetupStep = async (displayName: string) => {
        await profileSetupMutation.mutateAsync(displayName);
    };

    const completeBusinessVerificationStep = async (placeId: string) => {
        await businessVerificationMutation.mutateAsync({ placeId: placeId });
    };

    const completeOnboarding = async () => {
        await completeOnboardingMutation.mutateAsync();
    };

    return (
        <OnboardingContext.Provider
            value={{
                status,
                isLoading,
                isError,
                refreshStatus: refresh,
                completeWelcomeStep,
                completeProfileSetupStep,
                completeBusinessVerificationStep,
                completeOnboarding,
                currentStepUrl: status ? getOnboardingStepPath(status.currentStep) : '/onboarding/welcome',
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};