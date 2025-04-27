import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const hasPermission = (userPermissions: string[], requiredPermissions: string[]): boolean => {
    return requiredPermissions.every(permission => userPermissions.includes(permission));
};