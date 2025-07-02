import React from 'react';
import { Input } from '@/components/ui/input';
import { AlertTriangle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DisplayNameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const DisplayNameInput = ({ value, onChange, error }: DisplayNameInputProps) => {
  return (
    <div className="space-y-3">
      <label htmlFor="displayName" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Nazwa wyświetlana
      </label>
      <div className="relative">
        <Input
          id="displayName"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Jak chcesz być znany na TrustRate"
          className={cn(
            'pl-10 border-zinc-200 dark:border-zinc-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100',
            {
              'border-red-300 dark:border-red-700 focus:border-red-500 focus:ring-red-500': error,
            }
          )}
          autoComplete='off'
          type='text'
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <User className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertTriangle className="h-4 w-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3 border border-zinc-200 dark:border-zinc-700">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Dowolna nazwa, której będziemy używać, aby się do Ciebie zwracać. Może to być imię, pseudonim lub cokolwiek chcesz. Nie będzie publicznie widoczna.
        </p>
      </div>
    </div>
  );
};