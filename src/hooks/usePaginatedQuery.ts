'use client';

import { useQuery, useQueryClient, UseQueryOptions, QueryObserverResult } from '@tanstack/react-query';
import { useState, useMemo, useCallback } from 'react';
import type { ApiResponse, PaginatedApiResponse, PaginationMeta } from '@/services/api';

export interface PaginationState {
    page: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    search?: string;
}

export interface PaginatedResponse<T> {
    data: T;
    meta: PaginationMeta;
}

export interface UsePaginatedQueryOptions<TData, TError = Error>
    extends Omit<UseQueryOptions<PaginatedResponse<TData>, TError>, 'queryKey' | 'queryFn'> {
    queryKey: unknown[];
    queryFn: (pagination: PaginationState) => Promise<ApiResponse<TData, unknown, PaginationMeta>>;
    initialPagination?: Partial<PaginationState>;
}

export interface PaginationActions<TData = unknown, TError = Error> {
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    setSort: (sortBy: string, sortDirection?: 'asc' | 'desc') => void;
    setSearch: (search: string) => void;
    resetPagination: () => void;
    nextPage: () => void;
    previousPage: () => void;
    goToPage: (page: number) => void;
    invalidateQuery: () => Promise<void>;
    invalidateAll: () => Promise<void>;
    invalidateAndRefetch: () => Promise<QueryObserverResult<PaginatedResponse<TData>, TError>>;
}

export interface UsePaginatedQueryResult<TData, TError = Error> {
    data?: TData;
    meta?: PaginationMeta;

    error: TError | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    status: 'error' | 'success' | 'pending';
    isFetching: boolean;
    refetch: () => Promise<QueryObserverResult<PaginatedResponse<TData>, TError>>;

    pagination: PaginationState;
    actions: PaginationActions<TData, TError>;
}

export function usePaginatedQuery<TData, TError = Error>({
    queryKey,
    queryFn,
    initialPagination = {},
    ...options
}: UsePaginatedQueryOptions<TData, TError>): UsePaginatedQueryResult<TData, TError> {
    const queryClient = useQueryClient();

    const [pagination, setPagination] = useState<PaginationState>(() => ({
        page: 1,
        pageSize: 10,
        ...initialPagination,
    }));

    // FIXED: Create stable query key by serializing only the values we care about
    const paginatedQueryKey = useMemo(() => [
        ...queryKey,
        'paginated',
        pagination.page,
        pagination.pageSize,
        pagination.sortBy || null,
        pagination.sortDirection || null,
        pagination.search || null,
    ], [
        queryKey,
        pagination.page,
        pagination.pageSize,
        pagination.sortBy,
        pagination.sortDirection,
        pagination.search,
    ]);

    const query = useQuery<PaginatedResponse<TData>, TError>({
        queryKey: paginatedQueryKey,
        queryFn: async () => {
            const response = await queryFn(pagination);

            if (!response.success) {
                throw new Error(response.error?.message || 'Query failed');
            }

            const metadata = response.pagination || {} as PaginationMeta;

            const meta: PaginationMeta = {
                totalCount: metadata.totalCount || 0,
                pageSize: metadata.pageSize || pagination.pageSize,
                currentPage: metadata.currentPage || pagination.page,
                totalPages: metadata.totalPages || 1,
                hasNextPage: (metadata.currentPage || pagination.page) < (metadata.totalPages || 1),
                hasPreviousPage: (metadata.currentPage || pagination.page) > 1,
            };

            return {
                data: response.data,
                meta,
            };
        },

        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: 1,
        enabled: true,
        ...options,
    });

    const setPage = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, page }));
    }, []);

    const setPageSize = useCallback((pageSize: number) => {
        setPagination(prev => ({ ...prev, pageSize, page: 1 }));
    }, []);

    const setSort = useCallback((sortBy: string, sortDirection: 'asc' | 'desc' = 'asc') => {
        setPagination(prev => ({ ...prev, sortBy, sortDirection, page: 1 }));
    }, []);

    const setSearch = useCallback((search: string) => {
        setPagination(prev => ({ ...prev, search, page: 1 }));
    }, []);

    const resetPagination = useCallback(() => {
        setPagination({ page: 1, pageSize: 10, ...initialPagination });
    }, [initialPagination]);

    const nextPage = useCallback(() => {
        if (query.data?.meta.hasNextPage) {
            setPagination(prev => ({ ...prev, page: prev.page + 1 }));
        }
    }, [query.data?.meta.hasNextPage]);

    const previousPage = useCallback(() => {
        if (query.data?.meta.hasPreviousPage) {
            setPagination(prev => ({ ...prev, page: prev.page - 1 }));
        }
    }, [query.data?.meta.hasPreviousPage]);

    const goToPage = useCallback((page: number) => {
        if (page >= 1 && page <= (query.data?.meta.totalPages || 1)) {
            setPagination(prev => ({ ...prev, page }));
        }
    }, [query.data?.meta.totalPages]);

    const invalidateQuery = useCallback(async () => {
        await queryClient.invalidateQueries({
            queryKey: paginatedQueryKey,
            exact: true
        });
    }, [queryClient, paginatedQueryKey]);

    const invalidateAll = useCallback(async () => {
        await queryClient.invalidateQueries({
            queryKey: [...queryKey, 'paginated'],
            exact: false
        });
    }, [queryClient, queryKey]);

    const invalidateAndRefetch = useCallback(async () => {
        await queryClient.invalidateQueries({
            queryKey: paginatedQueryKey,
            exact: true
        });
        return query.refetch();
    }, [queryClient, paginatedQueryKey, query]);

    const actions = useMemo<PaginationActions<TData, TError>>(() => ({
        setPage,
        setPageSize,
        setSort,
        setSearch,
        resetPagination,
        nextPage,
        previousPage,
        goToPage,
        invalidateQuery,
        invalidateAll,
        invalidateAndRefetch,
    }), [
        setPage,
        setPageSize,
        setSort,
        setSearch,
        resetPagination,
        nextPage,
        previousPage,
        goToPage,
        invalidateQuery,
        invalidateAll,
        invalidateAndRefetch,
    ]);

    return {
        data: query.data?.data,
        meta: query.data?.meta,
        error: query.error,
        isError: query.isError,
        isLoading: query.isLoading,
        isSuccess: query.isSuccess,
        status: query.status,
        isFetching: query.isFetching,
        refetch: query.refetch,

        pagination,
        actions,
    };
}

export function createPaginationRequest(pagination: PaginationState) {
    return {
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortBy: pagination.sortBy,
        sortDirection: pagination.sortDirection,
        search: pagination.search,
    };
}

export function createPaginatedQueryFn<
    T,
    TRequest extends PaginationState = PaginationState,
    TMeta = unknown
>(
    apiFn: (request: TRequest) => Promise<PaginatedApiResponse<T, TMeta>>
) {
    return (pagination: PaginationState) => apiFn(createPaginationRequest(pagination) as TRequest);
}