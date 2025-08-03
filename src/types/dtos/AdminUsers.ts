export type AdminGetUsersFiltersDto = {
    isVerified?: boolean;
}

export type AdminGetUsersDto = {
    id: number;
    username: string;
    email: string;
    dateCreatedUtc: Date;
    isVerified: boolean;
}