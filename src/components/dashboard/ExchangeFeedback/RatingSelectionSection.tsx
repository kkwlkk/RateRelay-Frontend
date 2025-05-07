import { AlertCircle } from "lucide-react";
import { RatingOption } from "@/types/feedback";
import { UseFormRegister, FormState } from "react-hook-form";
import { FeedbackFormData } from "@/types/feedback";
import { RatingOptions } from "./RatingOptions";

type RatingSelectionSectionProps = {
    selectedRating: RatingOption | undefined;
    handleRatingSelect: (option: RatingOption) => void;
    register: UseFormRegister<FeedbackFormData>;
    errors: FormState<FeedbackFormData>["errors"];
};

export const RatingSelectionSection = ({
    selectedRating,
    handleRatingSelect,
    register,
    errors
}: RatingSelectionSectionProps) => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                <RatingOptions
                    selectedOption={selectedRating}
                    setSelectedOption={handleRatingSelect}
                />
                <input
                    type="hidden"
                    {...register('rating', {
                        required: 'Wybierz ocenę',
                        min: { value: 1, message: 'Minimalna ocena to 1 gwiazdka' },
                        max: { value: 5, message: 'Maksymalna ocena to 5 gwiazdek' }
                    })}
                />
            </div>
            {errors.rating && (
                <p className="text-sm text-red-500 flex items-center gap-1 mt-2">
                    <AlertCircle className="h-4 w-4" />
                    {errors.rating.message}
                </p>
            )}
            {selectedRating && (
                <div className={`p-4 rounded-lg ${selectedRating.color} shadow-sm`}>
                    <p className="text-sm font-medium">
                        {selectedRating.description}
                    </p>
                </div>
            )}
        </>
    );
};