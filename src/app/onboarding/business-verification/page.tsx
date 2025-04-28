'use client';

import { useState, useEffect } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import { BusinessVerificationStatusResponseDto, BusinessVerificationChallengeResponseDto } from '@/types/dtos/BusinessVerificaton';
import toast from 'react-hot-toast';
import { BusinessSearch } from '@/components/onboarding/business-verification/BusinessSearch';
import { VerificationStatus } from '@/components/onboarding/business-verification/VerificationStatus';
import { VerificationChallenge } from '@/components/onboarding/business-verification/VerificationChallenge';
import { InfoSections } from '@/components/onboarding/business-verification/InfoSections';

export default function BusinessVerification() {
    const router = useRouter();
    const { completeBusinessVerificationStep } = useOnboarding();
    const [selectedBusiness, setSelectedBusiness] = useState<google.maps.places.PlaceResult | null>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState<BusinessVerificationStatusResponseDto | null>(null);
    const [verificationChallenge, setVerificationChallenge] = useState<BusinessVerificationChallengeResponseDto | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchVerificationStatus = async () => {
        try {
            const statusResponse = await apiService.getBusinessVerificationStatus();
            if (statusResponse.success) {
                setVerificationStatus(statusResponse.data);
                if (!statusResponse.data.isVerified) {
                    const challengeResponse = await apiService.getBusinessVerificationChallenge();
                    if (challengeResponse.success) {
                        setVerificationChallenge(challengeResponse.data);
                    }
                }
            }

            if (statusResponse.error?.code === 'ERR_ALREADY_VERIFIED') {
                const metadata = statusResponse.metadata as { businessId: number; placeId: string } | undefined;
                if (metadata?.placeId) {
                    setVerificationStatus({
                        isVerified: true,
                        status: 'VERIFIED',
                        verificationId: ''
                    });
                }
            }
        } catch (error) {
            console.error('Error checking verification status:', error);
            toast.error('Wystąpił błąd podczas sprawdzania statusu weryfikacji');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVerificationStatus();
    }, [router]);

    const handleBusinessSelect = (place: google.maps.places.PlaceResult) => {
        setSelectedBusiness(place);
    };

    const handleVerificationError = (error: { code?: string; message?: string } | null | undefined | unknown) => {
        const typedError = error as { code?: string; message?: string } | null | undefined;
        if (typedError?.code === 'ERR_ALREADY_VERIFIED') {
            handleCompleteVerification();
        } else if (typedError?.code === 'ERR_BUSINESS_NOT_FOUND') {
            toast.error('Firma nie została znaleziona. Upewnij się, że podałeś poprawną firmę.');
        } else {
            toast.error(typedError?.message || 'Wystąpił nieoczekiwany błąd podczas weryfikacji');
        }
    };

    const handleSubmit = async () => {
        if (!selectedBusiness?.place_id) return;

        setIsSubmitting(true);
        try {
            const verificationResponse = await apiService.initiateBusinessVerification(selectedBusiness.place_id);
            if (verificationResponse.success) {
                const challengeResponse = await apiService.getBusinessVerificationChallenge();
                if (challengeResponse.success) {
                    setVerificationChallenge(challengeResponse.data);
                    setVerificationStatus({
                        verificationId: verificationResponse.data.verificationId,
                        isVerified: false,
                        status: 'PENDING'
                    });
                }
            }

            if (verificationResponse.error) {
                handleVerificationError(verificationResponse.error);
            }
        } catch (error) {
            console.error('Error during business verification:', error);
            handleVerificationError(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProcessVerification = async () => {
        try {
            const response = await apiService.processBusinessVerificationChallenge();
            if (response.success) {
                if (response.data.isVerified) {
                    handleCompleteVerification();
                } else {
                    toast.error('Weryfikacja nie powiodła się. Upewnij się, że godziny otwarcia zostały ustawione zgodnie z wymaganiami.');
                }
            } else {
                handleVerificationError(response.error);
            }
        } catch (error) {
            console.error('Error processing verification:', error);
            handleVerificationError(error);
        }
    };

    const handleCompleteVerification = async () => {
        try {
            const statusResponse = await apiService.getBusinessVerificationStatus();
            const metadata = statusResponse.metadata as { businessId: number; placeId: string } | undefined;
            if (!metadata?.placeId) {
                toast.error('Nie można zakończyć weryfikacji - brak danych firmy');
                return;
            }
            await completeBusinessVerificationStep(metadata.placeId);
            toast.success('Twoja firma została pomyślnie zweryfikowana!');
        } catch (error) {
            console.error('Error completing verification:', error);
            toast.error('Wystąpił błąd podczas kończenia weryfikacji');
        }
    };

    return (
        <OnboardingRoute step={AccountOnboardingStep.BusinessVerification}>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">
                            Weryfikacja Firmy
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Wybierz swoją firmę, aby zweryfikować konto i odblokować wszystkie funkcje platformy.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="text-center">Ładowanie...</div>
                    ) : verificationStatus?.isVerified ? (
                        <VerificationStatus onComplete={handleCompleteVerification} />
                    ) : verificationChallenge ? (
                        <VerificationChallenge
                            challenge={verificationChallenge}
                            onVerify={handleProcessVerification}
                            isSubmitting={isSubmitting}
                        />
                    ) : (
                        <BusinessSearch
                            onBusinessSelect={handleBusinessSelect}
                            onSubmit={handleSubmit}
                            selectedBusiness={selectedBusiness}
                            isSubmitting={isSubmitting}
                        />
                    )}
                    {!verificationStatus?.isVerified && <InfoSections />}
                </div>
            </div>
        </OnboardingRoute>
    );
}
