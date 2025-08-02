import { AccountOnboardingStep } from "@/types/dtos/Onboarding";

export const getOnboardingStepPath = (step: AccountOnboardingStep) => {
    switch (step) {
        case AccountOnboardingStep.Welcome:
            return '/onboarding/welcome';
        // case AccountOnboardingStep.ProfileSetup:
        //     return '/onboarding/profile-setup';
        case AccountOnboardingStep.BusinessVerification:
            return '/onboarding/business-verification';
        case AccountOnboardingStep.Completed:
            return '/onboarding/complete';
        default:
            return '/onboarding/welcome';
    }
}