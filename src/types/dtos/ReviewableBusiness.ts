export type GetNextBusinessForReviewResponseDto = {
    businessId: number;
    placeId: string;
    cid: string;
    businessName: string;
    mapUrl: string;
    remainingReviewTimeInSeconds: number;
};

export type GetTimeLeftForBusinessReviewResponseDto = {
    remainingReviewTimeInSeconds: number;
};

export type SubmitBusinessReviewResponseDto = {
    businessId: number;
    reviewId: number;
    submittedOn: string;
};