import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { UseFormWatch } from "react-hook-form";
import { FeedbackFormData } from "@/types/feedback";

type SubmitSectionProps = {
    watch: UseFormWatch<FeedbackFormData>;
};

export const SubmitSection = ({ watch }: SubmitSectionProps) => {
    const watchedLeftGoogleMapsReview = watch('leftGoogleMapsReview');

    return (
        <div className="px-5 py-4 border-t border-zinc-200 dark:border-zinc-800">
            <Button
                type="submit"
                className="bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 
                hover:bg-zinc-800 dark:hover:bg-zinc-200 font-medium py-3 rounded-md 
                transition-colors flex items-center justify-center gap-2 w-full"
            >
                <CheckCircle2 className="h-5 w-5" />
                <span>Wyślij informacje zwrotną</span>
                {watchedLeftGoogleMapsReview && <span className="font-semibold">(1,5 pkt)</span>}
                <ChevronRight className="ml-1 h-5 w-5" />
            </Button>
        </div>
    );
};