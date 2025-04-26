export type Role = {
    id: number;
    name: string;
    description?: string;
    permissions: number;
    isHidden: boolean;
};