'use client';

import { useState } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';

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
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Welcome to TrustRate!</h2>
                    <p className="mt-2 text-gray-600">
                        We&apos;re excited to have you join our business review platform.
                    </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-800 mb-2">What is TrustRate?</h3>
                    <p className="text-blue-700">
                        TrustRate is a platform that helps businesses collect authentic reviews
                        while rewarding reviewers with points that can be redeemed for benefits.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">How it works:</h3>
                    <div className="pl-5 space-y-2">
                        <div className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">1</span>
                            <p>Review businesses in your area to earn points</p>
                        </div>
                        <div className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">2</span>
                            <p>Verify your own business to collect reviews</p>
                        </div>
                        <div className="flex items-start">
                            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">3</span>
                            <p>Redeem points for discounts and offers</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                            />
                        </div>
                        <div className="ml-3">
                            <label htmlFor="terms" className="text-sm text-gray-700">
                                I accept the <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className={`
              inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm 
              text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              ${acceptedTerms ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}
            `}
                        disabled={!acceptedTerms || isLoading}
                        onClick={handleContinue}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
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