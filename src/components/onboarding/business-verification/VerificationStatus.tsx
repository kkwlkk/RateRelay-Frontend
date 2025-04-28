import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Shield } from 'lucide-react';

interface VerificationStatusProps {
    onComplete: () => void;
}

export function VerificationStatus({ onComplete }: VerificationStatusProps) {
    return (
        <Card className="shadow-lg my-10 border border-gray-100">
            <CardContent className="px-8 py-16">
                <div className="text-center">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mb-10">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        Weryfikacja zakończona
                    </h2>
                    <div className="max-w-md mx-auto space-y-6 mb-10">
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Twoja firma została pomyślnie zweryfikowana. Możesz teraz korzystać z pełni funkcjonalności platformy.
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
                            <Shield className="w-5 h-5 text-green-600" />
                            <span className="text-sm font-medium text-green-700">Status: Zweryfikowany</span>
                        </div>
                    </div>
                    <Button
                        onClick={onComplete}
                        className="h-10 px-6 text-base rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:translate-y-0"
                    >
                        Przejdź dalej
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
} 