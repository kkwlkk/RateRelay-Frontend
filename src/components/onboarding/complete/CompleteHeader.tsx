import { CheckCircle } from 'lucide-react';

interface CompleteHeaderProps {
    username: string;
}

export function CompleteHeader({ username }: CompleteHeaderProps) {
    return (
        <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-3">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                    Konfiguracja zakończona!
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    Witaj <span className="font-medium text-zinc-900 dark:text-zinc-100">{username}</span>! 
                    Twoje konto jest gotowe do użycia.
                </p>
            </div>
        </div>
    );
}