import { GetNextBusinessForReviewResponseDto } from "@/types/dtos/ReviewableBusiness";

export type RatingOption = {
    value: number;
    label: string;
    description: string;
    color: string;
    icon: React.ReactNode;
};

export type FeedbackFormData = {
    rating: number;
    comment: string;
    postedGoogleReview: boolean;
};

export type ExchangeFeedbackFormProps = {
    businessMapUrl: GetNextBusinessForReviewResponseDto['mapUrl'];
    onSubmit: (data: FeedbackFormData) => void;
    isFetching: boolean;
};