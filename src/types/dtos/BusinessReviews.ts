export type GetAwaitingBusinessReviewsRequestDto = {
    businessId: number;
};

export type GetAwaitingBusinessReviewsResponseDto = {
    reviewId: number;
    submittedAt: string;
};

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
