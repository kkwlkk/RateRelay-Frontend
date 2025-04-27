'use client';

import { useState } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useAuth } from '@/contexts/AuthContext';

export default function OnboardingCompletePage() {
    const { user, fetchUserProfile } = useAuth();
    const { completeOnboarding } = useOnboarding();
    const [isLoading, setIsLoading] = useState(false);

    const handleFinish = async () => {
        setIsLoading(true);
        try {
            await completeOnboarding();
            // Refresh user profile to update the hasCompletedOnboarding status
            await fetchUserProfile();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OnboardingRoute step={AccountOnboardingStep.Completed}>
            <div className="space-y-6 text-center">
                <div>
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                        <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h2 className="mt-3 text-2xl font-bold text-gray-900">All Set!</h2>
                    <p className="mt-2 text-gray-600">
                        Thank you for completing the onboarding process, {user?.username}.
                    </p>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg max-w-md mx-auto">
                    <h3 className="text-lg font-medium text-blue-800 mb-3">What&apos;s Next?</h3>
                    <ul className="text-left space-y-3 text-blue-700">
                        <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Review businesses to earn points</span>
                        </li>
                        {!user?.hasCompletedOnboarding && (
                            <li className="flex items-start">
                                <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>Complete verification for your business (if applicable)</span>
                            </li>
                        )}
                        <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Check your dashboard for available reviews</span>
                        </li>
                        <li className="flex items-start">
                            <svg className="h-5 w-5 text-blue-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>Redeem your points for rewards</span>
                        </li>
                    </ul>
                </div>

                <div className="pt-4">
                    <p className="text-gray-600 mb-4">
                        Your current point balance: <span className="font-semibold">{user?.pointBalance || 0}</span>
                    </p>
                    <button
                        type="button"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={handleFinish}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </>
                        ) : (
                            'Go to Dashboard'
                        )}
                    </button>
                </div>
            </div>
        </OnboardingRoute>
    );
}