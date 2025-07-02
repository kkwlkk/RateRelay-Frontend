import { CheckCircle, Shield } from 'lucide-react';

interface VerificationStatusProps {
    onComplete: () => void;
}

export function VerificationStatus({ onComplete }: VerificationStatusProps) {
    return (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-3">
                Weryfikacja zakończona
            </h2>

            <p className="text-green-700 dark:text-green-300 mb-6 max-w-md mx-auto">
                Twoja firma została pomyślnie zweryfikowana. Możesz teraz korzystać z pełni funkcjonalności platformy.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Status: Zweryfikowany
                </span>
            </div>
            
            <button
                onClick={onComplete}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
                Przejdź dalej
            </button>
        </div>
    );
}