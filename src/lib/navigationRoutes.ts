import { HomeIcon, MessagesSquare } from 'lucide-react';
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
        section: 'Centrum',
    },
    // activity
    {
        path: '/dashboard/exchange-feedback',
        label: 'Wymiana doświadczeń',
        icon: MessagesSquare,
        section: 'Aktywność',
    },
    // // your business
    // {
    //     path: '/dashboard/manage-business',
    //     label: 'Zarządzanie firmą',
    //     icon: Building,
    //     section: 'Twoja firma',
    // },
    // // settings
    // {
    //     path: '/dashboard/settings',
    //     label: 'Ustawienia',
    //     icon: Settings,
    //     section: 'Ustawienia',
    //     subRoutes: [
    //         {
    //             path: '/dashboard/settings/account',
    //             label: 'Konto',
    //             icon: User,
    //         },
    //         {
    //             path: '/dashboard/settings/notifications',
    //             label: 'Powiadomienia',
    //             icon: Bell,
    //         },
    //     ],
    // },
]
