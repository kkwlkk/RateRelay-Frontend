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
import { hasPermission } from "@/utils/permissionUtils";
import { ColumnDef } from "@tanstack/react-table";
import { Building2, Star, Eye, TrendingUp, TrendingDown, MoreHorizontal, Mail, Calendar, Clock, Shield, Award, UserStar, Plus, Trash2, Trash, Ban } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Link from "next/link";
import { useModalStore } from "@/contexts/ModalStoreContext";
import { BusinessBoostModal } from "@/components/modals/BusinessBoostModal";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";
import { CreateBusinessModal } from "@/components/modals/CreateBusinessModal";
import toast from "react-hot-toast";
import { AdminBusinessFilters } from "./components/AdminBusinessFilters";
import { AdminGetUsersDto } from "@/types/dtos/AdminUsers";

const AdminUsersManagementPage = () => {
    const { user, isLoading } = useAuth();
    const [loadingActions, setLoadingActions] = useState<Record<number, boolean>>({});
    const { openModal, closeModal } = useModalStore();

    const hasRequiredPermission = user && hasPermission(user.mappedPermissions, UserPermission.ViewAllUsers);
    const canManageUsers = user && hasPermission(user.mappedPermissions, UserPermission.ManageUsers);

    const query = usePaginatedQuery({
        queryKey: ['adminUsers'],
        queryFn: createPaginatedQueryFn((params) =>
            apiService.getAllUsers({
                ...params,
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

    const columns: ColumnDef<AdminGetUsersDto, unknown>[] = [
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
            accessorKey: 'displayName',
            header: 'Nazwa użytkownika (wyświetlana)',
            minSize: 200,
            cell: ({ getValue }) => (
                <div className="font-semibold text-zinc-900 dark:text-white">
                    {getValue() as string}
                </div>
            )
        },
        {
            accessorKey: 'googleUsername',
            header: 'Nazwa użytkownika (Google)',
            size: 200,
            cell: ({ getValue }) => (
                <div className="font-semibold text-zinc-900 dark:text-white">
                    {getValue() as string}
                </div>
            )
        },
        {
            accessorKey: 'email',
            header: 'Email',
            size: 220,
            cell: ({ getValue }) => (
                <div className="flex items-center gap-1 text-sm text-zinc-900 dark:text-white">
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    {getValue() as string}
                </div>
            )
        },
        {
            accessorKey: 'pointBalance',
            header: 'Saldo punktów',
            size: 120,
            cell: ({ getValue }) => {
                const points = getValue() as number;
                return (
                    <Badge variant="outline" className="font-mono text-xs">
                        {points.toLocaleString('pl-PL')}
                    </Badge>
                );
            }
        },
        {
            accessorKey: 'isVerified',
            header: 'Zweryfikowany',
            size: 100,
            enableSorting: false,
            cell: ({ getValue }) => {
                const isVerified = getValue() as boolean;
                return (
                    <Badge variant={isVerified ? 'default' : 'secondary'} className="text-xs">
                        {isVerified ? 'Tak' : 'Nie'}
                    </Badge>
                );
            }
        },
        {
            accessorKey: 'dateCreatedUtc',
            header: 'Utworzono',
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
                        <DropdownMenuContent align="end" className="max-w-64">
                            <Link href={`/dashboard/admin/users/${business.id}`}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Eye className="mr-2 h-4 w-4" />
                                    Zobacz szczegóły
                                </DropdownMenuItem>
                            </Link>

                            {canManageUsers && (
                                <>
                                    <DropdownMenuSeparator />
                                    <Link href={`/dashboard/admin/users/${business.id}/edit`}>
                                        <DropdownMenuItem className="cursor-pointer">
                                            <UserStar className="mr-2 h-4 w-4" />
                                            Edytuj użytkownika
                                        </DropdownMenuItem>
                                    </Link>
                                    {/*  */}
                                    <DropdownMenuItem
                                        
                                        className="cursor-pointer"
                                        disabled={isActionLoading}
                                    >
                                        <Ban className="mr-2 h-4 w-4 text-red-600" />
                                        Zablokuj użytkownika
                                    </DropdownMenuItem>
                                </>
                            )}

                            {/* Uncomment if needed in the future

                            {/* {canManagePriority && (
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
                            )} */}

                            {/* {canDeleteBusiness && (
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
                            )} */}
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
                                Lista wszystkich użytkowników
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Przeglądaj, filtruj i zarządzaj wszystkimi użytkownikami w systemie
                            </p>
                        </div>

                        {/* {canCreateBusiness && (
                            <Button
                                onClick={handleCreateBusiness}
                                className="bg-primary text-white hover:bg-primary/90"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Dodaj firmę
                            </Button>
                        )} */}
                    </div>
                </div>

                <div className="p-6">
                    <DataTable
                        // customToolbar={
                        //     <AdminBusinessFilters
                        //         onFiltersChange={handleFiltersChange}
                        //         canViewAllUsers={canViewAllUsers ?? undefined}
                        //     />
                        // }
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

export default AdminUsersManagementPage;