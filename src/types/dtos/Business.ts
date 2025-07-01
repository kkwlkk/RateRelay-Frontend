export type GetBusinessesResponseDto = {
    id: number;
    placeId: string;
    businessName: string;
    isVerified: boolean;
    isEligibleForQueue: boolean;
    averageRating: number;
    dateCreatedUtc: string;
    reviews: {
        totalCount: number;
        acceptedCount: number;
        rejectedCount: number;
        pendingCount: number;
    }
}