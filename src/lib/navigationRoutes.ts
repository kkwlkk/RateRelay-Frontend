import { Building, Handshake, History, HomeIcon, MessagesSquare } from 'lucide-react';
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

export const segmentRouteLabelMap: Record<string, string> = {
    'reviews': 'Opinie',
    'settings': 'Ustawienia',
    'analytics': 'Analityka',
    'profile': 'Profil',
    'edit': 'Edytuj',
    'create': 'Utwórz',
    'history': 'Historia',
};

export const dashboardRoutes: NavigationRoute[] = [
    // ------------------------------------------------------------ //
    //                         USER ROUTES
    // ------------------------------------------------------------ //
    {
        path: '/dashboard',
        label: 'Przegląd',
        icon: HomeIcon,
        section: 'Centrum',
    },
    {
        path: '/dashboard/referrals',
        label: 'Program poleceń',
        icon: Handshake,
        section: 'Centrum',
    },
    {
        path: '/dashboard/exchange-feedback',
        label: 'Wymiana doświadczeń',
        icon: MessagesSquare,
        section: 'Aktywność',
        subRoutes: [
            {
                path: '/dashboard/exchange-feedback/history',
                label: 'Historia wymian',
                icon: History
            }
        ],
    },
    {
        path: '/dashboard/businesses',
        label: 'Zarządzanie firmą',
        icon: Building,
        section: 'Twoja firma',
    },
    {
        path: '/dashboard/tickets',
        label: 'Moje zgłoszenia',
        icon: Building,
        section: 'Wsparcie',
    },

    // ------------------------------------------------------------ //
    //                       ADMIN ROUTES
    // ------------------------------------------------------------ //

    {
        path: '/dashboard/admin/tickets',
        section: 'Admin',
        label: 'Zgłoszenia',
        icon: Building,
        requiredPermission: UserPermission.ViewAllTickets
    }
]
