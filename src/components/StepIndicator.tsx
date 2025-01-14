import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`h-8 w-8 rounded-full flex items-center justify-center ${
              i + 1 === currentStep
                ? "bg-primary text-primary-foreground"
                : i + 1 < currentStep
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            }`}
          >
            {i + 1 < currentStep ? (
              <Check className="h-4 w-4" />
            ) : (
              <span className="text-sm">{i + 1}</span>
            )}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`h-1 w-12 mx-2 ${
                i + 1 < currentStep ? "bg-primary/20" : "bg-secondary"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};