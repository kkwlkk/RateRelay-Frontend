'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Settings, Users, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingNotFound() {
    const router = useRouter();
    
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="mb-8">
                    <div className="relative">
                        <div className="text-8xl sm:text-9xl font-bold text-zinc-200 dark:text-zinc-800 select-none">
                            404
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                                <Search className="h-12 w-12 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Ups! Strona nie znaleziona
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto">
                        Strona, której szukasz, mogła zostać przeniesiona, usunięta lub nie istnieje.
                        Sprawdź adres URL lub wróć do strony głównej.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <Link href="/">
                        <Button size="lg" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
                            <Home className="h-5 w-5 mr-2" />
                            Strona główna
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-5 w-5 mr-2" />
                        Wróć
                    </Button>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
                        Może szukasz tego?
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link
                            href="/features"
                            className="text-center group"
                        >
                            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                                <Settings className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                                Funkcje
                            </div>
                        </Link>

                        <Link
                            href="/about"
                            className="text-center group"
                        >
                            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                                <Users className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                                O nas
                            </div>
                        </Link>

                        <Link
                            href="/contact"
                            className="text-center group"
                        >
                            <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                                <Mail className="h-6 w-6 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">
                                Kontakt
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 mb-4">
                        Nadal nie możesz znaleźć tego, czego szukasz?
                    </p>
                    <Link href="/contact">
                        <Button variant="ghost" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                            Skontaktuj się z naszym zespołem wsparcia
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}