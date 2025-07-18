import { AccountOnboardingStep } from "./dtos/Onboarding";
import { UserPermission } from "@/enums/permissions";

type User = {
    id: number;
    googleUsername: string;
    displayName: string;
    email: string;
    pointBalance: number;
    permissions: number;
    hasCompletedOnboarding: boolean;
    onboardingStep: AccountOnboardingStep;
    mappedPermissions: UserPermission[];
};

export type { User };