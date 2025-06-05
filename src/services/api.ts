import { AccountDataResponseDto, AccountReviewHistoryResponseDto } from '@/types/dtos/Account';
import { AuthResponseDto } from '@/types/dtos/Auth';
import { AcceptPendingBusinessReviewResponseDto, GetAwaitingBusinessReviewsResponseDto, RejectPendingBusinessReviewResponseDto } from '@/types/dtos/BusinessReviews';
import { BusinessVerificationChallengeResponseDto, BusinessVerificationResponseDto, BusinessVerificationStatusResponseDto } from '@/types/dtos/BusinessVerificaton';
import { CompleteBusinessVerificationStepRequestDto, CompleteBusinessVerificationStepResponseDto, CompleteOnboardingStepResponseDto, CompleteProfileSetupRequestDto, CompleteProfileSetupResponseDto, CompleteWelcomeStepRequestDto, CompleteWelcomeStepResponseDto, GetOnboardingStatusResponseDto } from '@/types/dtos/Onboarding';
import { GetNextBusinessForReviewRequestDto, GetNextBusinessForReviewResponseDto, GetTimeLeftForBusinessReviewResponseDto, SubmitBusinessReviewRequestDto, SubmitBusinessReviewResponseDto } from '@/types/dtos/ReviewableBusiness';
import { getSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ApiResponse<T, M = unknown, P = unknown> = {
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
    metadata?: M;
    pagination?: P;
};

export interface PaginationMeta {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export type PaginatedApiResponse<T, M = unknown> = ApiResponse<T, M, PaginationMeta>;

interface PagedRequest {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    search?: string;
}

class ApiService {
    private async request<T, TMeta = unknown, TPagination = unknown>(
        endpoint: string,
        method: string = 'GET',
        data?: unknown,
        params?: Record<string, string>,
        useAuth: boolean = true
    ): Promise<ApiResponse<T, TMeta, TPagination>> {
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
                } as ApiResponse<T, TMeta, TPagination>;
            }
        }

        const config: RequestInit = {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        };

        if (params) {
            const queryParams = new URLSearchParams(params);
            endpoint += `?${queryParams.toString()}`;
        }

        try {
            const response = await fetch(`${API_URL}${endpoint}`, config);
            const contentType = response.headers.get('content-type');
            let result;

            if (response.status === 204 || !contentType) {
                result = {};
            } else if (contentType && contentType.includes('application/json')) {
                try {
                    const text = await response.text();
                    result = text ? JSON.parse(text) : {};
                } catch (parseError) {
                    console.error('Error parsing JSON response:', parseError);
                    return {
                        success: false,
                        data: null as unknown,
                        error: {
                            message: 'Invalid response format',
                            code: 'INVALID_RESPONSE',
                            details: parseError instanceof Error ? parseError.message : undefined
                        },
                    } as ApiResponse<T, TMeta, TPagination>;
                }
            } else {
                const text = await response.text();
                return {
                    success: false,
                    data: null as unknown,
                    error: {
                        message: 'Response is not in JSON format',
                        code: 'INVALID_FORMAT',
                        details: text.substring(0, 100)
                    },
                } as ApiResponse<T, TMeta, TPagination>;
            }

            if (!response.ok) {
                if (response.status === 429) {
                    const retryAfter = response.headers.get('X-RateLimit-Reset');
                    const retryMessage = retryAfter
                        ? `Przekroczono limit zapytań. Spróbuj ponownie za ${retryAfter} sekund.`
                        : 'Przekroczono limit zapytań. Spróbuj ponownie za chwilę.';

                    toast.error(retryMessage);
                }

                if (response.status === 401) {
                    console.error('Unauthorized access - token may be expired');
                    toast.error('Twoja sesja wygasła. Proszę się zalogować ponownie.');
                    await signOut({ redirect: true, callbackUrl: '/login' });
                }

                if (response.status === 403) {
                    toast.error('Nie posiadasz dostępu do tego zasobu. Jeśli uważasz, że jest to błąd, skontaktuj się z administratorem.');
                }

                return result;
            }

            return result;
        } catch (err) {
            console.error('Error during API request:', err);
            toast.error('Wystąpił problem z połączeniem z serwerem. Proszę spróbować ponownie później.');

            return {
                success: false,
                data: null as unknown,
                error: {
                    message: 'Network error',
                    code: 'NETWORK_ERROR',
                    details: err instanceof Error ? err.message : undefined
                },
            } as ApiResponse<T, TMeta, TPagination>;
        }
    }

    private dtoToQueryParams(dto: Record<string, unknown>): Record<string, string> {
        return Object.entries(dto).reduce((acc, [key, value]) => {
            if (value !== null && value !== undefined) {
                acc[key] = String(value);
            }
            return acc;
        }, {} as Record<string, string>);
    }

    private toQueryParams(request: PagedRequest): Record<string, string> {
        const params: Record<string, string> = {};

        if (request.page) params.page = String(request.page);
        if (request.pageSize) params.pageSize = String(request.pageSize);
        if (request.sortBy) params.sortBy = request.sortBy;
        if (request.sortDirection) params.sortDirection = request.sortDirection;
        if (request.search) params.search = request.search;

        return params;
    }

    // Auth endpoints
    async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
        return this.request('/api/auth/refresh-token', 'POST', { refreshToken }, undefined, false);
    }

    async googleAuth(oAuthIdToken: string): Promise<ApiResponse<AuthResponseDto>> {
        return this.request('/api/auth/google', 'POST', { oAuthIdToken }, undefined, false);
    }

    // Account endpoints
    async getAccount(): Promise<ApiResponse<AccountDataResponseDto>> {
        return this.request('/api/account');
    }

    async getAccountReviewHistory(request: PagedRequest = {}): Promise<PaginatedApiResponse<AccountReviewHistoryResponseDto[]>> {
        return this.request('/api/account/review-history', 'GET', undefined, this.toQueryParams(request));
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
    async getNextBusinessForReview(dto: GetNextBusinessForReviewRequestDto = { skipBusiness: false }): Promise<ApiResponse<GetNextBusinessForReviewResponseDto>> {
        return this.request('/api/reviewable-businesses/next', 'GET', undefined, this.dtoToQueryParams(dto));
    }

    async getTimeLeftForBusinessReview(): Promise<ApiResponse<GetTimeLeftForBusinessReviewResponseDto>> {
        return this.request('/api/reviewable-businesses/time-left');
    }

    async submitBusinessReview(data: SubmitBusinessReviewRequestDto): Promise<ApiResponse<SubmitBusinessReviewResponseDto>> {
        return this.request('/api/reviewable-businesses/submit', 'POST', data);
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