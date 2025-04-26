export type AuthResponseDto = {
    accessToken: string;
    refreshToken: string;
    isNewUser: boolean;
};

export type GoogleAuthRequestDto = {
    oAuthIdToken: string;
};

export type RefreshTokenRequestDto = {
    refreshToken: string;
};

export type RefreshTokenResponseDto = {
    accessToken: string;
    refreshToken: string;
};