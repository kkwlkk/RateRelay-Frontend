'use client';

import { User, Globe, Save, X, Check, AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiService } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSettingsSchema = z.object({
    displayName: z.string()
        .min(2, 'Wyświetlana nazwa musi mieć co najmniej 2 znaki')
        .max(50, 'Wyświetlana nazwa nie może przekraczać 50 znaków')
        .trim(),
    darkMode: z.boolean(),
});

type UserSettingsForm = z.infer<typeof userSettingsSchema>;

const UserSettingsPage = () => {
    const { data: session, status } = useSession();
    const queryClient = useQueryClient();

    const {
        data: userProfile,
        isLoading: userProfileLoading,
        isError: userProfileError
    } = useQuery({
        queryKey: ['userProfile', session?.accessToken],
        queryFn: async () => (await apiService.getAccount()).data,
        enabled: !!session?.accessToken && status === 'authenticated',
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isDirty, isSubmitting }
    } = useForm<UserSettingsForm>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            displayName: userProfile?.displayName,
            darkMode: false,
        },
    });

    const watchedValues = watch();

    const updateSettingsMutation = useMutation({
        mutationFn: async (updatedSettings: Partial<UserSettingsForm>) => {
            await apiService.updateAccountSettings(updatedSettings);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            reset({
                displayName: watchedValues.displayName,
                darkMode: watchedValues.darkMode,
            });
        },
        onError: (error: unknown) => {
            console.error('Failed to update settings:', error);
        }
    });

    const onSubmit = (data: UserSettingsForm) => {
        const changedSettings: Partial<UserSettingsForm> = {};

        if (data.displayName !== userProfile?.googleUsername) {
            changedSettings.displayName = data.displayName;
        }

        if (Object.keys(changedSettings).length > 0) {
            updateSettingsMutation.mutate(changedSettings);
        }
    };

    const handleCancel = () => {
        reset();
    };

    const isLoading = userProfileLoading || isSubmitting;

    if (userProfileError) {
        return (
            <div className="p-4">
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Wystąpił błąd podczas ładowania profilu użytkownika. Spróbuj odświeżyć stronę.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto'>
            <div className="mb-10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                        <Settings className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-zinc-100">Ustawienia</h1>
                </div>
                <p className="text-gray-600 dark:text-zinc-400 text-lg ml-13">
                    Zarządzaj swoim kontem i preferencjami aplikacji
                </p>
            </div>

            {updateSettingsMutation.isError && (
                <Alert variant="destructive" className="mb-6">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                        Nie udało się zapisać ustawień. Spróbuj ponownie.
                    </AlertDescription>
                </Alert>
            )}

            {updateSettingsMutation.isSuccess && (
                <Alert className="mb-6 border-green-200 bg-green-50 dark:bg-green-900/20">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertDescription className="text-green-800 dark:text-green-200">
                        Ustawienia zostały pomyślnie zapisane.
                    </AlertDescription>
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card className="border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-700/2 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="border-b border-gray-100 dark:border-zinc-700 bg-gray-50/20 dark:bg-zinc-700/10">
                        <CardTitle className="flex items-center text-xl text-gray-900 dark:text-zinc-100">
                            <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 mr-4">
                                <User className="w-5 h-5 text-blue-700 dark:text-blue-400" />
                            </div>
                            <div>
                                <div className="text-xl font-semibold">Profil użytkownika</div>
                                <div className="text-sm text-gray-500 dark:text-zinc-400 font-normal mt-0.5">
                                    Podstawowe informacje o Twoim koncie
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-8">
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="space-y-3">
                                            <Label htmlFor="officialUsername" className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                                Oficjalna nazwa użytkownika
                                            </Label>
                                            <Input
                                                id="officialUsername"
                                                type="text"
                                                value={userProfile?.googleUsername || ''}
                                                className="h-11 bg-gray-100 dark:bg-zinc-700/20 border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-zinc-400 cursor-not-allowed"
                                                disabled
                                            />
                                            <p className="text-xs text-gray-500 dark:text-zinc-500">
                                                Synchronizowane z kontem Google
                                            </p>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs" side="top">
                                        Ta nazwa pochodzi z Twojego konta Google i nie może być zmieniona w ustawieniach.
                                    </TooltipContent>
                                </Tooltip>

                                <div className="space-y-3">
                                    <Label htmlFor="displayName" className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                        Wyświetlana nazwa <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        id="displayName"
                                        {...register('displayName')}
                                        className={`h-11 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-zinc-100 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 ${errors.displayName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                                        disabled={isLoading}
                                        placeholder="Wprowadź swoją wyświetlaną nazwę"
                                    />
                                    {errors.displayName && (
                                        <p className="text-red-600 dark:text-red-400 text-sm flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.displayName.message}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 dark:text-zinc-500">
                                        Ta nazwa będzie widoczna dla innych użytkowników
                                    </p>
                                </div>
                            </div>

                            <Tooltip>
                                <TooltipTrigger asChild className=''>
                                    <div className="space-y-3 w-full lg:max-w-md">
                                        <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-zinc-300">
                                            Adres e-mail
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={userProfile?.email || ''}
                                            className="h-11 bg-gray-100 dark:bg-zinc-700/20 border-gray-200 dark:border-zinc-600 text-gray-600 dark:text-zinc-400 cursor-not-allowed"
                                            disabled
                                        />
                                        <p className="text-xs text-gray-500 dark:text-zinc-500">
                                            Powiązany z kontem Google
                                        </p>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs" side="top">
                                    Adres e-mail jest powiązany z Twoim kontem i nie może być zmieniony w ustawieniach.
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-700/2 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="border-b border-gray-100 dark:border-zinc-700 bg-gray-50/20 dark:bg-zinc-700/10">
                        <CardTitle className="flex items-center text-xl text-gray-900 dark:text-zinc-100">
                            <div className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700/20 mr-4">
                                <Globe className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                            </div>
                            <div>
                                <div className="text-xl font-semibold">Preferencje aplikacji</div>
                                <div className="text-sm text-gray-500 dark:text-zinc-400 font-normal mt-0.5">
                                    Personalizacja wyglądu i zachowania
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="p-8">
                        <div className="bg-gray-50 dark:bg-zinc-800/30 rounded-lg p-6 text-center border border-gray-200 dark:border-zinc-600">
                            <Globe className="w-12 h-12 text-gray-400 dark:text-zinc-500 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900 dark:text-zinc-100 mb-2">
                                Funkcje w przygotowaniu
                            </h3>
                            <p className="text-gray-600 dark:text-zinc-400 text-sm max-w-md mx-auto">
                                Opcje personalizacji i dodatkowe ustawienia będą dostępne w kolejnych aktualizacjach aplikacji.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end space-x-3">
                    <Button
                        className="h-11 px-6 text-gray-700 dark:text-zinc-300 border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700"
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading || !isDirty}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Anuluj
                    </Button>
                    <Button
                        className="h-11 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white disabled:opacity-50"
                        loading={isLoading || updateSettingsMutation.isPending}
                        disabled={isLoading || !isDirty}
                        type="submit"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Zapisz zmiany
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserSettingsPage;