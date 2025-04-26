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