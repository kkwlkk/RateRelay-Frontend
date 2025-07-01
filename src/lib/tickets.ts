import { TicketStatus, TicketType } from "@/types/dtos/Tickets";

const getStatusColor = (status: TicketStatus) => {
    switch (status) {
        case TicketStatus.Open:
            return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
        case TicketStatus.InProgress:
            return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
        case TicketStatus.Resolved:
            return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
        case TicketStatus.Closed:
            return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700";
        case TicketStatus.Reopened:
            return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800";
        case TicketStatus.OnHold:
            return "bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700";
        case TicketStatus.Obsolete:
            return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
        default:
            return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700";
    }
};

const getStatusLabel = (status: TicketStatus) => {
    switch (status) {
        case TicketStatus.Open:
            return "Otwarty";
        case TicketStatus.InProgress:
            return "W trakcie";
        case TicketStatus.Resolved:
            return "Rozwiązany";
        case TicketStatus.Closed:
            return "Zamknięty";
        case TicketStatus.Reopened:
            return "Ponownie otwarty";
        case TicketStatus.OnHold:
            return "Wstrzymany";
        case TicketStatus.Obsolete:
            return "Nieaktualny";
        default:
            return "Nieznany";
    }
};

const getTypeLabel = (type: TicketType) => {
    switch (type) {
        case TicketType.BusinessReview:
            return "Ocena biznesowa";
        case TicketType.UserReport:
            return "Zgłoszenie użytkownika";
        case TicketType.SystemIssue:
            return "Problem systemowy";
        case TicketType.FeatureRequest:
            return "Prośba o funkcję";
        case TicketType.GeneralInquiry:
            return "Zapytanie ogólne";
        default:
            return "Nieznany typ";
    }
};

const getTypeColor = (type: TicketType) => {
    switch (type) {
        case TicketType.BusinessReview:
            return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800";
        case TicketType.UserReport:
            return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
        case TicketType.SystemIssue:
            return "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800";
        case TicketType.FeatureRequest:
            return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800";
        case TicketType.GeneralInquiry:
            return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700";
        default:
            return "bg-zinc-50 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-700";
    }
};

export { getStatusColor, getStatusLabel, getTypeColor, getTypeLabel };