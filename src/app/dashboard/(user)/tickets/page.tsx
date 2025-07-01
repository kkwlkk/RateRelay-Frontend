'use client';

import { DataTable } from "@/components/DataTable/DataTable";
import { useAuth } from "@/contexts/AuthContext";
import { createPaginatedQueryFn, usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { apiService } from "@/services/api"
import { GetUserTicketsResponseDto, TicketStatus, TicketType } from "@/types/dtos/Tickets";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Calendar, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LuSearch } from "react-icons/lu";
import dayjs from "@/utils/dayjsConfig";
import Link from "next/link";
import { GenericCenterLoader } from "@/components/GenericLoader";
import { getTypeColor, getTypeLabel, getStatusColor, getStatusLabel } from "@/lib/tickets";

const formatDate = (date: Date) => {
    return dayjs(date).format('MMM D, YYYY HH:mm');
};

const columns: ColumnDef<GetUserTicketsResponseDto>[] = [
    {
        accessorKey: 'id',
        header: 'ID Zgłoszenia',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-muted-foreground" />
                <span className="font-mono text-sm">#{row.getValue('id')}</span>
            </div>
        ),
    },
    {
        accessorKey: 'title',
        header: 'Tytuł',
        minSize: 300,
        enableSorting: false,
        cell: ({ row }) => (
            <div className="max-w-[300px]">
                <div className="font-medium text-sm truncate" title={row.getValue('title')}>{row.getValue('title')}</div>
                <div className="text-xs text-muted-foreground mt-1 truncate" title={row.original.description}>
                    {row.original.description}
                </div>
            </div>
        ),
    },
    {
        accessorKey: 'type',
        header: 'Rodzaj zgłoszenia',
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className={`${getTypeColor(row.getValue('type'))} text-xs`}
            >
                {getTypeLabel(row.getValue('type') as TicketType)}
            </Badge>
        ),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className={`${getStatusColor(row.getValue('status'))} text-xs font-medium`}
            >
                {getStatusLabel(row.getValue('status') as TicketStatus)}
            </Badge>
        ),
    },
    {
        accessorKey: 'assignedToName',
        header: 'Przypisany do',
        cell: ({ row }) => {
            const assignedTo = row.getValue('assignedToName') as string;
            return assignedTo ? (
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{assignedTo}</span>
                </div>
            ) : (
                <span className="text-xs text-muted-foreground italic">Nieprzypisany</span>
            );
        },
    },
    {
        accessorKey: 'createdAtUtc',
        header: 'Utworzony',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Calendar className="size-4 min-w-4 min-h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                    {formatDate(row.getValue('createdAtUtc'))}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'lastActivityAtUtc',
        header: 'Ostatnia aktywność',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Clock className="size-4 min-w-4 min-h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                    {formatDate(row.getValue('lastActivityAtUtc'))}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'actions',
        header: '',
        maxSize: 70,
        enableSorting: false,
        meta: {
            noTruncate: true
        },
        cell: ({ row }) => (
            <Link href={`/dashboard/tickets/${row.getValue('id')}`}>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <LuSearch className="w-4 h-4 text-muted-foreground" />
                </Button>
            </Link>
        ),
    }
];

export default function TicketsPage() {
    const { isAuthenticated } = useAuth();
    const query = usePaginatedQuery({
        queryKey: ['userTickets'],
        queryFn: createPaginatedQueryFn((params) => apiService.getUserTickets(params)),
        enabled: isAuthenticated
    });

    const { data, isLoading, error } = query;

    if (isLoading) {
        return <GenericCenterLoader />;
    }

    if (!isAuthenticated) {
        return <GenericCenterLoader />;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 shrink-0">
                        <Ticket className="size-6 text-white dark:text-zinc-900" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Moje zgłoszenia</h1>
                        <p className="text-muted-foreground mt-1">
                            Zarządzaj i śledź swoje prośby o wsparcie
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Ticket className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                        {data?.length || 0} zgłoszeń
                    </span>
                </div>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-sm font-medium text-red-800">Błąd ładowania zgłoszeń</span>
                    </div>
                    <p className="text-sm text-red-700 mt-1">
                        {error instanceof Error ? error.message : 'Wystąpił nieoczekiwany błąd'}
                    </p>
                </div>
            )}

            <div className="rounded-lg border bg-card">
                <DataTable
                    displayToolbar={false}
                    showBorders={false}
                    query={query}
                    columns={columns}
                    data={data || []}
                />
            </div>

            {!isLoading && (!data || data.length === 0) && (
                <div className="flex items-center justify-center min-h-[300px]">
                    <div className="text-center">
                        <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Nie znaleziono zgłoszeń</h3>
                        <p className="text-muted-foreground">
                            Nie utworzyłeś jeszcze żadnych zgłoszeń wsparcia.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}