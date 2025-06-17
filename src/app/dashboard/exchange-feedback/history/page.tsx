'use client';

import { apiService } from "@/services/api";
import { createPaginatedQueryFn, usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { AccountReviewHistoryResponseDto } from "@/types/dtos/Account";
import { DataTable } from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { ExternalLink, Building2, Star } from 'lucide-react';
import { ColumnDef } from "@tanstack/react-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import dayjs from '@/utils/dayjsConfig';
import { StatusBadge } from "@/components/ReviewStatusBadge";

const columns: ColumnDef<AccountReviewHistoryResponseDto>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    size: 80,
    minSize: 60,
    maxSize: 120,
    cell: ({ row }) => (
      <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
        #{row.getValue('id')}
      </div>
    )
  },
  {
    id: 'businessName',
    accessorKey: 'businessName',
    header: 'Nazwa firmy',
    enableResizing: true,
    size: 200,
    minSize: 180,
    maxSize: 300,
    cell: ({ row }) => (
      <div className="font-medium text-zinc-900 dark:text-white">{row.getValue('businessName')}</div>
    )
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <StatusBadge status={row.getValue('status')} />
    )
  },
  {
    id: 'rating',
    accessorKey: 'rating',
    header: 'Ocena',
    enableSorting: false,
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number;
      return (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500" />
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
    enableResizing: true,
    enableSorting: false,
    cell: ({ row }) => (
      <div className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
        {row.getValue('comment') || 'Brak komentarza'}
      </div>
    )
  },
  {
    id: 'mapUrl',
    accessorKey: 'mapUrl',
    header: 'Lokalizacja',
    enableSorting: false,
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        className="h-6 text-xs border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200"
        onClick={() => window.open(row.getValue('mapUrl'), '_blank', 'noopener,noreferrer')}
      >
        <ExternalLink className="h-3 w-3 mr-1" />
        Mapa
      </Button>
    )
  },
  {
    id: 'dateCreatedUtc',
    accessorKey: 'dateCreatedUtc',
    header: 'Data dodania',
    size: 160,
    minSize: 140,
    maxSize: 200,
    cell: ({ row }) => (
      <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
        {dayjs(row.getValue('dateCreatedUtc')).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    )
  }
];

export default function UsersPage() {
  const query = usePaginatedQuery<AccountReviewHistoryResponseDto[]>({
    queryKey: ['reviewHistory'],
    queryFn: createPaginatedQueryFn((params) => apiService.getAccountReviewHistory(params)),
    initialPagination: {
      page: 1,
      pageSize: 20,
      sortBy: 'id',
      sortDirection: 'desc'
    }
  });

  return (
    <div className="space-y-8 max-w-none">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center size-10 sm:size-12 rounded-xl bg-primary/10 dark:bg-primary/10 shrink-0">
          <Building2 className="size-5 sm:size-6 text-primary dark:text-primary-foreground" />
        </div>
        <div className="min-w-0">
          <h1 className="text-xl sm:text-3xl font-semibold text-zinc-900 dark:text-white tracking-tight leading-tight">
            Historia wymiany doświadczeń
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-0.5 sm:mt-1 text-sm sm:text-lg">
            Przeglądaj historię wymiany doświadczeń z użytkownikami
          </p>
        </div>
      </div>

      <Alert
        variant="default"
        className="rounded-xl p-6 bg-primary/10 dark:bg-primary/7 border border-primary/20 dark:border-primary/30 grid-cols-none grid-rows-none flex"
      >
        <div className="flex items-start space-x-4 w-full">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 bg-primary/20 dark:bg-primary/30">
            <Star className="h-5 w-5 text-zinc-900 dark:text-white" />
          </div>
          <div className="flex-1 space-y-2">
            <AlertTitle className="font-semibold text-zinc-700 dark:text-zinc-300 w-full col-start-auto">
              System nagród
            </AlertTitle>
            <AlertDescription className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed col-start-auto">
              Otrzymasz punkt za napisanie recenzji tylko wtedy, gdy właściciel firmy ją zaakceptuje.
              Recenzje oczekujące na akceptację lub odrzucone nie przynoszą punktów.
            </AlertDescription>
          </div>
        </div>
      </Alert>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
              <Building2 className="h-5 w-5 text-zinc-900 dark:text-white" />
              Przegląd firm i recenzji
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
              Lista zawiera informacje o firmach, statusie recenzji oraz linki do lokalizacji na mapie
            </p>
          </div>
        </div>

        <DataTable
          query={query}
          columns={columns}
          className="w-full"
        />
      </div>
    </div>
  );
}