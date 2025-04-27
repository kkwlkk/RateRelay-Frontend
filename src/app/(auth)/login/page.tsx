'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { FaGoogle, FaChartLine, FaUsers, FaComments, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const features = [
    {
        icon: <FaChartLine className="w-8 h-8" />,
        title: "System punktowy",
        description: "Zarabiaj punkty za recenzje i używaj ich aby zbierać opinie dla swojej firmy",
        gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
        icon: <FaUsers className="w-8 h-8" />,
        title: "Weryfikacja firm",
        description: "Zweryfikuj swoją firmę i zbieraj opinie od klientów",
        gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
        icon: <FaComments className="w-8 h-8" />,
        title: "Recenzje lokalne",
        description: "Poznaj opinie o firmach w Twojej okolicy",
        gradient: "from-pink-500/20 to-red-500/20"
    },
    {
        icon: <FaShieldAlt className="w-8 h-8" />,
        title: "Zaufana społeczność",
        description: "Dołącz do społeczności opartej na zaufaniu i autentycznych opiniach",
        gradient: "from-red-500/20 to-orange-500/20"
    }
];

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

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-background-primary">
            <div className='relative w-full lg:w-1/2 h-[40vh] lg:h-screen bg-zinc-100 dark:bg-zinc-800 p-8 lg:p-12 overflow-hidden hidden lg:block select-none'>
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-purple-600/40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <Image
                    src="/assets/bg-blob-purple-no-vornoi.svg"
                    alt="Background Blob"
                    fill
                    className="object-cover opacity-80 pointer-events-none"
                    style={{
                        filter: 'hue-rotate(-10deg) saturate(1.2) brightness(1.05)',
                        transform: 'scale(1.05)'
                    }}
                />
                <div className="relative h-full flex flex-col">
                    <div className="flex-1 flex flex-col justify-start pt-10 space-y-8">
                        <Image
                            src="/assets/logo-white.png"
                            alt="Logo"
                            width={250}
                            height={250}
                            className="hidden md:block select-none"
                        />
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
                                Platforma stworzona z myślą o Twoim biznesie
                            </h1>
                            <p className="text-base md:text-lg text-white/90 max-w-lg leading-relaxed">
                                Zbieraj opinie, zarabiaj punkty i rozwijaj swoją firmę dzięki wymianie opinii wśród społeczności
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 mb-8">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={`group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 relative overflow-hidden select-none`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                    <div className="relative flex flex-col space-y-3">
                                        <div className="text-white/90 group-hover:text-white transition-colors duration-300">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                                            <p className="text-sm text-white/70 group-hover:text-white/90 mt-1 transition-colors duration-300">{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-auto pt-8">
                        <p className="text-sm text-white/70">
                            &copy; 2025 TrustRate. Wszelkie prawa zastrzeżone.
                        </p>
                    </div>
                </div>
            </div>

            <div className='w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 min-h-screen'>
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
                        className="w-full h-12 rounded-lg bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-zinc-800"
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