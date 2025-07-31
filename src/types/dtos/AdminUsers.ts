export type AdminGetUsersFiltersDto = {
    isVerified?: boolean;
}

export type AdminGetUsersDto = {
    id: number;
    displayName: string;
    googleUsername: string;
    email: string;
    dateCreatedUtc: Date;
    isVerified: boolean;
}