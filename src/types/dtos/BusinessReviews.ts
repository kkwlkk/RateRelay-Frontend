import { BusinessReviewStatus } from "../BusinessReviewStatus";

export type GetAwaitingBusinessReviewsRequestDto = {
    businessId: number;
};

export type GetAwaitingBusinessReviewsResponseDto = {
    reviewId: number;
    submittedAt: string;
};

export type GetBusinessReviewsResponseDto = {
    id: number;
    status: BusinessReviewStatus;
    rating: number;
    comment: string;
    dateCreatedUtc: string;
    postedGoogleMapsReview: boolean;
    googleMapsReviewUrl?: string;
}

export type AcceptPendingBusinessReviewRequestDto = {
    reviewId: number;
};

export type AcceptPendingBusinessReviewResponseDto = {
    isAccepted: boolean;
};

export type RejectPendingBusinessReviewRequestDto = {
    reviewId: number;
};

export type RejectPendingBusinessReviewResponseDto = {
    isRejected: boolean;
};
