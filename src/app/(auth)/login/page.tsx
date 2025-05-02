'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { FaGoogle } from 'react-icons/fa';
import Link from 'next/link';


export default function LoginPage() {
    const { login, isAuthenticated, isLoading, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) return;

        if (user && user.hasCompletedOnboarding) {
            router.push('/dashboard');
        } else {
            router.push('/onboarding');
        }
    }, [isAuthenticated, isLoading, router, user]);

    const handleLogin = async () => {
        await login();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-background-primary dark:bg-zinc-900">
            <div className='size-full flex items-center justify-center p-8 lg:p-12 min-h-screen'>
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                            Witaj ponownie
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            Zaloguj się, aby kontynuować
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-12 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800 !text-gray-900 dark:!text-white"
                        size="lg"
                        icon={<FaGoogle className="mr-3" />}
                        onClick={handleLogin}
                    >
                        Zaloguj się z Google
                    </Button>

                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                        Kontynuując, akceptujesz nasze&nbsp;
                        <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Warunki korzystania
                        </Link>
                        &nbsp;i&nbsp;
                        <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                            Politykę prywatności
                        </Link>
                    </p>

                    <div className="lg:hidden text-center mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            &copy; 2025 TrustRate. Wszelkie prawa zastrzeżone.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}