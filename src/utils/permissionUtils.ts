import { UserPermission } from "@/enums/permissions";

export const mapIntToPermissions = (permissionInt: number): UserPermission[] => {
    const permissions: UserPermission[] = [];

    Object.values(UserPermission)
        .filter(value => typeof value === 'number')
        .forEach(permission => {
            if (typeof permission === 'number' && (permissionInt & permission) === permission) {
                permissions.push(permission);
            }
        });

    return permissions;
};

/**
 * Checks if the user has the given permission(s).
 * @param userPermissions - The user's permissions to check against.
 * @param requiredPermissions - The permission(s) to check for. Can be a single permission or an array of permissions.
 * @param requireAll - If true, the user must have all of the required permissions. If false, having any of the required permissions is sufficient. Default is true.
 * @returns True if the user has the permission(s), false otherwise.
 */
export const hasPermission = (
    userPermissions: UserPermission | UserPermission[] | undefined,
    requiredPermissions: UserPermission | UserPermission[],
    requireAll: boolean = true
): boolean => {
    if (!userPermissions) {
        return false;
    }

    const userPermsArray = Array.isArray(userPermissions) ? userPermissions : [userPermissions];
    const requiredPermsArray = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];

    if (requireAll) {
        return requiredPermsArray.every(permission =>
            userPermsArray.includes(permission)
        );
    } else {
        return requiredPermsArray.some(permission =>
            userPermsArray.includes(permission)
        );
    }
};