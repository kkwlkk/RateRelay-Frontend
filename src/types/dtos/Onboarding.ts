enum AccountOnboardingStep {
    BusinessVerification = 0,
    Welcome = 1,
    // ProfileSetup = 2,
    Completed = 3,
}

export type GetOnboardingStatusResponseDto = {
    currentStep: AccountOnboardingStep;
    currentStepName: string;
    lastUpdated?: string;
    isCompleted: boolean;
    completedSteps: string[];
    remainingSteps: string[];
};

export type CompleteWelcomeStepRequestDto = {
    acceptedTerms: boolean;
};

export type CompleteWelcomeStepResponseDto = {
    nextStep: AccountOnboardingStep;
};

export type CompleteProfileSetupRequestDto = {
    displayName: string;
};

export type CompleteProfileSetupResponseDto = {
    nextStep: AccountOnboardingStep;
};

export type CompleteBusinessVerificationStepRequestDto = {
    placeId: string;
};

export type CompleteBusinessVerificationStepResponseDto = {
    nextStep: AccountOnboardingStep;
};

export type CompleteOnboardingStepResponseDto = {
    completedAt: string;
};

export { AccountOnboardingStep };