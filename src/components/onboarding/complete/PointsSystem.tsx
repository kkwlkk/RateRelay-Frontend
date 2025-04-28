import { Activity, Star, TrendingUp } from 'lucide-react';
import { onboardingText } from '@/data/onboardingText';

export function PointsSystem() {
    return (
        <div className="bg-purple-50/50 p-6 rounded-xl border border-purple-100 shadow-sm">
            <h3 className="text-xl font-semibold text-purple-900 mb-4">{onboardingText.pointsSystem.title}</h3>
            <ul className="text-left space-y-4 text-purple-800">
                <li className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span>{onboardingText.pointsSystem.items[0]}</span>
                </li>
                <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span>{onboardingText.pointsSystem.items[1]}</span>
                </li>
                <li className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-purple-600 mt-0.5" />
                    <span>{onboardingText.pointsSystem.items[2]}</span>
                </li>
            </ul>
        </div>
    );
} 