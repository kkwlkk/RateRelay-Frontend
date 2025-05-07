'use client';

import { GetNextBusinessForReviewResponseDto } from "@/types/dtos/ReviewableBusiness";
import { BusinessCard } from "./BusinessCard";
import { ExchangeFeedbackForm } from "./ExchangeFeedbackForm";
import { FeedbackFormData } from "@/types/feedback";
type ExchangeFeedbackContentProps = {
    businessName: GetNextBusinessForReviewResponseDto['businessName'];
    mapUrl: GetNextBusinessForReviewResponseDto['mapUrl'];
    onFormSubmit: (data: FeedbackFormData) => void;
}

export const ExchangeFeedbackContent = ({ mapUrl, businessName, onFormSubmit }: ExchangeFeedbackContentProps) => {
    return (
        <div className="px-3 sm:px-4 py-6 sm:py-8 mx-auto space-y-6 sm:space-y-8">
            <BusinessCard
                businessName={businessName}
                mapUrl={mapUrl}
            />

            <div>
                <h3 className="text-lg sm:text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-2">Jak oceniasz tę firmę?</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Twoja ocena pomoże innym użytkownikom</p>
                <ExchangeFeedbackForm businessMapUrl={mapUrl} onSubmit={onFormSubmit} />
            </div >
        </div >
    )
}