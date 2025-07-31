'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { LoginForm } from '@/components/login/loginForm';
import { FeaturesCarousel } from '@/components/login/featuresCarousel';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import { GenericPageCenterLoader } from '@/components/GenericLoader';

export default function LoginPage() {
    const { isAuthenticated, isLoading, user, error } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!error) return;
        if (error === "BackendAuthError") {
            signOut({ callbackUrl: '/login', redirect: false });
            toast.error('Błąd uwierzytelniania. Proszę spróbować ponownie.');
        } else {
            console.error('Unexpected error:', error);
        }
    }, [error]);

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) return;

        if (user && user.hasCompletedOnboarding) {
            router.push('/dashboard');
        } else {
            router.push('/onboarding');
        }
    }, [isAuthenticated, isLoading, router, user]);

    if (isLoading) {
        return <GenericPageCenterLoader />;
    }

    if (isAuthenticated) {
        return <GenericPageCenterLoader />;
    }

    return (
        <div className="min-h-screen flex bg-zinc-50 dark:bg-zinc-950">
            <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 dark:bg-black p-16 flex-col">
                <div className="mb-2">
                    <Image src="/assets/logo-white.png" alt="TrustRate Logo" width={250} height={250} />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="max-w-xl mb-16">
                        <h2 className="text-5xl font-medium text-white mb-8 leading-tight">
                            Zbuduj zaufanie.<br />
                            Dziel się opiniami.
                        </h2>
                        <p className="text-zinc-400 text-xl leading-relaxed">
                            Platforma opinii, która przekształca zadowolenie klientów w realny wzrost Twojego biznesu.
                        </p>
                    </div>

                    <FeaturesCarousel />
                </div>

                <div className="text-zinc-500 text-sm mt-8">
                    © 2025 TrustRate. Wszelkie prawa zastrzeżone.
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                <LoginForm />
            </div>
        </div>
    );
}