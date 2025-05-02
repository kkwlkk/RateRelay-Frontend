import { HomeIcon } from 'lucide-react';
import { IconType } from '@/types/IconType';
import { UserPermission } from '@/enums/permissions';

export type NavigationRoute = {
    path: string;
    label: string;
    icon?: IconType;
    requiredPermission?: UserPermission | UserPermission[];
    section?: string;
    subRoutes?: NavigationRoute[];
};

export const dashboardRoutes: NavigationRoute[] = [
    {
        path: '/dashboard',
        label: 'Statystyki',
        icon: HomeIcon,
        section: 'Główne',
    },
]
