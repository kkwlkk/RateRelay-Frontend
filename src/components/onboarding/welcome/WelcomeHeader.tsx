import { CheckCircle } from 'lucide-react';

export default function WelcomeHeader() {
    return (
        <div className="text-center mb-12">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Witamy w TrustRate!
            </h1>
            <div className="max-w-2xl mx-auto space-y-2">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                    Dziękujemy za potwierdzenie autentyczności Twojej firmy!
                </p>
                <p className="text-zinc-500 dark:text-zinc-500">
                    Przeczytaj nasz regulamin i dołącz do programu TrustRate.
                </p>
            </div>
        </div>
    );
}