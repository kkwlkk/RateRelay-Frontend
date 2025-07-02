import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between px-2 sm:px-0">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative group">
              <div
                className={cn(
                  'flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 font-medium text-sm',
                  'transition-all duration-200 ease-in-out',
                  currentStep > index
                    ? 'border-blue-500 bg-blue-500 text-white shadow-sm'
                    : currentStep === index
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 ring-2 ring-blue-100 dark:ring-blue-900/30'
                    : 'border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500'
                )}
              >
                {currentStep > index ? (
                  <Check className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <span className="text-xs sm:text-sm">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center max-w-[80px] sm:max-w-[100px]">
                <p
                  className={cn(
                    'text-xs sm:text-sm font-medium transition-colors duration-200',
                    currentStep >= index
                      ? 'text-zinc-900 dark:text-zinc-100'
                      : 'text-zinc-500 dark:text-zinc-400'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className={cn(
                    'mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-normal transition-colors duration-200',
                    currentStep >= index && 'text-zinc-600 dark:text-zinc-300'
                  )}>
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-3 sm:mx-4 flex items-center">
                <div
                  className={cn(
                    'h-0.5 w-full transition-colors duration-200',
                    currentStep > index 
                      ? 'bg-blue-500' 
                      : 'bg-zinc-200 dark:bg-zinc-700'
                  )}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};