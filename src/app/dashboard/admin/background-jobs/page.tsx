'use client';

import { PermissionDenied } from "@/components/PermissionDenied";
import { useAuth } from "@/contexts/AuthContext";
import { UserPermission } from "@/enums/permissions";
import { hasPermission } from "@/utils/permissionUtils";
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from "lucide-react";

const AdminBackgroundJobsManagementPage = () => {
    const { user, isLoading } = useAuth();
    const [iframeLoading, setIframeLoading] = useState(false);
    const [iframeError, setIframeError] = useState(false);
    const fallbackTimerRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const hasRequiredPermission = Boolean(user && hasPermission(user.mappedPermissions, UserPermission.AccessHangfireDashboard));

    const {
        data: healthCheckPassed,
        isLoading: healthCheckLoading,
        isError: healthCheckError,
        refetch: retryHealthCheck
    } = useQuery<boolean>({
        queryKey: ['hangfire-health'],
        queryFn: async () => {
            const response = await fetch('/admin/hangfire', {
                method: 'HEAD',
                credentials: 'same-origin'
            });

            if (!response.ok) {
                throw new Error(`Hangfire dashboard unavailable: ${response.status}`);
            }

            return true;
        },
        enabled: hasRequiredPermission,
        retry: 2,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        staleTime: 30000
    });

    const handleIframeLoad = () => {
        setIframeLoading(false);
        setIframeError(false);

        if (fallbackTimerRef.current) {
            clearTimeout(fallbackTimerRef.current);
            fallbackTimerRef.current = undefined;
        }
    };

    const handleIframeError = () => {
        setIframeLoading(false);
        setIframeError(true);

        if (fallbackTimerRef.current) {
            clearTimeout(fallbackTimerRef.current);
            fallbackTimerRef.current = undefined;
        }
    };

    const retryLoading = () => {
        setIframeError(false);
        retryHealthCheck();
    };

    useEffect(() => {
        if (healthCheckPassed && !iframeError) {
            setIframeLoading(true);

            fallbackTimerRef.current = setTimeout(() => {
                setIframeLoading(false);
                setIframeError(true);
            }, 8000);
        }

        return () => {
            if (fallbackTimerRef.current) {
                clearTimeout(fallbackTimerRef.current);
                fallbackTimerRef.current = undefined;
            }
        };
    // do not add iframeLoading or iframeError to dependencies because it will cause infinite loop and the iframe will never load
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [healthCheckPassed]);

    if (isLoading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[500px]">
                <div className="text-center space-y-4">
                    <LoaderCircle className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-zinc-900 dark:text-white">
                            Ładowanie danych...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!hasRequiredPermission) {
        return (
            <PermissionDenied
                title="Brak uprawnień administratora"
                message="Ta strona jest dostępna tylko dla administratorów systemu. Skontaktuj się z administratorem, jeśli potrzebujesz dostępu do zarządzania zadaniami w tle."
            />
        );
    }

    const showLoading = healthCheckLoading || iframeLoading;
    const showError = healthCheckError || iframeError;

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                Zadania w tle
                            </h1>
                            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                                Zarządzaj zadaniami cyklicznymi i monitoruj procesy w tle
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className={`h-2 w-2 rounded-full ${showError ? 'bg-red-500' : healthCheckPassed ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                {showError ? 'Błąd' : healthCheckPassed ? 'Aktywne' : 'Sprawdzanie...'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative min-h-[600px]">
                    {showLoading && (
                        <div className="absolute inset-0 bg-white dark:bg-zinc-900 flex items-center justify-center z-10">
                            <div className="text-center space-y-4">
                                <LoaderCircle className="w-8 h-8 text-primary animate-spin mx-auto" />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                    {healthCheckLoading ? 'Sprawdzanie dostępności...' : 'Ładowanie panelu zadań...'}
                                </p>
                            </div>
                        </div>
                    )}

                    {showError && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="p-8 text-center space-y-4">
                                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                                        Błąd ładowania panelu
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 mt-1">
                                        Nie udało się załadować panelu zadań w tle. Sprawdź połączenie lub spróbuj ponownie.
                                    </p>
                                    <button
                                        onClick={retryLoading}
                                        className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
                                    >
                                        Spróbuj ponownie
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {!showError && healthCheckPassed && (
                        <iframe
                            ref={iframeRef}
                            src="/admin/hangfire"
                            title="Hangfire Dashboard"
                            className="w-full border-0 bg-white dark:bg-zinc-900"
                            style={{ height: 'calc(100vh - 280px)', minHeight: '600px' }}
                            onLoad={handleIframeLoad}
                            onError={handleIframeError}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminBackgroundJobsManagementPage;