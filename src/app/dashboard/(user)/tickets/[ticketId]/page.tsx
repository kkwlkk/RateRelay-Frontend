'use client';

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Ticket,
    User,
    Calendar,
    Clock,
    ArrowLeft,
    MessageSquare,
    Send,
    History,
    Building,
    Star,
    X
} from "lucide-react";
import { apiService } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { GenericCenterLoader } from "@/components/GenericLoader";
import dayjs from "@/utils/dayjsConfig";
import { toast } from "react-hot-toast";
import { getStatusColor, getStatusLabel, getTypeColor, getTypeLabel } from "@/lib/tickets";
import { useModalStore } from "@/contexts/ModalStoreContext";
import { ConfirmationModal } from "@/components/modals/ConfirmationModal";

const formatDate = (date: Date) => {
    return dayjs.utc(date).local().format('MMM D, YYYY HH:mm');
};

const formatRelativeDate = (date: Date) => {
    return dayjs.utc(date).local().fromNow();
};

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(part => part.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export default function TicketDetailPage() {
    const params = useParams<{ ticketId: string }>();
    const router = useRouter();
    const { user, isAuthenticated } = useAuth();
    const { openModal, closeModal } = useModalStore();
    const queryClient = useQueryClient();
    const [newComment, setNewComment] = useState('');
    const [showStatusHistory, setShowStatusHistory] = useState(false);

    const ticketId = Number(params.ticketId);

    console.log('Debug info:', {
        params,
        ticketId,
        isAuthenticated,
        user,
        ticketIdValid: !!ticketId && !isNaN(ticketId)
    });

    const { data: queryData, isLoading, error } = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: () => apiService.getTicketById(ticketId, true, false),
        enabled: isAuthenticated && !!ticketId,
        staleTime: 0
    });
    const ticket = queryData?.data;

    const addCommentMutation = useMutation({
        mutationFn: (content: string) => apiService.addTicketComment(ticketId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
            setNewComment('');
            toast.success('Komentarz został dodany');
        },
        onError: () => {
            toast.error('Nie udało się dodać komentarza');
        }
    });

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        addCommentMutation.mutate(newComment.trim());
    };

    const closeTicketMutation = useMutation({
        mutationFn: (ticketId: number) => apiService.closeTicket(ticketId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ticket', ticketId] });
            closeModal();
            toast.success('Zgłoszenie zostało zamknięte');
        },
        onError: () => {
            toast.error('Nie udało się zamknąć zgłoszenia');
        }
    });

    const handleCloseTicket = () => {
        openModal(ConfirmationModal, {
            onConfirm: () => closeTicketMutation.mutate(ticketId),
            title: 'Zamknięcie zgłoszenia',
            description: 'Czy na pewno chcesz zamknąć to zgłoszenie?',
        })
    };

    if (isLoading) {
        return <GenericCenterLoader />;
    }

    if (!isAuthenticated) {
        return <GenericCenterLoader />;
    }

    if (error || !ticket) {
        return (
            <div className="container mx-auto">
                <div className="text-center">
                    <div className="w-16 h-16 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                        <Ticket className="w-8 h-8 text-zinc-600 dark:text-zinc-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        Nie znaleziono zgłoszenia
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                        Zgłoszenie o podanym ID nie istnieje lub nie masz do niego dostępu.
                    </p>
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-zinc-200 dark:border-zinc-700"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Powrót
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full px-2">
            <div className="mb-8">
                <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    className="mb-6 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Powrót do listy zgłoszeń
                </Button>

                <div className="bg-white dark:bg-zinc-700/10 rounded-xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
                    <div className="flex items-start justify-between gap-6">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-900 dark:bg-zinc-100">
                                    <Ticket className="w-6 h-6 text-white dark:text-zinc-900" />
                                </div>
                                <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-md">
                                    #{ticket.id}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
                                {ticket.title}
                            </h1>
                            <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{ticket.reporterName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(ticket.dateCreatedUtc)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>Ostatnia aktywność {formatRelativeDate(ticket.lastActivityUtc)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-white dark:bg-zinc-700/10 border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-xl text-zinc-900 dark:text-zinc-100">
                                Opis zgłoszenia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-zinc dark:prose-invert max-w-none">
                                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                    {ticket.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-zinc-700/10 border-zinc-200 dark:border-zinc-800 shadow-sm sm:hidden">
                        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-lg text-zinc-900 dark:text-zinc-100">Szczegóły</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5">
                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Status</label>
                                <Badge
                                    variant="outline"
                                    className={`${getStatusColor(ticket.status)} font-medium`}
                                >
                                    {getStatusLabel(ticket.status)}
                                </Badge>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Typ zgłoszenia</label>
                                <Badge
                                    variant="outline"
                                    className={`${getTypeColor(ticket.type)}`}
                                >
                                    {getTypeLabel(ticket.type)}
                                </Badge>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Zgłaszający</label>
                                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{ticket.reporterName}</p>
                            </div>

                            {ticket.isAssigned && ticket.assignedToName && (
                                <div>
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Przypisany do</label>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium">{ticket.assignedToName}</p>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Data utworzenia</label>
                                <p className="text-zinc-700 dark:text-zinc-300 font-mono text-sm">{formatDate(ticket.dateCreatedUtc)}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Ostatnia aktywność</label>
                                <p className="text-zinc-700 dark:text-zinc-300 font-mono text-sm">{formatDate(ticket.lastActivityUtc)}</p>
                            </div>

                            {(ticket.subjects.businessId || ticket.subjects.reviewId) && (
                                <>
                                    <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                                    <div>
                                        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-3">Powiązane elementy</label>
                                        <div className="space-y-3">
                                            {ticket.subjects.businessId && (
                                                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                        <Building className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Firma</p>
                                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                                                            ID: {ticket.subjects.businessId}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {ticket.subjects.reviewId && (
                                                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                        <Star className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Opinia</p>
                                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                                                            ID: {ticket.subjects.reviewId}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-zinc-700/10 border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                    <MessageSquare className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                </div>
                                Komentarze ({ticket.comments.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 !pt-0">
                            {ticket.comments.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                                        <MessageSquare className="w-6 h-6 text-zinc-400" />
                                    </div>
                                    <p className="text-zinc-500 dark:text-zinc-400">
                                        {ticket.isOpen ? "Brak komentarzy. Bądź pierwszy, który skomentuje to zgłoszenie." : "Zgłoszenie zostało zamknięte."}
                                    </p>
                                </div>
                            ) : (
                                ticket.comments.map((comment, index) => {
                                    const isReporter = comment.authorName === ticket.reporterName;
                                    return (
                                        <div key={comment.id}>
                                            <div className={`flex items-start gap-4 ${!isReporter ? 'flex-row-reverse' : ''}`}>
                                                <Avatar className="w-10 h-10 border border-zinc-200 dark:border-zinc-700">
                                                    <AvatarFallback className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                                                        {getInitials(comment.authorName)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <div className={`flex items-center gap-3 mb-2 ${!isReporter ? 'flex-row-reverse' : ''}`}>
                                                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                                                            {comment.authorName}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            {comment.isInternal && (
                                                                <Badge className="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 text-xs px-2 py-0.5">
                                                                    Wewnętrzny
                                                                </Badge>
                                                            )}
                                                            {comment.isSystemGenerated && (
                                                                <Badge variant="outline" className="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs px-2 py-0.5">
                                                                    System
                                                                </Badge>
                                                            )}
                                                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                                                {formatRelativeDate(comment.dateCreatedUtc)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className={`bg-zinc-50/80 dark:bg-zinc-800/30 rounded-xl p-4 border border-zinc-100 dark:border-zinc-800`}>
                                                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                                                            {comment.content}
                                                        </p>
                                                    </div>
                                                    {comment.dateEditedUtc && comment.dateEditedUtc !== comment.dateCreatedUtc && (
                                                        <p className={`text-xs text-zinc-400 mt-2 ${!isReporter ? 'mr-4 text-right' : 'ml-4'}`}>
                                                            Edytowano {formatRelativeDate(comment.dateEditedUtc)}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {index < ticket.comments.length - 1 && (
                                                <Separator className="my-6 bg-zinc-200 dark:bg-zinc-800" />
                                            )}
                                        </div>
                                    );
                                })
                            )}

                            {ticket.isOpen && (
                                <>
                                    <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                                    <div className="bg-zinc-50/50 dark:bg-zinc-800/20 rounded-xl p-5 border border-zinc-200/50 dark:border-zinc-700/50">
                                        <div className={`flex items-start gap-4 ${user && user.username !== ticket.reporterName && user.email !== ticket.reporterName ? 'flex-row-reverse' : ''}`}>
                                            <Avatar className="w-10 h-10 border border-zinc-200 dark:border-zinc-700">
                                                <AvatarFallback className="bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 text-zinc-700 dark:text-zinc-300 text-sm font-medium">
                                                    {user ? getInitials(user.username || user.email) : 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 space-y-3">
                                                <Textarea
                                                    placeholder="Dodaj komentarz..."
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    rows={3}
                                                    className="resize-none bg-white dark:bg-zinc-700/10 border-zinc-200 dark:border-zinc-700 focus:border-zinc-300 dark:focus:border-zinc-600 focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-600 transition-all duration-200"
                                                />
                                                <div className={`flex ${user && user.username !== ticket.reporterName && user.email !== ticket.reporterName ? 'justify-start' : 'justify-end'}`}>
                                                    <Button
                                                        onClick={handleAddComment}
                                                        disabled={!newComment.trim() || addCommentMutation.isPending}
                                                        className="bg-zinc-700 hover:bg-zinc-600 dark:bg-zinc-300 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors duration-200"
                                                    >
                                                        <Send className="w-4 h-4 mr-2" />
                                                        {addCommentMutation.isPending ? 'Wysyłanie...' : 'Wyślij'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-white dark:bg-zinc-700/10 border-zinc-200 dark:border-zinc-800 shadow-sm hidden sm:block">
                        <CardHeader className="border-b border-zinc-100 dark:border-zinc-800">
                            <CardTitle className="text-lg text-zinc-900 dark:text-zinc-100">Szczegóły</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 py-5">
                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Status</label>
                                <Badge
                                    variant="outline"
                                    className={`${getStatusColor(ticket.status)} font-medium`}
                                >
                                    {getStatusLabel(ticket.status)}
                                </Badge>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Typ zgłoszenia</label>
                                <Badge
                                    variant="outline"
                                    className={`${getTypeColor(ticket.type)}`}
                                >
                                    {getTypeLabel(ticket.type)}
                                </Badge>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Zgłaszający</label>
                                <p className="text-zinc-900 dark:text-zinc-100 font-medium">{ticket.reporterName}</p>
                            </div>

                            {ticket.isAssigned && ticket.assignedToName && (
                                <div>
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Przypisany do</label>
                                    <p className="text-zinc-900 dark:text-zinc-100 font-medium">{ticket.assignedToName}</p>
                                </div>
                            )}

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Data utworzenia</label>
                                <p className="text-zinc-700 dark:text-zinc-300 font-mono text-sm">{formatDate(ticket.dateCreatedUtc)}</p>
                            </div>

                            <div>
                                <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-2">Ostatnia aktywność</label>
                                <p className="text-zinc-700 dark:text-zinc-300 font-mono text-sm">{formatDate(ticket.lastActivityUtc)}</p>
                            </div>

                            {(ticket.subjects.businessId || ticket.subjects.reviewId) && (
                                <>
                                    <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                                    <div>
                                        <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 block mb-3">Powiązane elementy</label>
                                        <div className="space-y-3">
                                            {ticket.subjects.businessId && (
                                                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                        <Building className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Firma</p>
                                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                                                            ID: {ticket.subjects.businessId}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                            {ticket.subjects.reviewId && (
                                                <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                        <Star className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Opinia</p>
                                                        <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono">
                                                            ID: {ticket.subjects.reviewId}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}

                            {ticket.isOpen && (
                                <>
                                    <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                                    <Button
                                        onClick={handleCloseTicket}
                                        disabled={closeTicketMutation.isPending}
                                        variant="outline"
                                        className="w-full bg-red-50 hover:bg-red-100 dark:bg-red-950/50 dark:hover:bg-red-950/70 border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 hover:text-red-800 dark:hover:text-red-200"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        {closeTicketMutation.isPending ? 'Zamykanie...' : 'Zamknij zgłoszenie'}
                                    </Button>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {ticket.statusHistory.length > 0 && (
                        <Card className="bg-white dark:bg-zinc-700/10 border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <CardHeader
                                className="border-b border-zinc-100 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                                onClick={() => setShowStatusHistory(!showStatusHistory)}
                            >
                                <CardTitle className="text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                        <History className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                    </div>
                                    Historia statusów
                                </CardTitle>
                            </CardHeader>
                            {showStatusHistory && (
                                <CardContent className="pt-6">
                                    <div className="space-y-4">
                                        {ticket.statusHistory.map((history, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 flex-shrink-0" />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                            {getStatusLabel(history.fromStatus)} → {getStatusLabel(history.toStatus)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                                        {history.changedByName} • {formatDate(history.dateCreatedUtc)}
                                                    </p>
                                                    {history.changedReason && (
                                                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 bg-zinc-50 dark:bg-zinc-800 px-2 py-1 rounded">
                                                            {history.changedReason}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}