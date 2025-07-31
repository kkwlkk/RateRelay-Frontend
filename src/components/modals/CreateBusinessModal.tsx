import { useModalStore } from "@/contexts/ModalStoreContext";
import { Button } from "../ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Checkbox } from "../ui/checkbox";
import { GooglePlacesAutocomplete } from "../GooglePlacesAutocomplete";
import UserSelector from "../AdminUserSelector";
import type { AdminGetUsersDto } from "@/types/dtos/AdminUsers";

const createBusinessSchema = z.object({
    businessData: z.object({
        placeId: z.string().min(1, "Wybierz firmę z wyników wyszukiwania"),
        name: z.string().min(1, "Nazwa firmy jest wymagana"),
        address: z.string().min(1, "Adres firmy jest wymagany"),
    }),
    ownerAccountId: z.number().min(1, "Wybierz właściciela firmy"),
    isVerified: z.boolean(),
});

type CreateBusinessFormData = z.infer<typeof createBusinessSchema>;

interface CreateBusinessModalProps {
    onSubmit: (data: CreateBusinessFormData) => void;
    isLoading?: boolean;
}

export const CreateBusinessModal = ({
    onSubmit,
    isLoading = false,
}: CreateBusinessModalProps) => {
    const { closeModal } = useModalStore();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch
    } = useForm<CreateBusinessFormData>({
        resolver: zodResolver(createBusinessSchema),
        mode: "onChange",
        defaultValues: {
            businessData: {
                placeId: "",
                name: "",
                address: "",
            },
            ownerAccountId: 0,
            isVerified: false,
        },
    });

    const selectedBusiness = watch("businessData");

    const onFormSubmit = (data: CreateBusinessFormData) => {
        onSubmit(data);
    };

    const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
        if (place.place_id && place.name && place.formatted_address) {
            setValue("businessData", {
                placeId: place.place_id,
                name: place.name,
                address: place.formatted_address,
            }, { shouldValidate: true });
        }
    };

    const handleUserSelect = (user: AdminGetUsersDto | null, onChange: (value: number) => void) => {
        if (user) {
            onChange(user.id);
        } else {
            onChange(0);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="space-y-2">
                <h2 className="text-2xl text-zinc-300 font-medium">
                    Dodawanie nowej firmy
                </h2>
                <p className="text-sm text-zinc-300/75">
                    Wyszukaj firmę, przypisz właściciela i ustaw status weryfikacji
                </p>
            </div>

            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Wyszukaj firmę *
                    </label>
                    <GooglePlacesAutocomplete
                        onPlaceSelected={handlePlaceSelected}
                        placeholder="Wprowadź nazwę firmy lub adres..."
                        title=""
                        description=""
                        className="w-full"
                    />
                    {selectedBusiness?.name && (
                        <div className="mt-2 p-3 bg-zinc-800 rounded-lg border border-zinc-700">
                            <div className="font-medium text-zinc-200">{selectedBusiness.name}</div>
                            {selectedBusiness.address && (
                                <div className="text-sm text-zinc-400 mt-1">{selectedBusiness.address}</div>
                            )}
                            <div className="text-xs text-zinc-500 mt-1 font-mono">
                                Place ID: {selectedBusiness.placeId}
                            </div>
                        </div>
                    )}
                    {errors.businessData?.placeId && (
                        <p className="text-sm text-red-500">{errors.businessData.placeId.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Właściciel firmy *
                    </label>
                    <Controller
                        name="ownerAccountId"
                        control={control}
                        render={({ field }) => (
                            <UserSelector
                                onUserSelect={(user) => handleUserSelect(user, field.onChange)}
                                selectedUserId={field.value > 0 ? field.value : null}
                                placeholder="Wybierz właściciela firmy..."
                            />
                        )}
                    />
                    {errors.ownerAccountId && (
                        <p className="text-sm text-red-500">{errors.ownerAccountId.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Status weryfikacji
                    </label>
                    <Controller
                        name="isVerified"
                        control={control}
                        render={({ field }) => (
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="isVerified"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled={isLoading}
                                />
                                <label
                                    htmlFor="isVerified"
                                    className="text-sm text-zinc-300 cursor-pointer"
                                >
                                    Firma jest zweryfikowana
                                </label>
                            </div>
                        )}
                    />
                    <p className="text-xs text-zinc-500">
                        Jeśli zaznaczone, etap weryfikacji zostanie pominięty, a firma będzie od razu potwierdzona.
                    </p>
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
                        Dodaj firmę
                    </Button>
                </div>
            </form>
        </div>
    );
};