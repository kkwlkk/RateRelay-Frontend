'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { apiService } from "@/services/api";
import {
    Building2,
    ArrowLeft,
    MessageSquare,
    CheckCircle,
    AlertTriangle,
    Star,
    Clock,
    X,
    Check,
    BarChart3,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import dayjs from 'dayjs';
import { GetBusinessReviewsResponseDto } from '@/types/dtos/BusinessReviews';
import { BusinessReviewStatus } from '@/types/BusinessReviewStatus';
import { BusinessNotFound } from '@/components/BusinessNotFound';
import { IconType } from '@/types/IconType';

const LoadingSkeleton = () => (
    <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-xl animate-pulse"></div>
            <div className="space-y-2 flex-1">
                <div className="h-8 bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-lg w-64 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded w-48 animate-pulse"></div>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-lg animate-pulse"></div>
            ))}
        </div>
        <div className="h-96 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-lg animate-pulse"></div>
    </div>
);

const StarRating = ({ rating, showText = true }: { rating: number; showText?: boolean }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 flex-shrink-0 ${i < rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-zinc-300 dark:text-zinc-600'
                            }`}
                    />
                ))}
            </div>
            {showText && (
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {rating}/5
                </span>
            )}
        </div>
    );
};

const StatsCard = ({
    title,
    value,
    subtitle,
    icon: Icon
}: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: IconType;
}) => {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
                <div>
                    <div className="text-2xl font-semibold text-zinc-900 dark:text-white">{value}</div>
                    <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</div>
                    {subtitle && (
                        <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{subtitle}</div>
                    )}
                </div>
                {Icon && (
                    <Icon className="min-h-5 min-w-5 text-zinc-600 dark:text-zinc-400" />
                )}
            </div>
        </div>
    );
};

const InfoBox = ({
    children,
    variant = "info"
}: {
    children: React.ReactNode;
    variant?: "info" | "warning";
}) => {
    const variantClasses = {
        info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
        warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200"
    };

    const IconComponent = variant === "warning" ? AlertTriangle : MessageSquare;
    const iconColor = variant === "warning" ? "text-amber-600 dark:text-amber-400" : "text-blue-600 dark:text-blue-400";

    return (
        <div className={`border rounded-lg p-4 mb-6 ${variantClasses[variant]}`}>
            <div className="flex items-start gap-3">
                <IconComponent className={`h-5 w-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
                <div className="text-sm">
                    {children}
                </div>
            </div>
        </div>
    );
};

const VerificationAlert = () => (
    <InfoBox variant="warning">
        <div className="flex-1 min-w-0">
            <div className="font-semibold mb-2">
                Firma wymaga weryfikacji
            </div>
            <p className="mb-3">
                Aby w pełni korzystać z funkcji platformy, zweryfikuj swoją firmę.
                Po weryfikacji będziesz mógł zarządzać recenzjami i uzyskać dostęp do zaawansowanych funkcji.
            </p>
            <Button
                size="sm"
                className="bg-amber-600 hover:bg-amber-700 text-white"
            >
                Rozpocznij weryfikację
            </Button>
        </div>
    </InfoBox>
);

const ReviewCard = ({ review }: { review: GetBusinessReviewsResponseDto }) => {
    const getStatusBadge = (status: BusinessReviewStatus) => {
        switch (status) {
            case BusinessReviewStatus.Pending:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
                        <Clock className="h-3 w-3" />
                        Oczekuje
                    </span>
                );
            case BusinessReviewStatus.Accepted:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
                        <Check className="h-3 w-3" />
                        Zaakceptowane
                    </span>
                );
            case BusinessReviewStatus.Rejected:
                return (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                        <X className="h-3 w-3" />
                        Odrzucone
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3 gap-3">
                <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
                    <StarRating rating={review.rating} />
                    {review.postedGoogleMapsReview && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                            Google Maps
                        </span>
                    )}
                    {getStatusBadge(review.status)}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs text-zinc-500 whitespace-nowrap font-mono">
                        {dayjs(review.dateCreatedUtc).format('DD.MM.YYYY HH:mm')}
                    </span>
                </div>
            </div>

            {review.comment && (
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {review.comment}
                </p>
            )}
            {!review.comment && (
                <p className="text-sm text-zinc-400 dark:text-zinc-500 italic">
                    Brak komentarza
                </p>
            )}
        </div>
    );
};

const QuickActions = ({ businessId, isVerified }: { businessId: number; isVerified: boolean }) => {
    const router = useRouter();

    const actions = [
        {
            label: "Zarządzaj recenzjami",
            description: "Przeglądaj i moderuj recenzje",
            icon: MessageSquare,
            onClick: () => router.push(`/dashboard/businesses/${businessId}/reviews`),
            enabled: isVerified
        },
        {
            label: "Statystyki i analityka",
            description: "Zobacz szczegółowe raporty",
            icon: BarChart3,
            onClick: () => router.push(`/dashboard/businesses/${businessId}/analytics`),
            enabled: false
        },
        {
            label: "Ustawienia firmy",
            description: "Edytuj dane i preferencje",
            icon: Building2,
            onClick: () => router.push(`/dashboard/businesses/${businessId}/settings`),
            enabled: true
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {actions.map((action, index) => (
                <button
                    key={index}
                    className={`bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/75 rounded-lg p-5 text-left transition-all duration-200 shadow-sm ${action.enabled
                        ? 'hover:shadow-md hover:border-zinc-400 dark:hover:border-zinc-500 cursor-pointer'
                        : 'opacity-50 cursor-not-allowed'
                        }`}
                    onClick={action.enabled ? action.onClick : undefined}
                    disabled={!action.enabled}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                            <action.icon className="h-4 w-4 text-zinc-700 dark:text-zinc-300" />
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {action.label}
                        </span>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {action.description}
                    </p>
                </button>
            ))}
        </div>
    );
};

export default function BusinessManagementPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = Number(params.businessId);

    const { data: business, isLoading, error } = useQuery({
        queryKey: ['business', businessId],
        queryFn: () => apiService.getBusinessById(businessId),
        enabled: !!businessId
    });

    const { data: recentReviews } = useQuery({
        queryKey: ['lastTenPendingBusinessReviews', businessId],
        queryFn: () => apiService.getBusinessReviewsByBusinessId(
            businessId,
            BusinessReviewStatus.Pending,
            { page: 1, pageSize: 10, sortBy: 'dateCreatedUtc', sortDirection: 'desc' }
        ),
        enabled: !!businessId && business?.data?.isVerified
    });

    if (isLoading) return <LoadingSkeleton />;
    if (error || !business?.data) return <BusinessNotFound businessId={businessId} />;

    const { data: businessData } = business;
    const { isVerified, isEligibleForQueue } = businessData;

    const handleGoBack = () => {
        router.push('/dashboard/businesses');
    };

    const statsConfig = [
        {
            title: "Łączna liczba",
            value: isVerified ? businessData.reviews.totalCount : '—',
            subtitle: isVerified ? "wszystkich recenzji" : "niedostępne",
            icon: MessageSquare
        },
        {
            title: "Oczekujące",
            value: isVerified ? businessData.reviews.pendingCount : '—',
            subtitle: isVerified ? "do rozpatrzenia" : "niedostępne",
            icon: Clock
        },
        {
            title: "Zaakceptowane",
            value: isVerified ? businessData.reviews.acceptedCount : '—',
            subtitle: isVerified ? "opublikowane" : "niedostępne",
            icon: CheckCircle
        },
        {
            title: "Odrzucone",
            value: isVerified ? businessData.reviews.rejectedCount : '—',
            subtitle: isVerified ? "nieprzyjęte" : "niedostępne",
            icon: X
        },
        {
            title: "Średnia ocena",
            value: isVerified ? `${businessData.averageRating.toFixed(1)}/5` : '—',
            subtitle: isVerified ? "ogólna ocena" : "niedostępne",
            icon: Star
        }
    ];

    return (
        <div className="space-y-6">
            <button
                onClick={handleGoBack}
                className="cursor-pointer inline-flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors mb-5"
            >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Powrót do listy firm
            </button>

            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 flex-shrink-0">
                    <Building2 className="size-6 text-white dark:text-zinc-900" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight truncate">
                            {businessData.businessName}
                        </h1>
                        {isVerified ? (
                            <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                        ) : (
                            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                            {isVerified ? 'Firma zweryfikowana' : 'Oczekuje weryfikacji'} • ID: {businessId}
                        </p>
                        {isVerified && !isEligibleForQueue && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                                <AlertCircle className="h-3 w-3" />
                                Nieaktywna
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {!isVerified && <VerificationAlert />}

            {isVerified && (
                <InfoBox>
                    <strong>Panel zarządzania firmą:</strong> Tutaj możesz przeglądać statystyki swojej firmy,
                    zarządzać recenzjami i konfigurować ustawienia. Najnowsze oczekujące recenzje wymagają Twojej uwagi.
                </InfoBox>
            )}

            {isVerified && !isEligibleForQueue && (
                <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="flex flex-col gap-3">
                                <div>
                                    <h3 className="font-semibold text-orange-900 dark:text-orange-100 text-sm mb-1">
                                        Firma niedostępna do oceniania
                                    </h3>
                                    <div className="text-sm text-orange-800 dark:text-orange-200">
                                        <span>Twoja firma jest nieaktywna.</span>
                                        <span className="ml-1">
                                            Potrzebujesz co najmniej <strong>2 punkty</strong> aby użytkownicy mogli wystawiać opinie.
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    size="sm"
                                    className="bg-orange-600 hover:bg-orange-700 text-white flex-shrink-0 sm:max-w-fit"
                                    onClick={() => router.push(`/dashboard/exchange-feedback`)}
                                >
                                    Oceń inne firmy
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {statsConfig.map((stat, index) => (
                    <StatsCard key={index} {...stat} />
                ))}
            </div>

            <QuickActions businessId={businessId} isVerified={isVerified} />

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                Najnowsze recenzje
                            </h2>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                {isVerified
                                    ? "Ostatnie recenzje oczekujące na rozpatrzenie przez Ciebie."
                                    : "Recenzje będą dostępne po weryfikacji firmy."
                                }
                            </p>
                        </div>
                        {isVerified && (
                            <Button
                                variant="outline"
                                onClick={() => router.push(`/dashboard/businesses/${businessId}/reviews`)}
                                className="text-sm font-medium flex-shrink-0"
                            >
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Zobacz wszystkie recenzje
                            </Button>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    {isVerified ? (
                        recentReviews?.data && recentReviews.data.length > 0 ? (
                            <div className="space-y-4">
                                {recentReviews.data.map((review) => (
                                    <ReviewCard key={review.id} review={review} />
                                ))}
                                {recentReviews.data.length === 10 && (
                                    <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                        <Button
                                            variant="ghost"
                                            onClick={() => router.push(`/dashboard/businesses/${businessId}/reviews`)}
                                            className="w-full text-sm"
                                        >
                                            <TrendingUp className="h-4 w-4 mr-2" />
                                            Zobacz więcej recenzji
                                        </Button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <MessageSquare className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto mb-3" />
                                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                                    Brak oczekujących recenzji
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    Wszystkie recenzje zostały rozpatrzone lub Twoja firma nie ma jeszcze żadnych recenzji.
                                </p>
                            </div>
                        )
                    ) : (
                        <div className="text-center py-8">
                            <AlertTriangle className="w-12 h-12 text-amber-400 dark:text-amber-600 mx-auto mb-3" />
                            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
                                Recenzje niedostępne
                            </h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                                Zweryfikuj swoją firmę, aby uzyskać dostęp do zarządzania recenzjami.
                            </p>
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                                Rozpocznij weryfikację
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}