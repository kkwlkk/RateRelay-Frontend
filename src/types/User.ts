import { AccountOnboardingStep } from "./dtos/Onboarding";

type User = {
    id: number;
    username: string;
    email: string;
    pointBalance: number;
    permissions: number;
    hasCompletedOnboarding: boolean;
    onboardingStep: AccountOnboardingStep;
};

export type { User };