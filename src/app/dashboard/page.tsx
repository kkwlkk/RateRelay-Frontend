'use client';

import React from 'react';
import { Building2, MessageSquare, Clock, Award, Users, Target, ArrowUpRight, AlertTriangle, Bell, Lightbulb } from 'lucide-react';
import { IconType } from '@/types/IconType';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';

const StatCard = ({ title, value, subtitle, icon: Icon, color = "blue" }: {
    title: string;
    value: number;
    subtitle?: string;
    icon: IconType;
    color: string;
}) => (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-1">{value}</p>
                {subtitle && <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{subtitle}</p>}
            </div>
            <div className={`p-2 rounded-lg bg-${color}-100 dark:bg-${color}-900/20`}>
                <Icon className={`h-5 w-5 text-${color}-600 dark:text-${color}-400`} />
            </div>
        </div>
    </div>
);

const QuickActionCard = ({ action }: { action: { title: string; description: string; icon: IconType; href: string } }) => (
    <a
        href={action.href}
        className="group bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 block"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                <action.icon className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div className="flex-1">
                <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{action.title}</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">{action.description}</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
        </div>
    </a>
);

// const NotificationItem = ({ notification }: { notification: { type: string; message: string; time: string } }) => {
//     const getIcon = (type: string) => {
//         switch (type) {
//             case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
//             case 'warning': return <AlertTriangle className="h-4 w-4 text-orange-500" />;
//             default: return <Info className="h-4 w-4 text-blue-500" />;
//         }
//     };

//     return (
//         <div className="flex items-start gap-3 p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-lg transition-colors">
//             <div className="flex-shrink-0 mt-0.5">
//                 {getIcon(notification.type)}
//             </div>
//             <div className="flex-1 min-w-0">
//                 <p className="text-sm text-zinc-900 dark:text-zinc-100">{notification.message}</p>
//                 <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{notification.time}</p>
//             </div>
//         </div>
//     );
// };

const quickActions = [
    { title: 'Oceń firmę', description: 'Podziel się doświadczeniem', icon: MessageSquare, href: '/dashboard/exchange-feedback' },
    { title: 'Zarządzaj firmami', description: 'Sprawdź swoje firmy', icon: Building2, href: '/dashboard/businesses' },
    { title: 'Historia ocen', description: 'Zobacz wszystkie oceny', icon: Clock, href: '/dashboard/exchange-feedback/history' },
    { title: 'Wsparcie', description: 'Utwórz zgłoszenie', icon: Users, href: '/dashboard/tickets' }
];

const tips = [
    'Regularne odpowiadanie na recenzje zwiększa zaufanie klientów',
    'Aktywne ocenianie innych firm pomoże Ci zdobyć więcej punktów',
];

const DashboardMainPage = () => {
    const { user, isAuthenticated } = useAuth();

    const { data: userStats } = useQuery({
        queryKey: ['userStats'],
        queryFn: () => apiService.getAccountStats(),
        staleTime: 1000 * 60 * 5,
        enabled: isAuthenticated
    })

    const stats = {
        totalBusinesses: userStats?.data.totalBusinesses || 0,
        pendingReviews: userStats?.data.totalAwaitingBusinessReviews || 0,
        pointBalance: user?.pointBalance || 0,
        completedReviews: userStats?.data.totalCompletedBusinessReviews || 0
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                    Witaj ponownie {user?.username}! 👋
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400">
                    Oto przegląd Twojej aktywności na TrustRate
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Twoje firmy"
                    value={stats.totalBusinesses}
                    subtitle="zweryfikowane"
                    icon={Building2}
                    color="blue"
                />
                <StatCard
                    title="Oczekujące recenzje"
                    value={stats.pendingReviews}
                    subtitle="do rozpatrzenia"
                    icon={AlertTriangle}
                    color="orange"
                />
                <StatCard
                    title="Saldo punktów"
                    value={stats.pointBalance}
                    subtitle="dostępne"
                    icon={Award}
                    color="purple"
                />
                <StatCard
                    title="Ukończone oceny"
                    value={stats.completedReviews}
                    subtitle="łącznie"
                    icon={Target}
                    color="green"
                />
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Oceń więcej firm</h3>
                        <p className="text-blue-100 mb-4 text-sm">
                            Pomóż innym przedsiębiorcom i zdobądź punkty za swoje doświadczenia
                        </p>
                        <a
                            href="/dashboard/exchange-feedback"
                            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Rozpocznij ocenianie
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                    <MessageSquare className="h-8 w-8 text-white/80" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Szybkie akcje
                        </h2>
                    </div>
                    <div className="p-4 space-y-3">
                        {quickActions.map((action, index) => (
                            <QuickActionCard key={index} action={action} />
                        ))}
                    </div>
                </div>

                {/* complete notifs */}
                {/* <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                                Powiadomienia
                            </h2>
                        </div>
                    </div>
                    <div className="p-3">
                        {notifications.map((notification, index) => (
                            <NotificationItem key={index} notification={notification} />
                        ))}
                    </div>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                        <a
                            href="/dashboard/notifications"
                            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                        >
                            Zobacz wszystkie →
                        </a>
                    </div>
                </div> */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden flex flex-col">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)" }}></div>
                    </div>

                    <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-zinc-400 dark:text-zinc-600" />
                            <h2 className="text-lg font-semibold text-zinc-500 dark:text-zinc-500">
                                Powiadomienia
                            </h2>
                            <span className="ml-auto text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                Wkrótce
                            </span>
                        </div>
                    </div>
                    <div className="p-8 flex flex-col text-center h-full justify-center">
                        <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800/50 rounded-full flex items-center justify-center mb-4 animate-pulse">
                            <Bell className="h-8 w-8 text-zinc-400 dark:text-zinc-600" />
                        </div>

                        <h3 className="text-zinc-700 dark:text-zinc-300 font-medium mb-2">
                            Funkcja w przygotowaniu
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-500">
                            System powiadomień będzie dostępny wkrótce
                        </p>
                    </div>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20">
                        <button
                            disabled
                            className="text-sm text-zinc-400 dark:text-zinc-600 font-medium cursor-not-allowed w-full"
                        >
                            Funkcja niedostępna
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Calendar className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Dzisiejsze cele</h3>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">Oceń 1 firmę</span>
                            <span className="text-xs text-green-600 dark:text-green-400 font-medium">Gotowe ✓</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">Sprawdź recenzje</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-500">0/3</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">Aktualizuj profil</span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-500">Pending</span>
                        </div>
                    </div>
                </div> */}

                <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Porady</h3>
                    </div>
                    <div className="space-y-3">
                        {tips.map((tip, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0" />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{tip}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardMainPage;