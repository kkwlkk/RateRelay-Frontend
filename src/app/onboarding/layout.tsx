'use client';

import { useOnboarding } from '@/contexts/OnboardingContext';
import { getOnboardingStepPath } from '@/lib/onboarding';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status, isLoading } = useOnboarding();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && status) {
            if (window.location.pathname === '/onboarding') {
                const currentStepPath = getOnboardingStepPath(status.currentStep);
                router.push(currentStepPath);
            }
        }
    }, [isLoading, status, router]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">TrustRate Onboarding</h1>
                </div>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    {/* Progress bar */}
                    {status && (
                        <div className="mb-8 px-4 sm:px-0">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-between">
                                    {/* Welcome Step */}
                                    <StepIndicator
                                        step={AccountOnboardingStep.Welcome}
                                        currentStep={status.currentStep}
                                        label="Welcome"
                                    />

                                    {/* Profile Setup Step */}
                                    <StepIndicator
                                        step={AccountOnboardingStep.ProfileSetup}
                                        currentStep={status.currentStep}
                                        label="Profile"
                                    />

                                    {/* Business Verification Step */}
                                    <StepIndicator
                                        step={AccountOnboardingStep.BusinessVerification}
                                        currentStep={status.currentStep}
                                        label="Verification"
                                    />

                                    {/* Complete Step */}
                                    <StepIndicator
                                        step={AccountOnboardingStep.Completed}
                                        currentStep={status.currentStep}
                                        label="Complete"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main content */}
                    <div className="px-4 py-6 sm:px-0">
                        <div className="bg-white shadow rounded-lg p-6">
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Helper component for step indicators
function StepIndicator({
    step,
    currentStep,
    label
}: {
    step: AccountOnboardingStep;
    currentStep: AccountOnboardingStep;
    label: string;
}) {
    const isActive = step === currentStep;
    const isCompleted = step < currentStep;

    return (
        <div className="flex flex-col items-center">
            <div
                className={`
          w-8 h-8 rounded-full flex items-center justify-center
          ${isActive ? 'bg-blue-600 text-white' :
                        isCompleted ? 'bg-green-500 text-white' :
                            'bg-gray-200 text-gray-500'}
        `}
            >
                {isCompleted ? (
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    step
                )}
            </div>
            <span className={`mt-2 text-sm ${isActive ? 'font-medium text-blue-600' : isCompleted ? 'font-medium text-green-500' : 'text-gray-500'}`}>
                {label}
            </span>
        </div>
    );
}