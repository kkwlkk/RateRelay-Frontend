'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';

export function LoginForm() {
    const { login } = useAuth();

    const handleLogin = async () => {
        await login();
    };

    return (
        <div className="w-full max-w-md space-y-10">
            <div className="text-center">
                <h1 className="text-3xl font-semibold text-zinc-900 dark:text-white mb-3">
                    Zaloguj się
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    Kontynuuj z kontem Google
                </p>
            </div>

            <Button
                variant="default"
                className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 border-0 rounded-xl text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleLogin}
            >
                <FaGoogle className="mr-3 h-5 w-5" />
                Kontynuuj z Google
            </Button>

            <p className="text-sm text-zinc-500 dark:text-zinc-500 text-center lg:text-left">
                Logując się, akceptujesz{' '}
                <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-300">
                    Warunki korzystania
                </Link>
                {' '}oraz{' '}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-300">
                    Politykę prywatności
                </Link>
            </p>

            <div className="lg:hidden text-center text-zinc-500 text-sm pt-8">
                © 2025 TrustRate
            </div>
        </div>
    );
} 