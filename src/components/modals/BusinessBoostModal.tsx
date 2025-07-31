import { useModalStore } from "@/contexts/ModalStoreContext";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";

const businessBoostSchema = z.object({
    reason: z.string().min(5, "Powód musi mieć co najmniej 5 znaków").max(255, "Powód nie może przekraczać 255 znaków"),
    targetReviews: z.number().optional(),
});

type BusinessBoostFormData = z.infer<typeof businessBoostSchema>;

interface BusinessBoostModalProps {
    onSubmit: (data: BusinessBoostFormData) => void;
    isLoading?: boolean;
}

export const BusinessBoostModal = ({
    onSubmit,
    isLoading = false,
}: BusinessBoostModalProps) => {
    const { closeModal } = useModalStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<BusinessBoostFormData>({
        resolver: zodResolver(businessBoostSchema),
        mode: "onChange",
        defaultValues: {
            reason: "Administratorskie promowanie",
            targetReviews: undefined,
        },
    });


    const onFormSubmit = (data: BusinessBoostFormData) => {
        onSubmit({
            reason: data.reason.trim(),
            targetReviews: data.targetReviews ? Math.max(data.targetReviews, 0) : undefined,
        });
        closeModal();
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <h2 className="text-2xl text-zinc-300 font-medium">
                    Boostowanie firmy
                </h2>
                <p className="text-sm text-zinc-300/75">

                </p>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Powód boostowania firmy *
                    </label>
                    <Textarea
                        {...register("reason")}
                        disabled={isLoading}
                        placeholder="Opisz powód boostowania tej firmy..."
                        rows={3}
                        className="resize-none mt-1 max-w-full break-all"
                        maxLength={255}
                    />
                    {errors.reason && (
                        <p className="text-sm text-red-500">{errors.reason.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Docelowa liczba recenzji (opcjonalnie)
                    </label>
                    <Input
                        type="number"
                        {...register("targetReviews", { valueAsNumber: true })}
                        disabled={isLoading}
                        placeholder="Wprowadź docelową liczbę recenzji"
                        min={0}
                        className="mt-1 max-w-full"
                    />
                    {errors.targetReviews && (
                        <p className="text-sm text-red-500">{errors.targetReviews.message}</p>
                    )}
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
                        Zatwierdź
                    </Button>
                </div>
            </form>
        </div>
    );
}