'use client';

import { useState } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileSetupPage() {
  const { user } = useAuth();
  const { completeProfileSetupStep } = useOnboarding();
  const [displayName, setDisplayName] = useState(user?.username || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    if (!displayName.trim()) {
      setError('Display name is required');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await completeProfileSetupStep(displayName);
    } catch {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OnboardingRoute step={AccountOnboardingStep.ProfileSetup}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Set Up Your Profile</h2>
          <p className="mt-2 text-gray-600">
            Customize how you appear on TrustRate.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
              Display Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`
                  block w-full rounded-md sm:text-sm focus:ring-blue-500 focus:border-blue-500
                  ${error ? 'border-red-300' : 'border-gray-300'}
                `}
                placeholder="How you want to be known on TrustRate"
              />
              {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              This name will be visible on your reviews and profile.
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email || ''}
                disabled
                className="bg-gray-50 block w-full rounded-md border-gray-300 sm:text-sm"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Your email is private and won&apos;t be shown publicly.
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading || !displayName.trim()}
            onClick={handleContinue}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </OnboardingRoute>
  );
}