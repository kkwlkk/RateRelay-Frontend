import React from 'react';
import { User } from 'lucide-react';

export const ProfileSetupHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
        <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
        Ustaw swój profil
      </h1>
      <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
        Dostosuj swój profil na TrustRate, aby rozpocząć korzystanie z platformy
      </p>
    </div>
  );
};