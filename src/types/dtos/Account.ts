import { BusinessReviewStatus } from "../BusinessReviewStatus";
import { Role } from "../Role";
import { AccountOnboardingStep } from "./Onboarding";

export type AccountDataResponseDto = {
    id: number;
    username: string;
    email: string;
    permissions: number;
    pointBalance: number;
    role?: Role;
    hasCompletedOnboarding: boolean;
    onboardingStep?: AccountOnboardingStep;
};

export type AccountReviewHistoryResponseDto = {
    id: number;
    businessName: string;
    cid: string;
    mapUrl: string;
    status: BusinessReviewStatus;
    rating: number;
    comment: string;
    dateCreatedUtc: string;
}
