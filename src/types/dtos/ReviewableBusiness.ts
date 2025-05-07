export type GetNextBusinessForReviewRequestDto = {
    skipBusiness: boolean;
}

export type GetNextBusinessForReviewResponseDto = {
    businessId: number;
    placeId: string;
    cid: string;
    businessName: string;
    mapUrl: string;
    initialReviewTimeInSeconds: number;
    remainingReviewTimeInSeconds: number;
};

export type GetTimeLeftForBusinessReviewResponseDto = {
    remainingReviewTimeInSeconds: number;
};

export type SubmitBusinessReviewRequestDto = {
    rating: number;
    comment: string;
    postedGoogleReview: boolean;
}

export type SubmitBusinessReviewResponseDto = {
    businessId: number;
    reviewId: number;
    submittedOn: string;
};