import React from 'react';
import { Button } from '@/components/ui/Button';
import { DisplayNameInput } from './DisplayNameInput';

interface ProfileSetupFormProps {
  displayName: string;
  onDisplayNameChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error?: string;
}

export const ProfileSetupForm = ({
  displayName,
  onDisplayNameChange,
  onSubmit,
  isLoading,
  error,
}: ProfileSetupFormProps) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="space-y-6">
          <DisplayNameInput
            value={displayName}
            onChange={onDisplayNameChange}
            error={error}
          />
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !displayName.trim()}
          className="h-10 px-6 text-base rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-sm hover:shadow transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-sm disabled:hover:translate-y-0"
          loading={isLoading}
        >
          Kontynuuj
        </Button>
      </div>
    </div>
  );
}; 