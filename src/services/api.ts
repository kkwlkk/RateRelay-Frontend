import { ReviewReportReason } from '@/enums/reviewReportReason';
import { BusinessReviewStatus } from '@/types/BusinessReviewStatus';
import { AccountDataResponseDto, AccountReviewHistoryResponseDto, AccountStatisticsResponseDto } from '@/types/dtos/Account';
import { AuthResponseDto } from '@/types/dtos/Auth';
import { GetBusinessesResponseDto } from '@/types/dtos/Business';
import { AcceptPendingBusinessReviewResponseDto, GetBusinessReviewsResponseDto } from '@/types/dtos/BusinessReviews';
import { BusinessVerificationChallengeResponseDto, BusinessVerificationResponseDto, BusinessVerificationStatusResponseDto } from '@/types/dtos/BusinessVerificaton';
import { CompleteBusinessVerificationStepRequestDto, CompleteBusinessVerificationStepResponseDto, CompleteOnboardingStepResponseDto, CompleteProfileSetupRequestDto, CompleteProfileSetupResponseDto, CompleteWelcomeStepRequestDto, CompleteWelcomeStepResponseDto, GetOnboardingStatusResponseDto } from '@/types/dtos/Onboarding';
import { GetNextBusinessForReviewRequestDto, GetNextBusinessForReviewResponseDto, GetTimeLeftForBusinessReviewResponseDto, SubmitBusinessReviewRequestDto, SubmitBusinessReviewResponseDto } from '@/types/dtos/ReviewableBusiness';
import { CreateUserTicketDto, GetUserTicketDetailsDto, GetUserTicketsResponseDto, TicketCommentDto, TicketType } from '@/types/dtos/Tickets';
import { getSession } from 'next-auth/react';
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

                return {
                    success: false,
                    data: null as unknown,
                    error: {
                        message: result?.error?.message || `HTTP ${response.status}: ${response.statusText}`,
                        code: result?.error?.code || 'HTTP_ERROR',
                        details: result?.error?.details
                    },
                    metadata: result?.metadata || {}
                } as ApiResponse<T, TMeta, TPagination>;
            }

            return result;
        } catch (err) {
            console.error('Error during API request:', err);

            if (err instanceof Error && err.message.includes('Failed to fetch')) {
                toast.error('Błąd sieci. Sprawdź połączenie internetowe.');
            } else if (err instanceof Error && err.message.includes('NetworkError')) {
                toast.error('Błąd sieci. Sprawdź połączenie internetowe.');
            } else if (err instanceof Error && err.message.includes('Unexpected token')) {
                toast.error('Otrzymano nieprawidłowy format odpowiedzi z serwera.');
            } else if (err instanceof Error && err.message.includes('JSON')) {
                toast.error('Otrzymano nieprawidłowy format odpowiedzi z serwera.');
            } else {
                toast.error('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
            }

            return {
                success: false,
                data: null as unknown,
                error: {
                    message: 'Wystąpił błąd podczas przetwarzania żądania.',
                    code: 'REQUEST_ERROR',
                    details: err instanceof Error ? err.message : String(err)
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

    // /api/user/account
    async getAccount(): Promise<ApiResponse<AccountDataResponseDto>> {
        return this.request('/api/user/account');
    }

    async getAccountStats(): Promise<ApiResponse<AccountStatisticsResponseDto>> {
        return this.request('/api/user/account/stats');
    }

    // /api/user/account/reviews
    async getAccountReviewHistory(request: PagedRequest = {}): Promise<PaginatedApiResponse<AccountReviewHistoryResponseDto[]>> {
        return this.request('/api/user/account/reviews', 'GET', undefined, this.toQueryParams(request));
    }

    // Business review endpoints

    // /api/user/business/{businessId}/reviews/{reviewId}
    async getBusinessReviewById(businessId: number, reviewId: number): Promise<ApiResponse<GetBusinessReviewsResponseDto>> {
        return this.request(`/api/user/business/${businessId}/reviews/${reviewId}`);
    }

    // /api/user/business/{businessId}/reviews/{reviewId}/accept
    async acceptPendingBusinessReview(businessId: number, reviewId: number): Promise<ApiResponse<AcceptPendingBusinessReviewResponseDto>> {
        return this.request(`/api/user/business/${businessId}/reviews/${reviewId}/accept`, 'POST');
    }

    // /api/user/business/{businessId}/reviews/{reviewId}/report
    async reportBusinessReview(businessId: number, reviewId: number, reason: ReviewReportReason, title: string, content: string): Promise<ApiResponse<void>> {
        return this.request(`/api/user/business/${businessId}/reviews/${reviewId}/report`, 'POST', { reason, title, content });
    }

    // Business verification endpoints


    async initiateBusinessVerification(placeId: string): Promise<ApiResponse<BusinessVerificationResponseDto>> {
        return this.request('/api/user/business/verification/initiate', 'POST', { placeId });
    }

    async getBusinessVerificationChallenge(): Promise<ApiResponse<BusinessVerificationChallengeResponseDto>> {
        return this.request('/api/user/business/verification/challenge');
    }

    async processBusinessVerificationChallenge(): Promise<ApiResponse<BusinessVerificationStatusResponseDto>> {
        return this.request('/api/user/business/verification/process', 'POST');
    }

    async getBusinessVerificationStatus(): Promise<ApiResponse<BusinessVerificationStatusResponseDto>> {
        return this.request('/api/user/business/verification/status');
    }

    // Reviewable business endpoints
    async getNextBusinessForReview(dto: GetNextBusinessForReviewRequestDto = { skipBusiness: false }): Promise<ApiResponse<GetNextBusinessForReviewResponseDto>> {
        return this.request('/api/user/reviewable-businesses/next', 'GET', undefined, this.dtoToQueryParams(dto));
    }

    async getTimeLeftForBusinessReview(): Promise<ApiResponse<GetTimeLeftForBusinessReviewResponseDto>> {
        return this.request('/api/user/reviewable-businesses/time-left');
    }

    async submitBusinessReview(data: SubmitBusinessReviewRequestDto): Promise<ApiResponse<SubmitBusinessReviewResponseDto>> {
        return this.request('/api/user/reviewable-businesses/submit', 'POST', data);
    }

    // Onboarding endpoints
    async getOnboardingStatus(): Promise<ApiResponse<GetOnboardingStatusResponseDto>> {
        return this.request('/api/user/onboarding/status');
    }

    async completeWelcomeStep(data: CompleteWelcomeStepRequestDto): Promise<ApiResponse<CompleteWelcomeStepResponseDto>> {
        return this.request('/api/user/onboarding/welcome', 'POST', data);
    }

    async completeProfileSetupStep(data: CompleteProfileSetupRequestDto): Promise<ApiResponse<CompleteProfileSetupResponseDto>> {
        return this.request('/api/user/onboarding/profile-setup', 'POST', data);
    }

    async completeBusinessVerificationStep(data: CompleteBusinessVerificationStepRequestDto): Promise<ApiResponse<CompleteBusinessVerificationStepResponseDto>> {
        return this.request('/api/user/onboarding/business-verification', 'POST', data);
    }

    async completeOnboardingStep(): Promise<ApiResponse<CompleteOnboardingStepResponseDto>> {
        return this.request('/api/user/onboarding/complete', 'POST');
    }

    // Business

    // /api/user/business
    async getAllUserBusinesses(request: PagedRequest = {}): Promise<PaginatedApiResponse<GetBusinessesResponseDto[]>> {
        return this.request('/api/user/business', 'GET', undefined, this.toQueryParams(request));
    }

    // /api/user/business
    async getBusinessById(businessId: number): Promise<ApiResponse<GetBusinessesResponseDto>> {
        return this.request(`/api/user/business/${businessId}`);
    }


    async getBusinessReviewsByBusinessId(
        businessId: number,
        status: BusinessReviewStatus | undefined,
        request: PagedRequest = {}
    ): Promise<PaginatedApiResponse<GetBusinessReviewsResponseDto[]>> {
        const params = this.toQueryParams(request);
        if (status !== undefined) {
            params.status = status.toString();
        }
        return this.request(`/api/user/business/${businessId}/reviews`, 'GET', undefined, params);
    }

    // User Tickets

    async createTicket(title: string, content: string, type: TicketType): Promise<ApiResponse<CreateUserTicketDto>> {
        return this.request('/api/user/tickets', 'POST', { title, description: content, type });
    }

    async getUserTickets(request: PagedRequest = {}): Promise<PaginatedApiResponse<GetUserTicketsResponseDto[]>> {
        return this.request('/api/user/tickets', 'GET', undefined, this.toQueryParams(request));
    }

    async getTicketById(ticketId: number, includeComments: boolean = false, includeHistory: boolean = false): Promise<ApiResponse<GetUserTicketDetailsDto>> {
        const params: Record<string, string> = {};
        if (includeComments) params.includeComments = 'true';
        if (includeHistory) params.includeHistory = 'true';

        return this.request(`/api/user/tickets/${ticketId}`, 'GET', undefined, Object.keys(params).length > 0 ? params : undefined);
    }

    async getTicketComments(ticketId: number): Promise<ApiResponse<TicketCommentDto[]>> {
        return this.request(`/api/user/tickets/${ticketId}/comments`);
    }

    async addTicketComment(ticketId: number, content: string, isInternal: boolean = false): Promise<ApiResponse<TicketCommentDto>> {
        return this.request(`/api/user/tickets/${ticketId}/comments`, 'POST', { comment: content, isInternal });
    }

    async closeTicket(ticketId: number): Promise<ApiResponse<void>> {
        return this.request(`/api/user/tickets/${ticketId}/close`, 'PUT');
    }
}

export const apiService = new ApiService();