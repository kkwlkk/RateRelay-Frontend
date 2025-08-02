'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { LoginForm } from '@/components/login/loginForm';
import { FeaturesCarousel } from '@/components/login/featuresCarousel';
import { signOut } from 'next-auth/react';
import { GenericPageCenterLoader } from '@/components/GenericLoader';
import { showToast } from '@/lib/toast';
import { hasFlag } from '@/utils/accountUtils';
import { AccountFlags } from '@/enums/accountFlags';

export default function LoginPage() {
    const { isAuthenticated, isLoading, user, error } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const hasHandledError = useRef(false);
    const hasHandledUrlError = useRef(false);

    useEffect(() => {
        if (hasHandledUrlError.current) return;

        const urlError = searchParams.get('error');
        if (urlError) {
            hasHandledUrlError.current = true;

            switch (urlError) {
                case 'backend_unavailable':
                    showToast.error('Nasze usługi są obecnie niedostępne. Proszę spróbować ponownie później.', 'backend-error');
                    break;
                case 'session_expired':
                    showToast.error('Sesja wygasła. Proszę zalogować się ponownie.', 'session-expired');
                    break;
                case 'auth_failed':
                    showToast.error('Uwierzytelnianie nie powiodło się. Proszę spróbować ponownie.', 'auth-failed');
                    break;
                default:
                    showToast.error('Wystąpił błąd podczas logowania. Proszę spróbować ponownie.', 'general-error');
            }

            router.replace('/login');
        }
    }, [searchParams, router]);

    useEffect(() => {
        if (!error || hasHandledError.current) return;

        hasHandledError.current = true;

        if (error === "BackendAuthError" || error === "Backend authentication failed") {
            signOut({
                callbackUrl: '/login?error=backend_unavailable',
                redirect: false
            });
        } else {
            console.error('Unexpected authentication error:', error);
            showToast.error('Wystąpił nieoczekiwany błąd. Proszę spróbować ponownie.', 'unexpected-error');
        }
    }, [error]);

    useEffect(() => {
        if (isLoading) return;
        if (!isAuthenticated) return;

        if (user && user.hasCompletedOnboarding && hasFlag(user.flags, AccountFlags.HasSeenLastOnboardingStep)) {
            router.push('/dashboard');
        } else if (user) {
            router.push('/onboarding');
        }
    }, [isAuthenticated, isLoading, router, user]);

    useEffect(() => {
        return () => {
            hasHandledError.current = false;
            hasHandledUrlError.current = false;
        };
    }, []);

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