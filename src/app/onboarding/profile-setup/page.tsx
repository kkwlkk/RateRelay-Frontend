'use client';

import { useMemo } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileSetupHeader } from '../../../components/onboarding/profileSetup/ProfileSetupHeader';
import { ProfileSetupForm, ProfileSetupFormData } from '../../../components/onboarding/profileSetup/ProfileSetupForm';
import { useMutation } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import toast from 'react-hot-toast';

export default function ProfileSetupPage() {
  const { user } = useAuth();
  const { completeProfileSetupStep } = useOnboarding();

  const defaultValues = useMemo(() => ({
    displayName: user?.username || '',
  }), [user?.username]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileSetupFormData) => {
      const response = await apiService.completeProfileSetupStep({ 
        displayName: data.displayName.trim()
      });
      
      if (!response.success) {
        throw new Error(response.error?.message || 'Nie udało się zaktualizować profilu');
      }
  
      return response.data;
    },
    onSuccess: async (_, variables) => {
      try {
        await completeProfileSetupStep(variables.displayName.trim());
      } catch (error) {
        console.error('Error completing profile setup:', error);
        toast.error('Nie udało się ukończyć konfiguracji profilu');
      }
    },
    onError: (error: Error) => {
      console.error('Profile update error:', error);
      toast.error(error.message);
    },
  });

  const handleFormSubmit = (data: ProfileSetupFormData) => {
    updateProfileMutation.mutate(data);
  };

  return (
    <OnboardingRoute step={AccountOnboardingStep.ProfileSetup}>
      <div className="bg-zinc-50 dark:bg-zinc-900 py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <ProfileSetupHeader />
          <ProfileSetupForm
            onSubmit={handleFormSubmit}
            isLoading={updateProfileMutation.isPending}
            defaultValues={defaultValues}
          />
        </div>
      </div>
    </OnboardingRoute>
  );
}