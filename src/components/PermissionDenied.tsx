import { ShieldX, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PermissionDeniedProps {
    title?: string;
    message?: string;
    showBackButton?: boolean;
    backButtonText?: string;
    backButtonHref?: string;
}

export const PermissionDenied = ({
    title = "Brak uprawnień",
    message = "Nie masz uprawnień do przeglądania tej strony.",
    showBackButton = true,
    backButtonText = "Wróć do pulpitu",
    backButtonHref = "/dashboard"
}: PermissionDeniedProps) => {
    const router = useRouter();

    const handleGoBack = () => {
        router.push(backButtonHref);
    };

    return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-50 dark:bg-red-900/20">
                        <ShieldX className="w-10 h-10 text-red-500 dark:text-red-400" />
                    </div>
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {message}
                    </p>
                </div>

                {showBackButton && (
                    <div className="pt-4">
                        <Button
                            onClick={handleGoBack}
                            variant="link"
                            className="flex items-center gap-2 text-zinc-950 dark:text-accent-foreground"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            {backButtonText}
                        </Button>
                    </div>
                )}

                <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        Jeśli uważasz, że to błąd, skontaktuj się z administratorem.
                    </p>
                </div>
            </div>
        </div>
    );
};