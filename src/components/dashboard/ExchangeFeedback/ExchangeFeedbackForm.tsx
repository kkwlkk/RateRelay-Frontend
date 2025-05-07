import { useState } from "react";
import { useForm } from "react-hook-form";
import { FeedbackFormData, ExchangeFeedbackFormProps, RatingOption } from "@/types/feedback";
import { RatingSelectionSection } from "./RatingSelectionSection";
import { CommentSection } from "./CommentSection";
import { GoogleMapsReviewSection } from "./GoogleMapsReviewSection";
import { SubmitSection } from "./SubmitSection";

export const ExchangeFeedbackForm = ({ businessMapUrl, onSubmit }: ExchangeFeedbackFormProps) => {
    const [selectedRating, setSelectedRating] = useState<RatingOption | undefined>(undefined);
    const [showFormSection, setShowFormSection] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm<FeedbackFormData>({
        defaultValues: {
            rating: 0,
            comment: '',
            postedGoogleReview: false
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    });

    const handleRatingSelect = (option: RatingOption) => {
        setSelectedRating(option);
        setShowFormSection(true);
        setValue('rating', option.value, { shouldValidate: true });
    };

    const handleFormSubmit = async (data: FeedbackFormData) => {
        try {
            await onSubmit(data);
            reset();
            setSelectedRating(undefined);
            setShowFormSection(false);
        } catch {
            // ignore
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
            <RatingSelectionSection
                selectedRating={selectedRating}
                handleRatingSelect={handleRatingSelect}
                register={register}
                errors={errors}
            />

            {showFormSection && (
                <div className="space-y-5 animate-fadeIn">
                    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800">
                        <CommentSection
                            register={register}
                            watch={watch}
                            errors={errors}
                        />

                        <GoogleMapsReviewSection
                            control={control}
                            businessMapUrl={businessMapUrl}
                        />

                        <SubmitSection watch={watch} />
                    </div>
                </div>
            )}
        </form>
    );
};