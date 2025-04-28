import { CheckCircle, MessageSquare, ClipboardList } from 'lucide-react';
import { onboardingText } from '@/data/onboardingText';

interface WhatYouCanDoProps {
    hasCompletedOnboarding: boolean;
}

export function WhatYouCanDo({ hasCompletedOnboarding }: WhatYouCanDoProps) {
    return (
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">{onboardingText.whatYouCanDo.title}</h3>
            <ul className="text-left space-y-4 text-blue-800">
                <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>{onboardingText.whatYouCanDo.items[0]}</span>
                </li>
                {!hasCompletedOnboarding && (
                    <li className="flex items-start gap-3">
                        <MessageSquare className="h-5 w-5 text-blue-600 mt-0.5" />
                        <span>{onboardingText.whatYouCanDo.items[1]}</span>
                    </li>
                )}
                <li className="flex items-start gap-3">
                    <ClipboardList className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>{onboardingText.whatYouCanDo.items[2]}</span>
                </li>
            </ul>
        </div>
    );
} 