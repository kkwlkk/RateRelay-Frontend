'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const { login, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            router.push('/dashboard');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleLogin = async () => {
        await login();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-600">RateRelay</h1>
                <p className="text-gray-600 mb-8 text-center">
                    Sign in to manage your business reviews
                </p>

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                >
                    {isLoading ? (
                        <span className="mr-2">Loading...</span>
                    ) : (
                        <>
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M12.545,10.239V13.75h5.687c-0.232,1.379-1.747,4.042-5.687,4.042c-3.427,0-6.227-2.838-6.227-6.338 c0-3.5,2.799-6.337,6.227-6.337c1.949,0,3.252,0.827,4,1.534l2.721-2.623c-1.747-1.638-4.215-2.634-6.719-2.634 c-5.547,0-10.03,4.502-10.03,10.061c0,5.56,4.484,10.061,10.03,10.061c5.796,0,9.65-4.073,9.65-9.804 c0-0.657-0.073-1.161-0.167-1.674L12.545,10.239z" />
                            </svg>
                            Sign in with Google
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}