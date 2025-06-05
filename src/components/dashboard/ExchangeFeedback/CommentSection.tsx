import { UseFormRegister, UseFormWatch, FormState } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, MessageSquare } from "lucide-react";
import { FeedbackFormData } from "@/types/feedback";
import { cn } from "@/lib/utils";

type CommentSectionProps = {
    register: UseFormRegister<FeedbackFormData>;
    watch: UseFormWatch<FeedbackFormData>;
    errors: FormState<FeedbackFormData>["errors"];
};

export const CommentSection = ({ register, watch, errors }: CommentSectionProps) => {
    const watchedComment = watch('comment');

    return (
        <div className="px-5 py-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    Podziel się szczegółami
                </h3>
                <MessageSquare className="w-6 h-6 text-zinc-400 dark:text-zinc-500" />
            </div>

            <div className="space-y-4">
                <Textarea
                    {...register('comment', {
                        required: 'Napisz swoją opinię',
                        minLength: { value: 10, message: 'Opinia musi mieć minimum 10 znaków' },
                        maxLength: { value: 512, message: 'Opinia nie może przekraczać 512 znaków' }
                    })}
                    placeholder="Opisz swoje doświadczenia z tą firmą..."
                    className={cn(
                        "resize-none w-full min-h-32 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700",
                        "text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
                        "rounded-md"
                    )}
                />

                <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {watchedComment?.length || 0} / 512 znaków
                    </span>
                    {errors.comment && (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                            <AlertCircle className="h-4 w-4" />
                            {errors.comment.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};