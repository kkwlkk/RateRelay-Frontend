import { ApiResponse } from "@/services/api";

export class ApiError extends Error {
    public code?: string;
    public validationErrors?: Array<{
        property: string;
        message: string;
        code?: string;
    }>;
    public response?: ApiResponse<unknown>;

    constructor(message: string, code?: string, response?: ApiResponse<unknown>) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.response = response;
    }

    static fromResponse(response: ApiResponse<unknown>): ApiError {
        const error = new ApiError(
            response.error?.message || 'API Error',
            response.error?.code,
            response
        );
        error.validationErrors = response.error?.validationErrors;
        return error;
    }
}