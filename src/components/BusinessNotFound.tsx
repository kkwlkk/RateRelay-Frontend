'use client';

import { AlertTriangle, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const BusinessNotFound = ({ businessId }: { businessId: number }) => {
    const router = useRouter();

    return (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-6">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
                    <div className="text-center">
                        <div className="relative mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                                <Building2 className="w-10 h-10 text-zinc-500 dark:text-zinc-400" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                            Firma nie została znaleziona
                        </h3>

                        <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                            Nie można załadować danych firmy. Sprawdź czy masz odpowiednie uprawnienia lub spróbuj ponownie.
                        </p>

                        <div className="space-y-3">
                            <button
                                onClick={() => router.push('/dashboard/businesses')}
                                className="cursor-pointer w-full px-6 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Powrót do listy firm
                            </button>

                            <button
                                onClick={() => window.location.reload()}
                                className="cursor-pointer w-full px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-xl font-medium transition-colors"
                            >
                                Odśwież stronę
                            </button>
                        </div>

                        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                            <p className="text-xs text-zinc-500 dark:text-zinc-500">
                                ID firmy: {businessId || 'Nieznane'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}