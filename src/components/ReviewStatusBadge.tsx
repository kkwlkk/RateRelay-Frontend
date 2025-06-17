import { BusinessReviewStatus } from "@/types/BusinessReviewStatus";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export const StatusBadge = ({ status }: { status: BusinessReviewStatus }) => {
    const statusConfig: Record<BusinessReviewStatus, {
        variant: 'secondary' | 'default' | 'destructive',
        text: string,
        icon: typeof Clock | typeof CheckCircle | typeof XCircle,
        className: string
    }> = {
        [BusinessReviewStatus.Pending]: {
            variant: 'secondary' as const,
            text: 'Oczekujące',
            icon: Clock,
            className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800'
        },
        [BusinessReviewStatus.Accepted]: {
            variant: 'default' as const,
            text: 'Zaakceptowane',
            icon: CheckCircle,
            className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
        },
        [BusinessReviewStatus.Rejected]: {
            variant: 'destructive' as const,
            text: 'Odrzucone',
            icon: XCircle,
            className: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
        },
        [BusinessReviewStatus.UnderDispute]: {
            variant: 'secondary' as const,
            text: 'W sporze',
            icon: Clock,
            className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800'
        }
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
        <Badge variant={config.variant} className={cn('gap-1', config.className)}>
            <Icon className="h-3 w-3" />
            {config.text}
        </Badge>
    );
};