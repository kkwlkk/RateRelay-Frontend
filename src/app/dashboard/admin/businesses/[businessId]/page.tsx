'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PermissionDenied } from "@/components/PermissionDenied";
import { useAuth } from "@/contexts/AuthContext";
import { UserPermission } from "@/enums/permissions";
import { apiService } from "@/services/api";
import { AdminBusinessDetailDto } from "@/types/dtos/AdminBusinesses";
import { hasPermission } from "@/utils/accountUtils";
import {
    Building2,
    Star,
    TrendingUp,
    TrendingDown,
    Mail,
    Calendar,
    Users,
    Clock,
    Shield,
    Activity,
    ExternalLink,
    Coins,
    ArrowLeft,
    History
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useModalStore } from "@/contexts/ModalStoreContext";
import { BusinessBoostModal } from "@/components/modals/BusinessBoostModal";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { cn } from "@/lib/utils";
import { showToast } from "@/lib/toast";

const AdminBusinessDetailPage = () => {
    const { user, isLoading } = useAuth();
    const { businessId } = useParams<{ businessId: string }>();
    const { openModal, closeModal } = useModalStore();

    const [business, setBusiness] = useState<AdminBusinessDetailDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const hasRequiredPermission = user && hasPermission(user.mappedPermissions, UserPermission.ViewAllBusinesses);
    const canManagePriority = user && hasPermission(user.mappedPermissions, UserPermission.ManageBusinessPriority);

    useEffect(() => {
        const fetchBusinessDetail = async () => {
            if (!hasRequiredPermission || !businessId) return;

            try {
                setLoading(true);
                const response = await apiService.getSpecificBusinessDetails(parseInt(businessId));
                if (response.success) {
                    setBusiness(response.data);
                } else {
                    setError('Nie udało się pobrać szczegółów firmy');
                }
            } catch (err) {
                setError('Wystąpił błąd podczas pobierania danych');
                console.error('Error fetching business detail:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinessDetail();
    }, [businessId, hasRequiredPermission]);

    const refreshData = async () => {
        if (!hasRequiredPermission || !businessId) return;

        try {
            const response = await apiService.getSpecificBusinessDetails(parseInt(businessId));
            if (response.success) {
                setBusiness(response.data);
            }
        } catch (err) {
            console.error('Error refreshing business detail:', err);
        }
    };

    const handleToggleBoost = async () => {
        if (!canManagePriority || !business) return;

        try {
            setActionLoading(true);
            if (business.isBoosted) {
                openModal(ConfirmationModal, {
                    title: 'Cofnięcie promowania firmy',
                    description: `Czy na pewno chcesz cofnąć promowanie firmy "${business.businessName}"?`,
                    cancelLabel: 'Anuluj',
                    confirmLabel: 'Cofnij promowanie',
                    onConfirm: async () => {
                        const response = await apiService.unboostSpecificBusiness(business.id, {
                            reason: "Administratorskie cofnięcie promowania"
                        });

                        if (response.success) {
                            showToast.success(`Promowanie firmy "${business.businessName}" zostało cofnięte`, 'business-boost-success');
                            refreshData();
                        } else {
                            showToast.error('Nie udało się cofnąć promowania firmy', 'business-boost-error');
                        }

                        closeModal();
                    }
                });
            } else {
                openModal(BusinessBoostModal, {
                    onSubmit: async (data) => {
                        const response = await apiService.boostSpecificBusiness(business.id, {
                            reason: data.reason,
                            targetReviews: data.targetReviews ? Math.max(data.targetReviews, 0) : undefined
                        });

                        if (response.success) {
                            showToast.success(`Firma "${business.businessName}" została promowana`, 'business-boost-success');
                            refreshData();
                            closeModal();
                        } else {
                            showToast.error('Nie udało się promować firmy', 'business-boost-error');
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error toggling boost:', error);
            openModal(ConfirmationModal, {
                title: 'Błąd operacji',
                description: 'Wystąpił błąd podczas próby zmiany statusu promowania firmy. Spróbuj ponownie później.',
                cancelLabel: 'Zamknij',
                confirmLabel: 'Spróbuj ponownie',
                onConfirm: () => { }
            });
        } finally {
            setActionLoading(false);
        }
    };

    const getActivityStatus = (business: AdminBusinessDetailDto) => {
        if (business.totalReviews === 0) return { status: 'inactive', label: 'Nieaktywna', color: 'bg-gray-500' };
        if (business.pendingReviews > 0) return { status: 'active', label: 'Aktywna', color: 'bg-green-500' };
        if (business.totalReviews < 5) return { status: 'low', label: 'Niska aktywność', color: 'bg-yellow-500' };
        return { status: 'stable', label: 'Stabilna', color: 'bg-blue-500' };
    };

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-zinc-900 dark:text-white">
                            Ładowanie danych...
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Pobieranie szczegółów firmy
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!hasRequiredPermission) {
        return (
            <PermissionDenied
                title="Brak uprawnień administratora"
                message="Ta strona jest dostępna tylko dla administratorów systemu."
            />
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !business) {
        return (
            <div className="space-y-6">
                <Link href="/dashboard/admin/businesses" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                    <ArrowLeft className="w-4 h-4" />
                    Powrót do listy firm
                </Link>
                <div className="text-center space-y-4 py-12">
                    <div className="text-red-500 text-lg font-medium">
                        {error || 'Nie znaleziono firmy'}
                    </div>
                </div>
            </div>
        );
    }

    const activity = getActivityStatus(business);

    return (
        <div className="space-y-8 max-w-none">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/admin/businesses" className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                        <ArrowLeft className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                    </Link>
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/10 dark:to-primary/5 shrink-0">
                        <Building2 className="w-7 h-7 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            {business.businessName}
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                                ID: #{business.id}
                            </Badge>
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {activity.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {business.mapUrl && (
                        <Button variant="outline" onClick={() => window.open(business.mapUrl, '_blank')} className="bg-zinc-800 dark:bg-zinc-700 text-white hover:bg-zinc-900 dark:hover:bg-zinc-600">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Zobacz w Google Maps
                        </Button>
                    )}

                    {canManagePriority && (
                        <Button
                            variant={business.isBoosted ? "outline" : "default"}
                            onClick={handleToggleBoost}
                            disabled={actionLoading}
                            className={cn(
                                "flex items-center gap-2",
                                business.isBoosted ? "border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950" : "bg-primary text-white hover:bg-primary/90",
                            )}
                        >
                            {actionLoading ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                            ) : business.isBoosted ? (
                                <TrendingDown className="w-4 h-4 mr-2" />
                            ) : (
                                <TrendingUp className="w-4 h-4 mr-2" />
                            )}
                            {business.isBoosted ? 'Cofnij promowanie' : 'Promuj firmę'}
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
                            <Users className="h-6 w-6 text-primary" />
                            Informacje o właścicielu
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Nazwa wyświetlana</label>
                                    <div className="mt-1 text-lg font-medium text-zinc-900 dark:text-white">
                                        {business.ownerDisplayName}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Adres email</label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-zinc-500" />
                                        <span className="text-zinc-900 dark:text-white">{business.ownerEmail}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">ID konta</label>
                                    <div className="mt-1">
                                        <Badge variant="outline" className="font-mono">
                                            #{business.ownerAccountId}
                                        </Badge>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Saldo punktów</label>
                                    <div className="mt-1 flex items-center gap-2">
                                        <Coins className="w-4 h-4 text-yellow-500" />
                                        <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                                            {business.ownerPointBalance}
                                        </span>
                                        {business.ownerPointBalance <= 0 && (
                                            <span className="text-sm text-red-500 dark:text-red-400">
                                                (Saldo poniżej 1 punktu)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
                            <Star className="h-6 w-6 text-primary" />
                            Statystyki recenzji
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div className="text-center space-y-2">
                                <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                                    {business.totalReviews}
                                </div>
                                <div className="text-sm text-zinc-500 dark:text-zinc-400">Łącznie</div>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {business.acceptedReviews}
                                </div>
                                <div className="text-sm text-zinc-500 dark:text-zinc-400">Zaakceptowane</div>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                                    {business.pendingReviews}
                                </div>
                                <div className="text-sm text-zinc-500 dark:text-zinc-400">Oczekujące</div>
                            </div>
                            <div className="text-center space-y-2">
                                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                                    {business.rejectedReviews}
                                </div>
                                <div className="text-sm text-zinc-500 dark:text-zinc-400">Odrzucone</div>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-lg font-semibold text-zinc-900 dark:text-white">
                                        Średnia ocena: {business.averageRating?.toFixed(1) || '0.0'}
                                    </span>
                                </div>
                                {business.lastReviewDate && (
                                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                        <Clock className="w-4 h-4" />
                                        Ostatnia: {new Date(business.lastReviewDate).toLocaleDateString('pl-PL')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
                            <Activity className="h-6 w-6 text-primary" />
                            Status i priorytet
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Priorytet</span>
                                <Badge
                                    variant={business.priority >= 80 ? 'destructive' : business.priority >= 60 ? 'default' : 'secondary'}
                                    className="font-mono font-semibold"
                                >
                                    {business.priority}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Weryfikacja</span>
                                <Badge variant={business.isVerified ? 'default' : 'secondary'} className="flex items-center gap-1">
                                    <Shield className="w-3 h-3" />
                                    {business.isVerified ? 'Zweryfikowana' : 'Niezweryfikowana'}
                                </Badge>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Promowanie</span>
                                <div className="flex flex-col items-end gap-1">
                                    <Badge variant={business.isBoosted ? 'destructive' : 'secondary'} className="flex items-center gap-1">
                                        {business.isBoosted ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                        {business.isBoosted ? 'Promowana' : 'Niepromowana'}
                                    </Badge>
                                    {business.isBoosted && business.boostTargetReviews && (
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                            Cel: {business.boostTargetReviews} recenzji
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Kolejka oceniania</span>
                                <Badge variant={business.isEligibleForQueue ? 'outline' : 'secondary'} className="flex items-center gap-1">
                                    {business.isEligibleForQueue ? 'Widoczne' : 'Niewidoczne'}
                                </Badge>
                            </div>

                            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                    <Calendar className="w-4 h-4" />
                                    Utworzona: {new Date(business.dateCreatedUtc).toLocaleDateString('pl-PL')}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
                            <Building2 className="h-6 w-6 text-primary" />
                            Szczegóły techniczne
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Place ID</label>
                                <div className="mt-1 font-mono text-xs bg-zinc-50 dark:bg-zinc-800 p-2 rounded border break-all">
                                    {business.placeId}
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">CID</label>
                                <div className="mt-1 font-mono text-xs bg-zinc-50 dark:bg-zinc-800 p-2 rounded border break-all">
                                    {business.cid}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {business.boostHistory && business.boostHistory.length > 0 && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3 mb-6">
                        <History className="h-6 w-6 text-primary" />
                        Historia promowania
                    </h2>
                    <div className="space-y-4">
                        {business.boostHistory.map((history, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {history.wasBoosted ? (
                                            <TrendingUp className="w-4 h-4 text-green-600" />
                                        ) : (
                                            <TrendingDown className="w-4 h-4 text-orange-600" />
                                        )}
                                        <span className="font-medium text-zinc-900 dark:text-white">
                                            {history.wasBoosted ? 'Promowanie' : 'Cofnięcie promowania'}
                                        </span>
                                    </div>
                                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                        {history.reason}
                                    </div>
                                    <div className="text-xs text-zinc-400 dark:text-zinc-500">
                                        {history.changedByDisplayName} • {new Date(history.changedAt).toLocaleString('pl-PL')}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-medium text-zinc-900 dark:text-white">
                                        {history.oldPriority} → {history.newPriority}
                                    </div>
                                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                                        Priorytet
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBusinessDetailPage;