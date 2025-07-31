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
import { GenericPageCenterLoader } from "@/components/GenericLoader";
import { getTypeColor, getTypeLabel, getStatusColor, getStatusLabel } from "@/lib/tickets";
import { useModalStore } from "@/contexts/ModalStoreContext";
import { NewTicketModal } from "@/components/modals/NewTicketModal";
import toast from "react-hot-toast";
import { useCallback, useEffect } from "react";
import { useURLParams } from "@/hooks/useURLParams";

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
        meta: {
            noTruncate: true
        },
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
        meta: {
            noTruncate: true
        },
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
        accessorKey: 'dateCreatedUtc',
        header: 'Utworzony',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Calendar className="size-4 min-w-4 min-h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                    {formatDate(row.getValue('dateCreatedUtc'))}
                </span>
            </div>
        ),
    },
    {
        accessorKey: 'lastActivityUtc',
        header: 'Ostatnia aktywność',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Clock className="size-4 min-w-4 min-h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                    {formatDate(row.getValue('lastActivityUtc'))}
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
    const { removeParam, getParam } = useURLParams();
    const startNewTicket = getParam("new");
    const ticketType = getParam("type") as unknown as TicketType | undefined;
    const { isAuthenticated } = useAuth();
    const { openModal, closeModal } = useModalStore();

    const query = usePaginatedQuery({
        queryKey: ['userTickets'],
        queryFn: createPaginatedQueryFn((params) => apiService.getUserTickets(params)),
        enabled: isAuthenticated
    });

    const { data, isLoading } = query;

    const openNewTicketModal = useCallback((type?: TicketType) => {
        openModal(NewTicketModal, {
            initialType: type,
            onSubmit: async (data) => {
                const { title, content, type } = data;
                const response = await apiService.createTicket(title, content, type);
                console.log("Ticket creation response:", response);
                if (response.success) {
                    query.refetch();
                    closeModal();
                    toast.success("Zgłoszenie zostało utworzone.");
                }

                if (response.error?.code == 'TicketCooldown') {
                    toast.error("Nie możesz utworzyć nowego zgłoszenia tak szybko.");
                    return;
                }

                toast.error("Wystąpił błąd podczas tworzenia zgłoszenia.");
                console.error("Error creating ticket:", response.error);
            }
        });
    }, [closeModal, openModal, query]);

    useEffect(() => {
        const shouldOpenModal = ticketType || startNewTicket;

        if (!shouldOpenModal) return;

        openNewTicketModal(ticketType);

        const paramsToRemove = ["new"];
        if (ticketType) paramsToRemove.push("type");

        paramsToRemove.forEach(removeParam);
    }, [openNewTicketModal, removeParam, startNewTicket, ticketType]);

    if (isLoading) {
        return <GenericPageCenterLoader />;
    }

    if (!isAuthenticated) {
        return <GenericPageCenterLoader />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="flex items-center justify-center size-12 rounded-xl bg-zinc-900 dark:bg-zinc-100 shrink-0">
                        <Ticket className="size-6 text-white dark:text-zinc-900" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">Moje zgłoszenia</h1>
                        <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                            Zarządzaj i śledź swoje prośby o wsparcie
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="default"
                        className="bg-primary dark:bg-primary/80 w-full sm:w-auto"
                        onClick={() => openNewTicketModal(ticketType)}
                    >
                        <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Nowe zgłoszenie</span>
                    </Button>
                </div>
            </div>

            <div className="rounded-lg border bg-card">
                <DataTable
                    displayToolbar={false}
                    showBorders={false}
                    query={query}
                    columns={columns}
                    data={data || []}
                    emptyIcon={<Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-4" />}
                    emptyMessage="Nie znaleziono zgłoszeń"
                    emptyDescription="Nie utworzyłeś jeszcze żadnych zgłoszeń wsparcia."
                />
            </div>
        </div>
    );
}