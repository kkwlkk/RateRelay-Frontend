import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { AlertTriangle, User, CheckCircle } from 'lucide-react';
import { ProfileSetupFormData } from './ProfileSetupForm';

interface ProfileSetupFormFieldProps {
    register: UseFormRegister<ProfileSetupFormData>;
    error?: FieldError;
    isValid?: boolean;
    value?: string;
}

export const ProfileSetupFormField = ({
    register,
    error,
    isValid = false,
    value = ''
}: ProfileSetupFormFieldProps) => {
    const hasValue = value && value.trim().length > 0;
    const showSuccess = hasValue && isValid && !error;

    return (
        <div className="space-y-3">
            <label htmlFor="displayName" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Nazwa wyświetlana
            </label>

            <div className="relative">
                <Input
                    id="displayName"
                    placeholder="Jak chcesz być znany na TrustRate"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    data-1p-ignore="true"
                    data-lpignore="true"
                    data-form-type="other"
                    {...register('displayName')}
                    className={`pl-10 pr-10 border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors ${error
                        ? 'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500'
                        : showSuccess
                            ? 'border-green-300 dark:border-green-700 focus:border-green-500 focus:ring-green-500'
                            : ''
                        }`}
                />

                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <User className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                </div>

                {showSuccess && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                )}
            </div>

            {error && (
                <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{error.message}</p>
                </div>
            )}

            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    <strong>Wskazówki:</strong> Może to być imię, pseudonim lub dowolna nazwa.
                    Nie będzie publicznie widoczna - używamy jej tylko do komunikacji z Tobą.
                </p>
            </div>
        </div>
    );
};