import { onboardingText } from '@/data/onboardingText';

interface PointsBalanceProps {
    pointBalance: number;
}

export function PointsBalance({ pointBalance }: PointsBalanceProps) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-100 shadow-sm mt-12">
            <p className="text-lg text-gray-700">
                {onboardingText.pointsBalance.title(pointBalance)}
            </p>
            <p className="text-sm text-gray-500 mt-4">
                {onboardingText.pointsBalance.subtitle}
            </p>
        </div>
    );
} 