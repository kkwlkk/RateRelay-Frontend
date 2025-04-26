import { AccountDataResponseDto } from '@/types/dtos/Account';
import { AuthResponseDto } from '@/types/dtos/Auth';
import { AcceptPendingBusinessReviewResponseDto, GetAwaitingBusinessReviewsResponseDto, RejectPendingBusinessReviewResponseDto } from '@/types/dtos/BusinessReviews';
import { BusinessVerificationChallengeResponseDto, BusinessVerificationResponseDto, BusinessVerificationStatusResponseDto } from '@/types/dtos/BusinessVerificaton';
import { CompleteBusinessVerificationStepRequestDto, CompleteBusinessVerificationStepResponseDto, CompleteOnboardingStepResponseDto, CompleteProfileSetupRequestDto, CompleteProfileSetupResponseDto, CompleteWelcomeStepRequestDto, CompleteWelcomeStepResponseDto, GetOnboardingStatusResponseDto } from '@/types/dtos/Onboarding';
import { GetNextBusinessForReviewResponseDto, GetTimeLeftForBusinessReviewResponseDto, SubmitBusinessReviewResponseDto } from '@/types/dtos/ReviewableBusiness';
import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiResponse<T> = {
    success: boolean;
    data: T;
    error?: {
        message: string;
        code?: string;
        validationErrors?: Array<{
            property: string;
            message: string;
            code?: string;
        }>;
    };
    metadata?: {
        totalCount?: number;
        pageSize?: number;
        currentPage?: number;
        totalPages?: number;
        additionalInfo?: Record<string, unknown>;
    };
};

class ApiService {
    private async request<T>(
        endpoint: string,
        method: string = 'GET',
        data?: unknown,
        useAuth: boolean = true
    ): Promise<ApiResponse<T>> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        if (useAuth) {
            const session = await getSession();
            if (session?.accessToken) {
                headers['Authorization'] = `Bearer ${session.accessToken}`;
            } else {
                return {
                    success: false,
                    data: null as unknown,
                    error: {
                        message: 'No access token available',
                    },
                } as ApiResponse<T>;
            }
        }

        const config: RequestInit = {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        };

        const response = await fetch(`${API_URL}${endpoint}`, config);
        const result = await response.json();

        if (!response.ok) {
            if (response.status === 401) {
                console.error('Unauthorized access - token may be expired');
            }

            return result;
        }

        return result;
    }

    // Auth endpoints
    async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
        return this.request('/api/auth/refresh-token', 'POST', { refreshToken }, false);
    }

    async googleAuth(oAuthIdToken: string): Promise<ApiResponse<AuthResponseDto>> {
        return this.request('/api/auth/google', 'POST', { oAuthIdToken }, false);
    }

    // Account endpoints
    async getAccount(): Promise<ApiResponse<AccountDataResponseDto>> {
        return this.request('/api/account');
    }

    // Business review endpoints
    async getAwaitingBusinessReviews(businessId: number): Promise<ApiResponse<GetAwaitingBusinessReviewsResponseDto[]>> {
        return this.request(`/api/business/reviews/awaiting?businessId=${businessId}`);
    }

    async acceptPendingBusinessReview(reviewId: number): Promise<ApiResponse<AcceptPendingBusinessReviewResponseDto>> {
        return this.request('/api/business/reviews/accept', 'POST', { reviewId });
    }

    async rejectPendingBusinessReview(reviewId: number): Promise<ApiResponse<RejectPendingBusinessReviewResponseDto>> {
        return this.request('/api/business/reviews/reject', 'POST', { reviewId });
    }

    // Business verification endpoints
    async initiateBusinessVerification(placeId: string): Promise<ApiResponse<BusinessVerificationResponseDto>> {
        return this.request('/api/business/verification/initiate', 'POST', { placeId });
    }

    async getBusinessVerificationChallenge(): Promise<ApiResponse<BusinessVerificationChallengeResponseDto>> {
        return this.request('/api/business/verification/challenge');
    }

    async processBusinessVerificationChallenge(): Promise<ApiResponse<BusinessVerificationStatusResponseDto>> {
        return this.request('/api/business/verification/process', 'POST');
    }

    async getBusinessVerificationStatus(): Promise<ApiResponse<BusinessVerificationStatusResponseDto>> {
        return this.request('/api/business/verification/status');
    }

    // Reviewable business endpoints
    async getNextBusinessForReview(): Promise<ApiResponse<GetNextBusinessForReviewResponseDto>> {
        return this.request('/api/reviewable-businesses/next');
    }

    async getTimeLeftForBusinessReview(): Promise<ApiResponse<GetTimeLeftForBusinessReviewResponseDto>> {
        return this.request('/api/reviewable-businesses/time-left');
    }

    async submitBusinessReview(): Promise<ApiResponse<SubmitBusinessReviewResponseDto>> {
        return this.request('/api/reviewable-businesses/submit', 'POST');
    }

    // Onboarding endpoints
    async getOnboardingStatus(): Promise<ApiResponse<GetOnboardingStatusResponseDto>> {
        return this.request('/api/onboarding/status');
    }

    async completeWelcomeStep(data: CompleteWelcomeStepRequestDto): Promise<ApiResponse<CompleteWelcomeStepResponseDto>> {
        return this.request('/api/onboarding/welcome', 'POST', data);
    }

    async completeProfileSetupStep(data: CompleteProfileSetupRequestDto): Promise<ApiResponse<CompleteProfileSetupResponseDto>> {
        return this.request('/api/onboarding/profile-setup', 'POST', data);
    }

    async completeBusinessVerificationStep(data: CompleteBusinessVerificationStepRequestDto): Promise<ApiResponse<CompleteBusinessVerificationStepResponseDto>> {
        return this.request('/api/onboarding/business-verification', 'POST', data);
    }

    async completeOnboardingStep(): Promise<ApiResponse<CompleteOnboardingStepResponseDto>> {
        return this.request('/api/onboarding/complete', 'POST');
    }
}

export const apiService = new ApiService();