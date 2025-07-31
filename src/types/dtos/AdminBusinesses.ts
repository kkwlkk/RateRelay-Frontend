export interface AdminBusinessFilterDto {
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    search?: string;
    minReviews?: number;
    maxReviews?: number;
    isVerified?: boolean;
    ownerId?: number;
}

export type BoostBusinessInputDto = {
    reason: string;
    targetReviews?: number;
}

export type UnboostBusinessInputDto = {
    reason?: string;
}

export type BoostSelectedBusinessesInputDto = {
    businessIds: number[];
    reason: string;
    targetReviews?: number;
}

export type AdminBusinessListDto = {
    id: number;
    businessName: string;
    ownerDisplayName: string;
    ownerEmail: string;
    currentReviews: number;
    pendingReviews: number;
    averageRating: number;
    priority: number;
    isVerified: boolean;
    isBoosted: boolean;
    dateCreatedUtc: Date;
    isEligibleForQueue: boolean;
    lastBoostReason?: string;
    boostTargetReviews?: number;
}

export type BusinessBoostResultDto = {
    businessId: number;
    businessName: string;
    oldPriority: number;
    newPriority: number;
    currentReviews: number;
    reviewsNeededForTarget: number;
    reason: string;
    boostedAt: Date;
    isNowBoosted: boolean;
}

export type BulkBoostResultDto = {
    totalRequested: number;
    successfullyBoosted: number;
    failed: number;
    reason: string;
    results: BusinessBoostResultDto[];
    failedBusinessIds: number[];
}

export type AdminCreateBusinessInputDto = {
    placeId: string;
    ownerId: number;
    isVerified: boolean;
}

export type AdminCreateBusinessOutputDto = {
    id: number;
}

export type AdminBusinessDetailDto = {
    id: number;
    businessName: string;
    placeId: string;
    cid: string;
    mapUrl: string;
    ownerAccountId: number;
    ownerDisplayName: string;
    ownerEmail: string;
    ownerPointBalance: number;
    priority: number;
    isVerified: boolean;
    isBoosted: boolean;
    dateCreatedUtc: Date;
    totalReviews: number;
    acceptedReviews: number;
    pendingReviews: number;
    rejectedReviews: number;
    averageRating: number;
    lastReviewDate?: Date;
    isEligibleForQueue: boolean;
    boostHistory: BusinessBoostHistoryDto[];
    boostTargetReviews?: number;
}

export type BusinessBoostCandidateDto = {
    id: number;
    businessName: string;
    ownerDisplayName: string;
    currentReviews: number;
    reviewsNeeded: number;
    currentPriority: number;
    isBoosted: boolean;
    progressPercentage: number;
    recommendationReason: string;
}

export type BusinessBoostHistoryDto = {
    oldPriority: number;
    newPriority: number;
    reason: string;
    changedByDisplayName: string;
    changedAt: Date;
    wasBoosted: boolean;
}