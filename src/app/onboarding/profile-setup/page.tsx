'use client';

import { useState, useEffect } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useAuth } from '@/contexts/AuthContext';
import { ProfileSetupHeader } from '../../../components/onboarding/profileSetup/ProfileSetupHeader';
import { ProfileSetupForm } from '../../../components/onboarding/profileSetup/ProfileSetupForm';

export default function ProfileSetupPage() {
  const { user } = useAuth();
  const { completeProfileSetupStep } = useOnboarding();
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.username) {
      setDisplayName(user.username);
    }
  }, [user]);

  const handleContinue = async () => {
    if (!displayName.trim()) {
      setError('Nazwa wyświetlana jest wymagana');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await completeProfileSetupStep(displayName);
    } catch {
      setError('Nie udało się zaktualizować profilu. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingRoute step={AccountOnboardingStep.ProfileSetup}>
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <ProfileSetupHeader />
        <ProfileSetupForm
          displayName={displayName}
          onDisplayNameChange={setDisplayName}
          onSubmit={handleContinue}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </OnboardingRoute>
  );
}