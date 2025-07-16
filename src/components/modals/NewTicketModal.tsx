import { useModalStore } from "@/contexts/ModalStoreContext";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { TicketType } from "@/types/dtos/Tickets";
import { ticketTypes } from "@/lib/tickets";

const newTicketSchema = z.object({
    type: z.nativeEnum(TicketType, { required_error: "Wybierz typ zgłoszenia" }),
    title: z.string().min(5, "Tytuł musi mieć co najmniej 5 znaków").max(64, "Tytuł nie może przekraczać 64 znaków"),
    content: z.string().min(10, "Opis musi mieć co najmniej 10 znaków").max(500, "Opis nie może przekraczać 500 znaków"),
});

type NewTicketFormData = z.infer<typeof newTicketSchema>;

interface NewTicketModalProps {
    onSubmit: (data: NewTicketFormData) => void;
    isLoading?: boolean;
    initialType?: TicketType;
}

export const NewTicketModal = ({
    onSubmit,
    initialType,
    isLoading = false,
}: NewTicketModalProps) => {
    const { closeModal } = useModalStore();

    console.log('NewTicketModal rendered with initialType:', initialType);

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isValid }
    } = useForm<NewTicketFormData>({
        resolver: zodResolver(newTicketSchema),
        mode: "onChange",
        defaultValues: {
            type: initialType || undefined,
            title: "",
            content: "",
        },
    });

    const contentValue = watch("content") || "";

    const onFormSubmit = (data: NewTicketFormData) => {
        onSubmit({
            type: data.type,
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

                </p>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Powód zgłoszenia *
                    </label>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select
                                value={field.value !== undefined ? field.value.toString() : ""}
                                onValueChange={(value) => {
                                    field.onChange(parseInt(value) as TicketType);
                                }}
                                disabled={isLoading}
                            >
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Wybierz powód" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ticketTypes.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.type && (
                        <p className="text-sm text-red-500">{errors.type.message}</p>
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
                        className="resize-none mt-1 max-w-full break-all h-32"
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