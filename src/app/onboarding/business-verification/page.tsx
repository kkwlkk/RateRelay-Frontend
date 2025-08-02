'use client';

import { useState, useEffect } from 'react';
import OnboardingRoute from '@/components/auth/OnboardingRoute';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { AccountOnboardingStep } from '@/types/dtos/Onboarding';
import { useRouter } from 'next/navigation';
import { apiService } from '@/services/api';
import { BusinessVerificationStatusResponseDto, BusinessVerificationChallengeResponseDto } from '@/types/dtos/BusinessVerificaton';
import { BusinessSearch } from '@/components/onboarding/businessVerification/BusinessSearch';
import { VerificationChallenge } from '@/components/onboarding/businessVerification/VerificationChallenge';
import { InfoSections } from '@/components/onboarding/businessVerification/InfoSections';
import { Building2, Shield, CheckCircle, Clock } from 'lucide-react';
import { GenericCenterLoader } from '@/components/GenericLoader';
import { Button } from '@/components/ui/button';
import { showToast } from '@/lib/toast';

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
                        status: 'Completed',
                        verificationId: ''
                    });
                }
            }
        } catch (error) {
            console.error('Error checking verification status:', error);
            showToast.error('Wystąpił błąd podczas sprawdzania statusu weryfikacji', 'business-verification-error');
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
            showToast.error('Firma nie została znaleziona. Upewnij się, że podałeś poprawną firmę.', 'business-verification-error');
        } else {
            showToast.error(typedError?.message || 'Wystąpił nieoczekiwany błąd podczas weryfikacji', 'business-verification-error');
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

            if (verificationResponse.error?.code === "ERR_ALREADY_EXISTS") {
                showToast.error('Ta firma już istnieje, nie można jej ponownie zweryfikować.', 'business-verification-error');
                return;
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
                    showToast.error('Weryfikacja nie powiodła się. Upewnij się, że godziny otwarcia zostały ustawione zgodnie z wymaganiami.', 'business-verification-error');
                }

                return;
            }

            if (response.error?.code === 'ERR_ALREADY_VERIFIED') {
                showToast.success('Twoja firma została zweryfikowana! 🎉', 'business-verification-success');
                const metadata = response.metadata as { businessId: number; placeId: string } | undefined;
                if (metadata?.placeId) {
                    setVerificationStatus({
                        isVerified: true,
                        status: 'Completed',
                        verificationId: ''
                    });
                }
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
                showToast.error('Nie można zakończyć weryfikacji - brak danych firmy', 'business-verification-error');
                return;
            }
            await completeBusinessVerificationStep(metadata.placeId);
        } catch (error) {
            console.error('Error completing verification:', error);
            showToast.error('Wystąpił błąd podczas kończenia weryfikacji', 'business-verification-error');
        }
    };

    if (isLoading) {
        return (
            <OnboardingRoute step={AccountOnboardingStep.BusinessVerification}>
                <GenericCenterLoader />
            </OnboardingRoute>
        );
    }

    const getStatusIcon = () => {
        if (verificationStatus?.isVerified) {
            return <CheckCircle className="h-8 w-8 text-green-500" />;
        } else if (verificationChallenge) {
            return <Clock className="h-8 w-8 text-orange-500" />;
        }
        return <Shield className="h-8 w-8 text-blue-500" />;
    };

    const getStatusColor = () => {
        if (verificationStatus?.isVerified) return 'green';
        if (verificationChallenge) return 'orange';
        return 'blue';
    };

    return (
        <OnboardingRoute step={AccountOnboardingStep.BusinessVerification}>
            <div className="bg-zinc-50 dark:bg-zinc-900 py-4 sm:py-8 px-4 overflow-x-hidden">
                <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 w-full">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm w-full ">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                            <div className={`p-3 rounded-lg bg-${getStatusColor()}-100 dark:bg-${getStatusColor()}-900/20 flex-shrink-0 w-min`}>
                                {getStatusIcon()}
                            </div>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 break-words">
                                    Potwierdzenie tożsamości firmy
                                </h1>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm sm:text-base break-words">
                                    Potwierdzenie tożsamości to dowód na autentyczność Twojej firmy
                                </p>
                            </div>
                        </div>

                        {verificationStatus?.isVerified ? (
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 sm:p-6 w-full ">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                                    <h2 className="text-lg font-semibold text-green-900 dark:text-green-100 break-words">
                                        Firma zweryfikowana
                                    </h2>
                                </div>
                                <p className="text-green-700 dark:text-green-300 mb-4 text-sm sm:text-base break-words">
                                    Twoja firma została pomyślnie zweryfikowana w systemie TrustRate.
                                </p>
                                <Button
                                    onClick={handleCompleteVerification}
                                    className="bg-green-600 hover:bg-green-700 px-6 sm:px-8 w-full sm:w-auto"
                                >
                                    Kontynuuj
                                </Button>
                            </div>
                        ) : verificationChallenge ? (
                            <div className="bg-orange-50 dark:bg-orange-950/15 border border-orange-200 dark:border-orange-800 rounded-lg p-4 sm:p-6 w-full ">
                                <div className="flex items-center gap-3 mb-4">
                                    <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                                    <h2 className="text-lg font-semibold text-orange-900 dark:text-orange-100 break-words">
                                        Oczekiwana weryfikacja
                                    </h2>
                                </div>
                                <div className="w-full ">
                                    <VerificationChallenge
                                        challenge={verificationChallenge}
                                        onVerify={handleProcessVerification}
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6 w-full">
                                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 w-full ">
                                    <div className="flex items-start gap-3">
                                        <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1 break-words">
                                                Znajdź swoją firmę
                                            </h3>
                                            <p className="text-sm text-blue-700 dark:text-blue-300 break-words">
                                                Wyszukaj swoją firmę w Google Maps, aby rozpocząć proces weryfikacji
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full z-50">
                                    <BusinessSearch
                                        onBusinessSelect={handleBusinessSelect}
                                        onSubmit={handleSubmit}
                                        selectedBusiness={selectedBusiness}
                                        isSubmitting={isSubmitting}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {!verificationStatus?.isVerified && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
                            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm w-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex-shrink-0">
                                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 break-words">
                                        Bezpieczeństwo
                                    </h3>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
                                    Weryfikacja zapewnia bezpieczeństwo i autentyczność wszystkich firm w systemie
                                </p>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm w-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 flex-shrink-0">
                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 break-words">
                                        Wiarygodność
                                    </h3>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
                                    Zweryfikowane firmy budują większe zaufanie wśród klientów i partnerów
                                </p>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 sm:p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm w-full ">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex-shrink-0">
                                        <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 break-words">
                                        Pełny dostęp
                                    </h3>
                                </div>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 break-words">
                                    Po weryfikacji otrzymasz dostęp do wszystkich funkcji platformy TrustRate
                                </p>
                            </div>
                        </div>
                    )}

                    {!verificationStatus?.isVerified && (
                        <div className="w-full ">
                            <InfoSections />
                        </div>
                    )}
                </div>
            </div>
        </OnboardingRoute>
    );
}