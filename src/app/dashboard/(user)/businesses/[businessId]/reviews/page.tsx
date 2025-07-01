'use client';

import { BusinessNotFound } from '@/components/BusinessNotFound';
import { DataTable } from '@/components/DataTable/DataTable';
import { StatusBadge } from '@/components/ReviewStatusBadge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { createPaginatedQueryFn, usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { isError } from '@/lib/utils';
import { apiService } from '@/services/api';
import { BusinessReviewStatus } from '@/types/BusinessReviewStatus';
import { GetBusinessReviewsResponseDto } from '@/types/dtos/BusinessReviews';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { Check, ExternalLink, Star, X, Clock, Info, ArrowLeft, AlertTriangle, AlignLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useModalStore } from '@/contexts/ModalStoreContext';
import { ReportReviewModal } from '@/components/modals/ReportReviewModal';
import { PiEmptyFill } from 'react-icons/pi'

const LoadingSkeleton = () => (
    <div className="space-y-6">
        <div className="h-6 bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded w-20 animate-pulse mb-2"></div>
        <div className="flex items-center justify-between">
            <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-lg w-64 animate-pulse"></div>
                <div className="h-4 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded w-96 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gradient-to-r from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-lg w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-lg animate-pulse"></div>
            ))}
        </div>
        <div className="space-y-3">
            <div className="h-5 bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded w-80 animate-pulse"></div>
            <div className="h-96 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800 rounded-lg animate-pulse"></div>
        </div>
    </div>
);

type BusinessReviewStatusFilter = BusinessReviewStatus | 'ALL';

const StatusFilter = ({
    value,
    onChange
}: {
    value: BusinessReviewStatusFilter;
    onChange: (status: BusinessReviewStatusFilter) => void;
}) => (
    <Select
        value={value.toString()}
        onValueChange={(val) => onChange(val as unknown as BusinessReviewStatus)}
    >
        <SelectTrigger className="w-full !h-12 text-start bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 shadow-sm hover:shadow-md">
            <SelectValue placeholder="Wybierz status" />
        </SelectTrigger>
        <SelectContent className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm w-full min-w-32 sm:max-w-72">
            <SelectItem value={"ALL"} className="hover:bg-gray-50 dark:hover:bg-gray-800/25 py-1.5 px-3 min-h-8 flex items-start">
                <div className="flex items-center gap-3 w-full">
                    <AlignLeft className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight">Wszystkie</div>
                        <div className="text-xs text-zinc-500 leading-tight mt-0.5">Wszystkie recenzje</div>
                    </div>
                </div>
            </SelectItem>
            <SelectItem value={BusinessReviewStatus.Pending.toString()} className="hover:bg-amber-50 dark:hover:bg-amber-900/20 py-1.5 px-3 min-h-8 flex items-start">
                <div className="flex items-center gap-3 w-full">
                    <Clock className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight">Oczekujące</div>
                        <div className="text-xs text-zinc-500 leading-tight mt-0.5">Wymagają Twojej decyzji</div>
                    </div>
                </div>
            </SelectItem>
            <SelectItem value={BusinessReviewStatus.Accepted.toString()} className="hover:bg-emerald-50 dark:hover:bg-emerald-900/20 py-1.5 px-3 min-h-8 flex items-start">
                <div className="flex items-center gap-3 w-full">
                    <Check className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight">Zaakceptowane</div>
                        <div className="text-xs text-zinc-500 leading-tight mt-0.5">Już zatwierdzone</div>
                    </div>
                </div>
            </SelectItem>
            <SelectItem value={BusinessReviewStatus.Rejected.toString()} className="hover:bg-rose-50 dark:hover:bg-rose-900/20 py-1.5 px-3 min-h-8 flex items-start">
                <div className="flex items-center gap-3 w-full">
                    <X className="h-4 w-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight">Odrzucone</div>
                        <div className="text-xs text-zinc-500 leading-tight mt-0.5">Nieprzyjęte recenzje</div>
                    </div>
                </div>
            </SelectItem>
            <SelectItem value={BusinessReviewStatus.UnderDispute.toString()} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 py-1.5 px-3 min-h-8 flex items-start">
                <div className="flex items-center gap-3 w-full">
                    <AlertTriangle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm leading-tight">W sporze</div>
                        <div className="text-xs text-zinc-500 leading-tight mt-0.5 break-words">Recenzje w trakcie rozpatrywania przez administratora</div>
                    </div>
                </div>
            </SelectItem>
        </SelectContent>
    </Select>
);

// const StatsCard = ({
//     title,
//     value,
//     subtitle,
//     icon: Icon,
//     color = "zinc"
// }: {
//     title: string;
//     value: string | number;
//     subtitle?: string;
//     icon?: IconType;
//     color?: "zinc" | "amber" | "emerald" | "blue";
// }) => {
//     const colorClasses = {
//         zinc: "from-zinc-50 to-white dark:from-zinc-800 dark:to-zinc-900 border-zinc-200 dark:border-zinc-700",
//         amber: "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-200 dark:border-amber-800",
//         emerald: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-emerald-200 dark:border-emerald-800",
//         blue: "from-blue-50 to-sky-50 dark:from-blue-900/20 dark:to-sky-900/20 border-blue-200 dark:border-blue-800"
//     };

//     const iconColors = {
//         zinc: "text-zinc-600 dark:text-zinc-400",
//         amber: "text-amber-600 dark:text-amber-400",
//         emerald: "text-emerald-600 dark:text-emerald-400",
//         blue: "text-blue-600 dark:text-blue-400"
//     };

//     return (
//         <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-4 hover:shadow-md transition-all duration-200`}>
//             <div className="flex items-start justify-between">
//                 <div>
//                     <div className="text-2xl font-semibold text-zinc-900 dark:text-white">{value}</div>
//                     <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{title}</div>
//                     {subtitle && (
//                         <div className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{subtitle}</div>
//                     )}
//                 </div>
//                 {Icon && (
//                     <Icon className={`min-h-5 min-w-5 ${iconColors[color]}`} />
//                 )}
//             </div>
//         </div>
//     );
// };

const InfoBox = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800 dark:text-blue-200">
                {children}
            </div>
        </div>
    </div>
);

const baseColumns: ColumnDef<GetBusinessReviewsResponseDto>[] = [
    {
        id: 'id',
        accessorKey: 'id',
        header: 'ID',
        size: 80,
        minSize: 60,
        maxSize: 120,
        cell: ({ row }) => (
            <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400" title={`Unikalne ID recenzji: ${row.getValue('id')}`}>
                #{row.getValue('id')}
            </div>
        )
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: 'Status',
        meta: { noTruncate: true },
        cell: ({ row }) => <StatusBadge status={row.getValue('status')} />
    },
    {
        id: 'rating',
        accessorKey: 'rating',
        header: 'Ocena',
        enableSorting: false,
        size: 75,
        minSize: 75,
        maxSize: 75,
        cell: ({ row }) => {
            const rating = row.getValue('rating') as number;
            return (
                <div className="flex items-center gap-1" title={`Ocena: ${rating} z 5 gwiazdek`}>
                    <Star className="size-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-zinc-900 dark:text-white">{rating}</span>
                </div>
            );
        }
    },
    {
        id: 'comment',
        accessorKey: 'comment',
        header: 'Komentarz',
        size: 300,
        minSize: 120,
        enableResizing: true,
        enableSorting: false,
        cell: ({ row }) => {
            const comment = row.getValue('comment') as string;
            return (
                <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate" title={comment || "Brak komentarza"}>
                    {comment || (
                        <span className="italic text-zinc-400 dark:text-zinc-500">Brak komentarza</span>
                    )}
                </div>
            );
        }
    },
    {
        id: 'postedGoogleMapsReview',
        accessorKey: 'postedGoogleMapsReview',
        header: 'Google Maps',
        minSize: 180,
        enableSorting: false,
        meta: {
            noTruncate: true,
        },
        cell: ({ row }) => {
            const posted = row.getValue('postedGoogleMapsReview') as boolean;
            const url = row.original.googleMapsReviewUrl;

            if (posted && url) {
                return (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
                        onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                        title="Kliknij, aby zobaczyć recenzję na Google Maps"
                    >
                        <ExternalLink className="h-3 w-3 mr-1.5" />
                        Zobacz recenzję
                    </Button>
                );
            }

            return (
                <Badge
                    variant={posted ? "default" : "secondary"}
                    className={
                        posted
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }
                    title={posted ? "Recenzja została opublikowana na Google Maps" : "Recenzja nie została opublikowana na Google Maps"}
                >
                    {posted ? 'Opublikowano' : 'Nie opublikowano'}
                </Badge>
            );
        }
    },
    {
        id: 'dateCreatedUtc',
        accessorKey: 'dateCreatedUtc',
        header: 'Data dodania',
        size: 160,
        minSize: 160,
        maxSize: 180,
        cell: ({ row }) => {
            const date = row.getValue('dateCreatedUtc') as string;
            const formattedDate = dayjs(date).format('DD.MM.YYYY HH:mm');

            return (
                <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400" title={`Data dodania recenzji: ${formattedDate}`}>
                    {formattedDate}
                </div>
            );
        }
    }
];

const ReviewActions = ({
    reviewId,
    status,
    onAccept,
    onReport,
    loading = false
}: {
    reviewId: number;
    status: BusinessReviewStatus;
    onAccept: (id: number) => Promise<void>;
    onReport: (id: number) => void;
    loading?: boolean;
}) => (
    <div className="flex items-center gap-1">
        {status === BusinessReviewStatus.Pending && (
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:text-emerald-300 dark:hover:bg-emerald-900/20"
                onClick={() => onAccept(reviewId)}
                loading={loading}
                title="Zaakceptuj"
            >
                <Check className="h-4 w-4" />
            </Button>
        )}
        {(status === BusinessReviewStatus.Pending || status === BusinessReviewStatus.Accepted) && (
            <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                onClick={() => onReport(reviewId)}
                title="Zgłoś nieprawidłowość"
                loading={loading}
            >
                <AlertTriangle className="h-4 w-4" />
            </Button>
        )}
    </div>
);

const BusinessReviewsPage = () => {
    const params = useParams();
    const router = useRouter();
    const { openModal, closeModal } = useModalStore();
    const businessId = Number(params.businessId);
    const [reviewStatusFilter, setReviewStatusFilter] = useState<BusinessReviewStatusFilter>('ALL');

    const reviewsQuery = usePaginatedQuery<GetBusinessReviewsResponseDto[]>({
        queryKey: ['businessReviews', businessId, reviewStatusFilter],
        queryFn: createPaginatedQueryFn((params) =>
            apiService.getBusinessReviewsByBusinessId(businessId, reviewStatusFilter === 'ALL' ? undefined : reviewStatusFilter, params)
        ),
        initialPagination: {
            page: 1,
            pageSize: 20,
            sortBy: 'dateCreatedUtc',
            sortDirection: 'desc'
        },
    });

    const { data: reviews, isLoading, error, actions } = reviewsQuery;

    const handleAcceptReview = useCallback(async (reviewId: number) => {
        try {
            await apiService.acceptPendingBusinessReview(businessId, reviewId);
            toast.success("Recenzja została zaakceptowana");
            actions.invalidateAndRefetch();
        } catch (error: unknown) {
            if (isError(error)) {
                toast.error(error.message || "Nie udało się zaakceptować recenzji");
            } else {
                console.error("Unexpected error while accepting review:", error);
            }
        }
    }, [actions, businessId]);

    const handleReportReview = useCallback(async (reviewId: number) => {
        openModal(ReportReviewModal, {
            isLoading: false,
            onSubmit: async (data) => {
                const response = await apiService.reportBusinessReview(businessId, reviewId, data.reason, data.title, data.content);

                if (response.success) {
                    toast.success("Recenzja została zgłoszona do administratora");
                    closeModal();
                    actions.invalidateAndRefetch();
                    return;
                }

                if (response.error?.code == "BusinessReviewAlreadyUnderDispute") {
                    toast.error("Recenzja jest już w trakcie rozpatrywania przez administratora");
                    actions.invalidateAndRefetch();
                    closeModal();
                    return;
                }

                toast.error("Wystąpił błąd podczas zgłaszania recenzji");
                closeModal();
            }
        })
    }, [actions, businessId, closeModal, openModal]);

    const handleStatusFilterChange = (status: BusinessReviewStatusFilter) => {
        setReviewStatusFilter(status);
        actions.invalidateAndRefetch();
    };

    const handleGoBack = () => {
        router.back();
    };

    const actionsColumn: ColumnDef<GetBusinessReviewsResponseDto> = useMemo(() => ({
        id: 'actions',
        header: 'Akcje',
        size: 90,
        minSize: 90,
        maxSize: 90,
        enableSorting: false,
        cell: ({ row }) => {
            const reviewId = row.getValue('id') as number;
            const status = row.getValue('status') as BusinessReviewStatus;
            return (
                <ReviewActions
                    reviewId={reviewId}
                    status={status}
                    onAccept={handleAcceptReview}
                    onReport={handleReportReview}
                    loading={isLoading}
                />
            );
        }
    }), [handleAcceptReview, handleReportReview, isLoading]);

    const columns = useMemo(() => {
        const statusStr = String(reviewStatusFilter);

        if (
            statusStr === String(BusinessReviewStatus.Pending) ||
            statusStr === String(BusinessReviewStatus.Accepted) ||
            statusStr === "ALL"
        ) {
            return [...baseColumns, actionsColumn];
        }

        return baseColumns;
    }, [reviewStatusFilter, actionsColumn]);

    const getStatusTitle = (status: BusinessReviewStatusFilter) => {
        switch (status) {
            case BusinessReviewStatus.Pending:
                return "Recenzje oczekujące";
            case BusinessReviewStatus.Accepted:
                return "Zaakceptowane recenzje";
            case BusinessReviewStatus.Rejected:
                return "Odrzucone recenzje";
            case BusinessReviewStatus.UnderDispute:
                return "Recenzje w sporze";
            case 'ALL':
                return "Wszystkie recenzje";
            default:
                return "Recenzje";
        }
    };

    const getStatusDescription = (status: BusinessReviewStatusFilter) => {
        switch (status) {
            case BusinessReviewStatus.Pending:
                return "Recenzje wymagające Twojej decyzji o zaakceptowaniu lub odrzuceniu";
            case BusinessReviewStatus.Accepted:
                return "Recenzje, które zostały zatwierdzone i są widoczne publicznie";
            case BusinessReviewStatus.Rejected:
                return "Recenzje, które zostały odrzucone i nie są wyświetlane";
            case BusinessReviewStatus.UnderDispute:
                return "Recenzje, które są w trakcie rozpatrywania lub sporu";
            case "ALL":
                return "Wszystkie recenzje, które zostały przesłane dla Twojej firmy";
            default:
                return "Zarządzaj recenzjami swojej firmy";
        }
    };

    const getInfoBoxContent = (status: BusinessReviewStatusFilter) => {
        const statusStr = String(status);

        if (statusStr === String(BusinessReviewStatus.Pending)) {
            return (
                <>
                    <strong>Oczekujące recenzje:</strong> Te recenzje zostały przesłane przez oceniajacych i czekają na Twoją decyzję.
                    Możesz je zaakceptować (co sprawi, że będą widoczne publicznie) lub odrzucić.
                    Kliknij na przyciski akcji po prawej stronie, aby podjąć decyzję.
                </>
            );
        }

        if (statusStr === String(BusinessReviewStatus.Accepted)) {
            return (
                <>
                    <strong>Zaakceptowane recenzje:</strong> Te recenzje zostały zatwierdzone i są widoczne publicznie.
                    Recenzje te mają wpływ na reputację Twojej firmy.
                </>
            );
        }

        if (statusStr === String(BusinessReviewStatus.Rejected)) {
            return (
                <>
                    <strong>Odrzucone recenzje:</strong> Te recenzje zostały odrzucone przez administratora i nie są wyświetlane publicznie.
                    Możesz je przeglądać w celach analitycznych, ale nie mają wpływu na ocenę Twojej firmy.
                </>
            );
        }

        if (statusStr === String(BusinessReviewStatus.UnderDispute)) {
            return (
                <>
                    <strong>Recenzje w sporze:</strong> Te recenzje są w trakcie rozpatrywania lub sporu.
                    Możesz je przeglądać, dopóki spór nie zostanie rozwiązany przez administratora.
                </>
            );
        }

        if (statusStr === "ALL") {
            return (
                <>
                    <strong>Wszystkie recenzje:</strong> Przeglądaj wszystkie recenzje swojej firmy w jednym miejscu.
                </>
            );
        }

        return "Przeglądaj i zarządzaj recenzjami swojej firmy w jednym miejscu.";
    };

    if (isLoading) return <LoadingSkeleton />;
    if (error || !reviews) return <BusinessNotFound businessId={businessId} />;

    return (
        <div className="space-y-6">
            <button
                onClick={handleGoBack}
                className="cursor-pointer inline-flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors mb-5"
            >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Powrót
            </button>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                        {getStatusTitle(reviewStatusFilter)}
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-2xl">
                        {getStatusDescription(reviewStatusFilter)}
                    </p>
                </div>
                <div className="w-full sm:w-64">
                    <StatusFilter
                        value={reviewStatusFilter}
                        onChange={handleStatusFilterChange}
                    />
                </div>
            </div>

            <InfoBox>
                {getInfoBoxContent(reviewStatusFilter)}
            </InfoBox>

            {/* <div className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4",
                {
                    "hidden": reviewStatusFilter === BusinessReviewStatus.UnderDispute
                }
            )}>
                <StatsCard
                    title="Łączna liczba"
                    value={totalReviews}
                    subtitle="wszystkich wyświetlanych recenzji"
                    icon={MessageSquare}
                    color="zinc"
                />
                <StatsCard
                    title="Średnia ocena"
                    value={avgRating}
                    subtitle="wszystkich wyświetlanych recenzji"
                    icon={Star}
                    color="amber"
                />
                <StatsCard
                    title="Google Maps"
                    value={googleMapsReviews}
                    subtitle="opublikowanych recenzji"
                    icon={ExternalLink}
                    color="emerald"
                />
            </div> */}

            <div className="space-y-3">
                <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
                    Lista recenzji
                </h2>

                <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <DataTable
                        displayToolbar={false}
                        key={`table-${reviewStatusFilter}-${JSON.stringify(columns.map(c => c.id))}`}
                        query={reviewsQuery}
                        columns={columns}
                        data={reviews}
                        showSearch={false}
                        emptyIcon={<PiEmptyFill className="size-12 text-zinc-400 mx-auto" />}
                        emptyMessage='Brak recenzji do wyświetlenia'
                        emptyDescription='Nie znaleziono żadnych recenzji dla tej firmy.'
                    />
                </div>
            </div>
        </div >
    );
};

export default BusinessReviewsPage;