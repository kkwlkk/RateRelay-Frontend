import React from 'react';
import { cn } from '@/lib/utils';

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
                  'flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border-2 font-medium text-xs',
                  'transition-all duration-300 ease-in-out transform',
                  'hover:scale-105 active:scale-95',
                  currentStep > index
                    ? 'border-primary bg-primary text-white'
                    : currentStep === index
                    ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
                    : 'border-gray-300 bg-gray-50 text-gray-400 group-hover:border-gray-400'
                )}
              >
                {index + 1}
              </div>
              <div className="mt-1 text-center max-w-[80px] sm:max-w-[100px]">
                <p
                  className={cn(
                    'text-[10px] sm:text-xs font-medium tracking-wide transition-colors duration-300',
                    'group-hover:text-gray-900',
                    currentStep >= index
                      ? 'text-gray-800'
                      : 'text-gray-500'
                  )}
                >
                  {step.label}
                </p>
                {step.description && (
                  <p className="mt-1 text-[10px] sm:text-xs text-gray-500 font-normal tracking-normal transition-colors duration-300 group-hover:text-gray-600">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-0.5 flex-1 mx-2 sm:mx-3 transition-colors duration-300',
                  currentStep > index ? 'bg-primary' : 'bg-gray-200'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
