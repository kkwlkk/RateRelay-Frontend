'use client';

import { ExchangeFeedbackContent } from "@/components/dashboard/ExchangeFeedback/ExchangeFeedbackContent";
import { ExchangeFeedbackHeader } from "@/components/dashboard/ExchangeFeedback/ExchangeFeedbackHeader";
import { NoBusinessFound } from "@/components/dashboard/ExchangeFeedback/NoBusinessFound";
import { GenericCenterLoader } from "@/components/GenericLoader";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";
import { FeedbackFormData } from "@/types/feedback";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { queryClient } from "@/lib/react-query";

export interface ReviewSessionTimerState {
    remainingTime: number;
    initialTime: number;
}

const getNextBusinessToReview = async (skipBusiness: boolean = false) => {
    const response = await apiService.getNextBusinessForReview({ skipBusiness });

    if (response.success) {
        return response.data;
    }

    return null;
}

const ExchangeFeedbackPage = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [reviewSessionTimer, setReviewSessionTimer] = useState<ReviewSessionTimerState>({
        remainingTime: 0,
        initialTime: 0
    });

    
    const { data: business, isRefetching, isLoading, refetch } = useQuery({
        queryKey: ['businessQueue'],
        queryFn: () => getNextBusinessToReview(),
        enabled: isAuthenticated,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: 1
    });

    useInterval(() => {
        setReviewSessionTimer(prev => ({
            ...prev,
            remainingTime: Math.max(prev.remainingTime - 1, 0)
        }));
        
        if (reviewSessionTimer.remainingTime === 0) {
            toast.error('Czas na zrealizowanie oceny został przekroczony');
            refetch();
        }
    }, business ? 1000 : null);

    useInterval(() => {
        refetch();
    }, !business ? 15000 : null);

    useEffect(() => {
        if (business) {
            setReviewSessionTimer({
                remainingTime: business.remainingReviewTimeInSeconds,
                initialTime: business.initialReviewTimeInSeconds
            });
        }
    }, [business]);

    const handleFormSubmit = async (formData: FeedbackFormData) => {
        if (!business) return;

        try {
            const response = await apiService.submitBusinessReview({
                rating: formData.rating,
                comment: formData.comment,
                postedGoogleReview: formData.postedGoogleReview
            });

            if (response.success) {
                toast.success('Dziękujemy za ocenę!');
                router.refresh();
                refetch();
            } else {
                toast.error(response.error?.message || 'Wystąpił błąd podczas wysyłania informacji zwrotnej');
            }
        } catch (error: unknown) {
            console.error('Error submitting feedback:', error);
            toast.error('Wystąpił błąd podczas wysyłania informacji zwrotnej');
        }
    };

    const handleSkipBusiness = async () => {
        try {
            await getNextBusinessToReview(true);
            queryClient.invalidateQueries({ queryKey: ['businessQueue'] });
            toast.success('Firma została pominięta');
        } catch (error: unknown) {
            console.error('Error skipping business:', error);
            toast.error('Wystąpił błąd podczas pomijania firmy');
        }
    }

    if (isLoading) {
        return <GenericCenterLoader />
    }

    if (!business) {
        return <NoBusinessFound isRefreshing={isRefetching} onRefresh={refetch} />
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
            <ExchangeFeedbackHeader
                remainingTime={reviewSessionTimer.remainingTime}
                initialTime={reviewSessionTimer.initialTime}
            />
            <ExchangeFeedbackContent
                key={business.businessId}
                businessName={business.businessName}
                mapUrl={business.mapUrl}
                isFetching={isRefetching}
                onFormSubmit={handleFormSubmit}
                onSkipBusiness={handleSkipBusiness}
            />
        </div>
    );
};

export default ExchangeFeedbackPage;
