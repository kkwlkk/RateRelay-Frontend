import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Settings } from 'lucide-react';
import { ProfileSetupFormField } from './ProfileSetupFormField';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

export const profileSetupSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Nazwa wyświetlana jest wymagana')
    .min(2, 'Nazwa musi mieć co najmniej 3 znaki')
    .max(50, 'Nazwa nie może być dłuższa niż 64 znaki')
    .regex(
      /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s\-_\.]+$/,
      'Nazwa może zawierać tylko litery, cyfry, spacje oraz znaki: - _ .'
    )
    .refine((val) => val.trim().length > 0, 'Nazwa nie może składać się tylko z białych znaków'),
});

export type ProfileSetupFormData = z.infer<typeof profileSetupSchema>;

interface ProfileSetupFormProps {
  onSubmit: (data: ProfileSetupFormData) => void;
  isLoading: boolean;
  defaultValues?: Partial<ProfileSetupFormData>;
}

export const ProfileSetupForm = ({
  onSubmit,
  isLoading,
  defaultValues = {},
}: ProfileSetupFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields }
  } = useForm<ProfileSetupFormData>({
    resolver: zodResolver(profileSetupSchema),
    defaultValues,
    mode: 'onChange',
  });

  const watchedDisplayName = watch('displayName');
  const isFieldValid = dirtyFields.displayName && isValid && !errors.displayName;

  const onFormSubmit = (data: ProfileSetupFormData) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
              <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Podstawowe informacje
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Skonfiguruj swój profil użytkownika
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6">
          <ProfileSetupFormField
            register={register}
            error={errors.displayName}
            isValid={isFieldValid}
            value={watchedDisplayName}
          />

          <div className="flex justify-end pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading || !isValid}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:cursor-not-allowed flex items-center gap-2 min-w-[120px] justify-center"
            >
              Kontynuuj
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};