'use client';

import { DataTable } from "@/components/DataTable/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PermissionDenied } from "@/components/PermissionDenied";
import { useAuth } from "@/contexts/AuthContext";
import { UserPermission } from "@/enums/permissions";
import { createPaginatedQueryFn, usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { apiService } from "@/services/api";
import { AdminBusinessListDto, AdminBusinessFilterDto } from "@/types/dtos/AdminBusinesses";
import { hasPermission } from "@/utils/accountUtils";
import { ColumnDef } from "@tanstack/react-table";
import { Building2, Star, Eye, TrendingUp, TrendingDown, MoreHorizontal, Mail, Calendar, Clock, Shield, Award, UserStar, Plus, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { useModalStore } from "@/contexts/ModalStoreContext";
import { BusinessBoostModal } from "@/components/modals/BusinessBoostModal";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { CreateBusinessModal } from "@/components/modals/CreateBusinessModal";
import { AdminBusinessFilters } from "./components/AdminBusinessFilters";
import { showToast } from "@/lib/toast";

const AdminBusinessesManagementPage = () => {
    const { user, isLoading } = useAuth();
    const [loadingActions, setLoadingActions] = useState<Record<number, boolean>>({});
    const [filters, setFilters] = useState<Partial<AdminBusinessFilterDto>>({});
    const { openModal, closeModal } = useModalStore();

    const hasRequiredPermission = user && hasPermission(user.mappedPermissions, UserPermission.ViewAllBusinesses);
    const canManagePriority = user && hasPermission(user.mappedPermissions, UserPermission.ManageBusinessPriority);
    const canCreateBusiness = user && hasPermission(user.mappedPermissions, UserPermission.CreateBusiness);
    const canDeleteBusiness = user && hasPermission(user.mappedPermissions, UserPermission.DeleteBusiness);
    const canViewAllUsers = user && hasPermission(user.mappedPermissions, UserPermission.ViewAllUsers);

    const query = usePaginatedQuery({
        queryKey: ['adminBusinesses', filters],
        queryFn: createPaginatedQueryFn((params) =>
            apiService.getBusinessesForAdmin({
                ...params,
                filters
            })
        ),
        initialPagination: {
            page: 1,
            pageSize: 20,
            sortBy: 'id',
            sortDirection: 'desc'
        },
        enabled: !!hasRequiredPermission
    });

    const refreshData = () => {
        query.refetch();
    };

    const handleFiltersChange = (newFilters: Partial<AdminBusinessFilterDto>) => {
        setFilters(newFilters);
    };

    const handleCreateBusiness = () => {
        openModal(CreateBusinessModal, {
            onSubmit: async (data) => {
                try {
                    const response = await apiService.createBusiness({
                        placeId: data.businessData.placeId,
                        ownerId: data.ownerAccountId,
                        isVerified: data.isVerified
                    });

                    if (response.success) {
                        showToast.success(`Firma "${data.businessData.name}" została dodana`, 'business-create-success');
                        refreshData();
                        closeModal();
                    } else if (response.error?.code === "BusinessAlreadyExists") {
                        showToast.error(`Firma "${data.businessData.name}" już istnieje`, 'business-create-error');
                    } else {
                        showToast.error('Nie udało się dodać firmy', 'business-create-error');
                    }
                } catch (error) {
                    console.error('Error creating business:', error);
                    showToast.error('Wystąpił błąd podczas dodawania firmy', 'business-create-error');
                }
            }
        });
    };

    const handleDeleteBusiness = async (business: AdminBusinessListDto) => {
        if (!canDeleteBusiness) return;

        openModal(ConfirmationModal, {
            title: 'Usunięcie firmy',
            description: `Czy na pewno chcesz usunąć firmę "${business.businessName}"? Ta operacja jest nieodwracalna i spowoduje usunięcie wszystkich powiązanych danych.`,
            cancelLabel: 'Anuluj',
            confirmLabel: 'Usuń firmę',
            variant: 'destructive',
            onConfirm: async () => {
                try {
                    setLoadingActions(prev => ({ ...prev, [business.id]: true }));

                    const response = await apiService.deleteBusiness(business.id);

                    if (response.success) {
                        showToast.success(`Firma "${business.businessName}" została usunięta`, 'business-delete-success');
                        refreshData();
                    } else {
                        showToast.error('Nie udało się usunąć firmy', 'business-delete-error');
                    }
                } catch (error) {
                    console.error('Error deleting business:', error);
                    showToast.error('Wystąpił błąd podczas usuwania firmy', 'business-delete-error');
                } finally {
                    setLoadingActions(prev => ({ ...prev, [business.id]: false }));
                }

                closeModal();
            }
        });
    };

    const handleToggleBoost = async (business: AdminBusinessListDto) => {
        if (!canManagePriority) return;

        try {
            setLoadingActions(prev => ({ ...prev, [business.id]: true }));
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
            setLoadingActions(prev => ({ ...prev, [business.id]: false }));
        }
    };

    const getActivityStatus = (business: AdminBusinessListDto) => {
        const totalReviews = business.currentReviews + business.pendingReviews;
        if (totalReviews === 0) return { status: 'inactive', label: 'Nieaktywna', color: 'bg-gray-500' };
        if (business.pendingReviews > 0) return { status: 'active', label: 'Aktywna', color: 'bg-green-500' };
        if (totalReviews < 5) return { status: 'low', label: 'Niska aktywność', color: 'bg-yellow-500' };
        return { status: 'stable', label: 'Stabilna', color: 'bg-blue-500' };
    };

    const columns: ColumnDef<AdminBusinessListDto, unknown>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 70,
            cell: ({ getValue }) => (
                <Badge variant="outline" className="font-mono text-xs">
                    #{getValue() as number}
                </Badge>
            )
        },
        {
            accessorKey: 'businessName',
            header: 'Firma',
            size: 220,
            cell: ({ row }) => {
                const business = row.original;
                const activity = getActivityStatus(business);
                return (
                    <div className="space-y-2">
                        <div className="font-semibold text-zinc-900 dark:text-white leading-tight">
                            {business.businessName}
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${activity.color}`} />
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {activity.label}
                            </span>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'ownerDisplayName',
            header: 'Właściciel',
            size: 200,
            enableResizing: true,
            enableSorting: false,
            cell: ({ row }) => {
                const business = row.original;
                return (
                    <div className="space-y-1">
                        <div className="font-medium text-zinc-900 dark:text-white">
                            {business.ownerDisplayName}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                            <Mail className="w-3 h-3 flex-shrink-0" />
                            {business.ownerEmail}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'currentReviews',
            header: 'Recenzje',
            size: 120,
            enableSorting: false,
            cell: ({ row }) => {
                const current = row.original.currentReviews;
                const pending = row.original.pendingReviews;
                const total = current + pending;

                return (
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <UserStar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold text-zinc-900 dark:text-white">
                                {current}
                            </span>
                        </div>
                        {pending > 0 && (
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-orange-500" />
                                <span className="text-xs text-orange-600 dark:text-orange-400">
                                    {pending} oczekujące
                                </span>
                            </div>
                        )}
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            Łącznie: {total}
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'averageRating',
            header: 'Średnia ocena',
            minSize: 40,
            cell: ({ getValue }) => {
                const rating = getValue() as number;
                return (
                    <div className="space-y-1">
                        <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-semibold text-zinc-900 dark:text-white">
                                {rating?.toFixed(1) || '0.0'}
                            </span>
                        </div>
                    </div>
                );
            }
        },
        {
            accessorKey: 'priority',
            header: 'Priorytet',
            size: 110,
            cell: ({ getValue, row }) => {
                const priority = getValue() as number;
                const isBoosted = row.original.isBoosted;

                const getVariant = (priority: number) => {
                    if (priority >= 80) return 'destructive';
                    if (priority >= 60) return 'default';
                    return 'secondary';
                };

                return (
                    <div className="space-y-2">
                        <Badge variant={getVariant(priority)} className="font-mono font-semibold">
                            {priority}
                        </Badge>
                        {isBoosted && (
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-red-500" />
                                    <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                                        Promowana
                                    </span>
                                </div>
                                <span className="text-[0.65rem] text-zinc-400">
                                    Cel: {row.original.boostTargetReviews ? `${row.original.boostTargetReviews} recenzji` : 'brak'}
                                </span>
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            accessorKey: 'isVerified',
            header: 'Status',
            minSize: 200,
            cell: ({ row }) => {
                const isVerified = row.original.isVerified;
                const isEligible = row.original.isEligibleForQueue;

                return (
                    <div className="space-y-2">
                        <Badge
                            variant={isVerified ? 'default' : 'secondary'}
                            className="text-xs flex items-center gap-1"
                        >
                            <Shield className="w-3 h-3" />
                            {isVerified ? 'Zweryfikowana' : 'Niezweryfikowana'}
                        </Badge>
                        <Badge
                            variant={isEligible ? 'outline' : 'secondary'}
                            className="text-xs flex items-center gap-1"
                        >
                            <Award className="w-3 h-3" />
                            {isEligible ? 'Widoczna w kolejce' : 'Nie widoczna w kolejce'}
                        </Badge>
                    </div>
                );
            }
        },
        {
            accessorKey: 'dateCreatedUtc',
            header: 'Utworzona',
            size: 140,
            cell: ({ getValue }) => {
                const date = getValue() as Date;
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                return (
                    <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-zinc-900 dark:text-white">
                            <Calendar className="w-3 h-3" />
                            {new Date(date).toLocaleDateString('pl-PL')}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {diffDays === 1 ? 'wczoraj' :
                                diffDays < 7 ? `${diffDays} dni temu` :
                                    diffDays < 30 ? `${Math.floor(diffDays / 7)} tyg. temu` :
                                        `${Math.floor(diffDays / 30)} mies. temu`}
                        </div>
                    </div>
                );
            }
        },
        {
            id: 'actions',
            header: 'Akcje',
            size: 80,
            cell: ({ row }) => {
                const business = row.original;
                const isActionLoading = loadingActions[business.id];

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                disabled={isActionLoading}
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <Link href={`/dashboard/admin/businesses/${business.id}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Zobacz szczegóły
                                </DropdownMenuItem>
                            </Link>

                            {canManagePriority && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => handleToggleBoost(business)}
                                        disabled={isActionLoading}
                                        className="cursor-pointer"
                                    >
                                        {business.isBoosted ? (
                                            <>
                                                <TrendingDown className="mr-2 h-4 w-4 text-orange-600" />
                                                Cofnij promowanie
                                            </>
                                        ) : (
                                            <>
                                                <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                                                Promuj firmę
                                            </>
                                        )}
                                    </DropdownMenuItem>
                                </>
                            )}

                            {canDeleteBusiness && (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => handleDeleteBusiness(business)}
                                        disabled={isActionLoading}
                                        className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Usuń firmę
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        },
    ];

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
                            Pobieranie informacji o firmach
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
                message="Ta strona jest dostępna tylko dla administratorów systemu. Skontaktuj się z administratorem, jeśli potrzebujesz dostępu do zarządzania firmami."
            />
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-3">
                                <Building2 className="h-6 w-6 text-primary" />
                                Lista wszystkich firm
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Przeglądaj, filtruj i zarządzaj wszystkimi firmami w systemie
                            </p>
                        </div>

                        {canCreateBusiness && (
                            <Button
                                onClick={handleCreateBusiness}
                                className="bg-primary text-white hover:bg-primary/90"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Dodaj firmę
                            </Button>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    <DataTable
                        customToolbar={
                            <AdminBusinessFilters
                                onFiltersChange={handleFiltersChange}
                                canViewAllUsers={canViewAllUsers ?? undefined}
                            />
                        }
                        showBorders={false}
                        query={query}
                        columns={columns}
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminBusinessesManagementPage;