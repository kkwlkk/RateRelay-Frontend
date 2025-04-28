import { CheckCircle } from 'lucide-react';
import { onboardingText } from '@/data/onboardingText';

interface CompleteHeaderProps {
    username: string;
}

export function CompleteHeader({ username }: CompleteHeaderProps) {
    return (
        <div className="space-y-8 mb-8">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-100 to-green-50 shadow-lg">
                <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-900">{onboardingText.header.title}</h2>
            <p className="text-xl text-gray-600">
                {onboardingText.header.welcome(username)}
            </p>
        </div>
    );
} 