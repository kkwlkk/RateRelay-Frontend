'use client';

import { GetNextBusinessForReviewResponseDto } from "@/types/dtos/ReviewableBusiness";
import { BusinessCard } from "./BusinessCard";
import { ExchangeFeedbackForm } from "./ExchangeFeedbackForm";
import { FeedbackFormData } from "@/types/feedback";
import { SkipAssignedBusiness } from "./SkipAssignedBusiness";

type ExchangeFeedbackContentProps = {
    businessName: GetNextBusinessForReviewResponseDto['businessName'];
    mapUrl: GetNextBusinessForReviewResponseDto['mapUrl'];
    isFetching: boolean;
    onFormSubmit: (data: FeedbackFormData) => void;
    onSkipBusiness: () => void;
}

export const ExchangeFeedbackContent = ({ mapUrl, businessName, isFetching, onFormSubmit, onSkipBusiness }: ExchangeFeedbackContentProps) => {
    return (
        <div className="px-3 sm:px-4 py-6 sm:py-8 mx-auto space-y-6 sm:space-y-8">
            <BusinessCard
                businessName={businessName}
                mapUrl={mapUrl}
            />
            <SkipAssignedBusiness onSkipBusiness={onSkipBusiness} isFetching={isFetching} />
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Twoja ocena pomoże innym użytkownikom</p>
            <ExchangeFeedbackForm businessMapUrl={mapUrl} onSubmit={onFormSubmit} isFetching={isFetching} />
        </div>
    )
}