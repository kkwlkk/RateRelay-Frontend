'use client';

import { apiService } from "@/services/api";
import { createPaginatedQueryFn, usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { Building2, MessageSquare } from 'lucide-react';
import { GetBusinessesResponseDto } from "@/types/dtos/Business";
import Link from "next/link";

export default function UserBusinessesManagementPage() {
    const userBusinesses = usePaginatedQuery<GetBusinessesResponseDto[]>({
        queryKey: ['userBusinessesManagement'],
        queryFn: createPaginatedQueryFn((params) => apiService.getAllUserBusinesses(params)),
        initialPagination: {
            page: 1,
            pageSize: 8
        }
    });

    return (
        <div className="w-full px-6">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center size-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 shrink-0">
                    <Building2 className="size-6 text-white dark:text-zinc-900" />
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
                        Zarządzanie firmami
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-sm sm:text-base">
                        Zarządzaj swoimi firmami i odpowiadaj na recenzje
                    </p>
                </div>
            </div>

            {userBusinesses.isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 bg-zinc-200 dark:bg-zinc-700 rounded-xl animate-pulse"></div>
                            </div>
                            <div className="w-full h-6 bg-zinc-200 dark:bg-zinc-700 rounded mb-4 animate-pulse"></div>
                            <div className="space-y-3">
                                <div className="w-3/4 h-4 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : userBusinesses.error ? (
                <div className="text-center py-16">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 max-w-md mx-auto shadow-sm">
                        <p className="text-zinc-900 dark:text-zinc-100 text-lg font-semibold mb-2">
                            Wystąpił błąd podczas ładowania firm
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Spróbuj odświeżyć stronę
                        </p>
                    </div>
                </div>
            ) : userBusinesses.data?.length === 0 ? (
                <div className="text-center py-16">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-12 max-w-md mx-auto shadow-sm">
                        <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-zinc-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                            Brak firm
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Nie masz jeszcze żadnych firm
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {userBusinesses.data?.map((business) => (
                        <Link
                            key={business.id}
                            href={`/dashboard/businesses/${business.id}`}
                            className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 flex flex-col min-h-[160px]"
                        >
                            <div className="flex items-center mb-4">
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                    <Building2 className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
                                </div>
                            </div>

                            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4 line-clamp-2 leading-tight">
                                {business.businessName}
                            </h3>

                            <div className="mt-auto">
                                <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{business.reviews.pendingCount} oczekujących recenzji</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {userBusinesses.data && userBusinesses.data.length > 0 && (
                <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => userBusinesses.actions.previousPage()}
                            disabled={!userBusinesses.meta?.hasPreviousPage}
                            className="cursor-pointer px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Poprzednia
                        </button>
                        <span className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Strona {userBusinesses.pagination.page} z {userBusinesses.meta?.totalPages || 1}
                        </span>
                        <button
                            onClick={() => userBusinesses.actions.nextPage()}
                            disabled={!userBusinesses.meta?.hasNextPage}
                            className="cursor-pointer px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Następna
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}