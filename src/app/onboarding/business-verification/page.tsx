'use client';

import { useState, useEffect } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { apiService } from '@/services/api';
import { BusinessVerificationStatusResponseDto } from '@/types/dtos/BusinessVerificaton';

export default function BusinessVerificationPage() {
    const { completeBusinessVerificationStep } = useOnboarding();
    const [placeId, setPlaceId] = useState('');
    const [skipVerification, setSkipVerification] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [verificationStatus, setVerificationStatus] = useState<BusinessVerificationStatusResponseDto | null>(null);
    const [isStatusLoading, setIsStatusLoading] = useState(true);

    useEffect(() => {
        const fetchVerificationStatus = async () => {
            try {
                const response = await apiService.getBusinessVerificationStatus();
                if (response.success) {
                    setVerificationStatus(response.data);
                }
            } catch (error) {
                console.error('Error fetching verification status:', error);
            } finally {
                setIsStatusLoading(false);
            }
        };

        fetchVerificationStatus();
    }, []);

    const handleContinue = async () => {
        if (!skipVerification && !placeId.trim()) {
            setError('Please enter a Google Place ID or skip this step');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            if (skipVerification) {
                await completeBusinessVerificationStep();
            } else {
                // First initiate the verification if we have a place ID
                await apiService.initiateBusinessVerification(placeId);
                // Then complete the step in the onboarding process
                await completeBusinessVerificationStep(placeId);
            }
        } catch (err) {
            setError('Failed to process verification. Please try again.');
            console.error('Verification error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OnboardingRoute step={AccountOnboardingStep.BusinessVerification}>
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Business Verification</h2>
                    <p className="mt-2 text-gray-600">
                        Verify your business to collect and manage reviews.
                    </p>
                </div>

                {isStatusLoading ? (
                    <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : verificationStatus?.isVerified ? (
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                        <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <h3 className="mt-2 text-lg font-medium text-green-800">Your Business is Verified!</h3>
                        <p className="mt-1 text-green-700">
                            You&apos;re all set to collect and manage reviews for your business.
                        </p>
                        <button
                            type="button"
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            onClick={handleContinue}
                        >
                            Continue to Next Step
                        </button>
                    </div>
                ) : verificationStatus ? (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-yellow-800">Verification In Progress</h3>
                        <p className="mt-1 text-yellow-700">
                            Your business verification is already in progress. Status: {verificationStatus.status}
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                onClick={handleContinue}
                            >
                                Continue to Next Step
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-medium text-blue-800 mb-2">Why Verify Your Business?</h3>
                            <ul className="list-disc pl-5 text-blue-700 space-y-1">
                                <li>Collect authentic reviews from customers</li>
                                <li>Respond to reviews and build your reputation</li>
                                <li>Get insights on customer satisfaction</li>
                                <li>Show up in business searches on TrustRate</li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="placeId" className="block text-sm font-medium text-gray-700">
                                    Google Place ID
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        id="placeId"
                                        name="placeId"
                                        value={placeId}
                                        onChange={(e) => setPlaceId(e.target.value)}
                                        disabled={skipVerification}
                                        className={`
                      block w-full rounded-md sm:text-sm focus:ring-blue-500 focus:border-blue-500
                      ${error ? 'border-red-300' : 'border-gray-300'}
                      ${skipVerification ? 'bg-gray-100' : ''}
                    `}
                                        placeholder="e.g. ChIJrTLr-GyuEmsRBfy61i59si0"
                                    />
                                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                    <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500">
                                        How to find your Google Place ID
                                    </a>
                                </p>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="skipVerification"
                                    name="skipVerification"
                                    type="checkbox"
                                    checked={skipVerification}
                                    onChange={(e) => {
                                        setSkipVerification(e.target.checked);
                                        if (e.target.checked) setError('');
                                    }}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="skipVerification" className="ml-2 block text-sm text-gray-700">
                                    I don&apos;t have a business to verify right now
                                </label>
                            </div>
                        </div>
                    </>
                )}

                {!verificationStatus?.isVerified && (
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
                            disabled={isLoading || (!skipVerification && !placeId.trim())}
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
                )}
            </div>
        </OnboardingRoute>
    );
}