import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { id: 1, name: 'Bird Type' },
  { id: 2, name: 'Quantity' },
  { id: 3, name: 'Your Details' },
  { id: 4, name: 'Summary' },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex space-x-4 md:space-x-8">
        {steps.map((step, index) => (
          <li key={step.name} className="flex-1">
            {currentStep > step.id ? (
              <div className="group flex w-full flex-col border-t-4 border-primary pt-2 transition-colors">
                <span className="text-sm font-medium text-primary transition-colors">
                  {`Step ${step.id}`}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : currentStep === step.id ? (
              <div
                className="flex w-full flex-col border-t-4 border-primary pt-2"
                aria-current="step"
              >
                <span className="text-sm font-medium text-primary">
                  {`Step ${step.id}`}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            ) : (
              <div className="group flex w-full flex-col border-t-4 border-border pt-2 transition-colors">
                <span className="text-sm font-medium text-muted-foreground transition-colors">
                  {`Step ${step.id}`}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
