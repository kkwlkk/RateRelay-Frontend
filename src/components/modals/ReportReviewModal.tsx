import { useModalStore } from "@/contexts/ModalStoreContext";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ReviewReportReason } from "@/enums/reviewReportReason";
import { Input } from "../ui/input";

const reportSchema = z.object({
    reason: z.nativeEnum(ReviewReportReason, { required_error: "Wybierz powód zgłoszenia" }),
    title: z.string().min(5, "Tytuł musi mieć co najmniej 5 znaków").max(64, "Tytuł nie może przekraczać 64 znaków"),
    content: z.string().min(10, "Opis musi mieć co najmniej 10 znaków").max(500, "Opis nie może przekraczać 500 znaków"),
});

type ReportFormData = z.infer<typeof reportSchema>;

interface ReportReviewModalProps {
    onSubmit: (data: ReportFormData) => void;
    isLoading?: boolean;
}

const reportReasons = [
    { value: ReviewReportReason.SPAM, label: "Spam lub treści promocyjne" },
    { value: ReviewReportReason.HARASSMENT, label: "Nękanie lub mowa nienawiści" },
    { value: ReviewReportReason.INAPPROPRIATE_CONTENT, label: "Treści nieodpowiednie" },
    { value: ReviewReportReason.FALSE_INFORMATION, label: "Fałszywe informacje" },
    { value: ReviewReportReason.OTHER, label: "Inne" },
];

export const ReportReviewModal = ({
    onSubmit,
    isLoading = false,
}: ReportReviewModalProps) => {
    const { closeModal } = useModalStore();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isValid }
    } = useForm<ReportFormData>({
        resolver: zodResolver(reportSchema),
        mode: "onChange",
        defaultValues: {
            reason: undefined,
            content: "",
        },
    });

    const contentValue = watch("content") || "";

    const onFormSubmit = (data: ReportFormData) => {
        onSubmit({
            reason: data.reason,
            title: data.title.trim(),
            content: data.content.trim(),
        });
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <h2 className="text-2xl text-zinc-300 font-medium">
                    Nowe zgłoszenie
                </h2>
                <p className="text-sm text-zinc-300/75">
                    Pomóż nam utrzymać wysoką jakość treści. Opisz powód zgłoszenia.
                </p>
            </div>



            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Powód zgłoszenia *
                    </label>
                    <Controller
                        name="reason"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value !== undefined ? field.value.toString() : ""}
                                onValueChange={(value) => {
                                    field.onChange(parseInt(value) as ReviewReportReason);
                                }}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Wybierz powód" />
                                </SelectTrigger>
                                <SelectContent>
                                    {reportReasons.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.reason && (
                        <p className="text-sm text-red-500">{errors.reason.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Tytuł zgłoszenia *
                    </label>
                    <Input
                        {...register("title")}
                        disabled={isLoading}
                        placeholder="Krótki tytuł zgłoszenia"
                        className="mt-1"
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Opis zgłoszenia *
                    </label>
                    <Textarea
                        {...register("content")}
                        disabled={isLoading}
                        placeholder="Opisz szczegółowo swój problem..."
                        rows={4}
                        className="resize-none max-w-full break-all h-32 mt-1"
                        maxLength={500}
                    />
                    <div className="flex justify-between items-center">
                        <div>
                            {errors.content && (
                                <p className="text-sm text-red-500">{errors.content.message}</p>
                            )}
                        </div>
                        <p className="text-xs text-zinc-500">
                            {contentValue.length}/500 znaków
                        </p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={closeModal}
                        disabled={isLoading}
                    >
                        Anuluj
                    </Button>
                    <Button
                        type="submit"
                        variant="default"
                        disabled={isLoading || !isValid}
                        loading={isLoading}
                    >
                        Wyślij zgłoszenie
                    </Button>
                </div>
            </form>
        </div>
    );
}