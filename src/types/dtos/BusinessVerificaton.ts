export type InitiateBusinessVerificationRequestDto = {
    placeId: string;
};

export type BusinessVerificationResponseDto = {
    verificationId: string;
    status: string;
    verificationDay: number;
    verificationOpeningTime: string;
    verificationClosingTime: string;
};

export type BusinessVerificationStatusResponseDto = {
    verificationId: string;
    isVerified: boolean;
    status: string;
};

export type BusinessVerificationChallengeResponseDto = {
    verificationDay: number;
    verificationOpeningTime: string;
    verificationClosingTime: string;
};