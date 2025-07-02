import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Loader2 } from "lucide-react";

export default function OnboardingPage() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm max-w-md w-full text-center">
                    <div className="mb-6">
                        <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-4">
                            <Loader2 className="h-8 w-8 text-blue-600 dark:text-blue-400 animate-spin" />
                        </div>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                            Przygotowywanie konfiguracji
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Przekierowanie do odpowiedniego kroku...
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}