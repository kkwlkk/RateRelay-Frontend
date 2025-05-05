import React from 'react';
import { Input } from '@/components/ui/input';

interface DisplayNameInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const DisplayNameInput = ({ value, onChange, error }: DisplayNameInputProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="displayName" className="block text-base font-medium text-gray-900">
        Nazwa wyświetlana
      </label>
      <Input
        id="displayName"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Jak chcesz być znany na TrustRate"
        className={`h-10 text-base rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 transition-all duration-200 bg-white text-gray-900 ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''
        }`}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-sm text-gray-500">
      Dowolna nazwa, której będziemy używać, aby się do Ciebie zwracać. Może to być imię, pseudonim lub cokolwiek chcesz. Nie będzie publicznie widoczna.
      </p>
    </div>
  );
}; 