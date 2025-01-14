import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  const stepTitles = [
    "Start Your Second Opinion",
    "Customise Your Response",
    "Finalize Your Request",
    "Result"
  ];

  return (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center ${
                i + 1 === currentStep
                  ? "bg-primary text-primary-foreground"
                  : i + 1 < currentStep
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1 < currentStep ? (
                <Check className="h-6 w-6" />
              ) : (
                <span className="text-lg font-semibold">{i + 1}</span>
              )}
            </div>
            <span className={`text-sm mt-2 max-w-[120px] text-center ${
              i + 1 === currentStep
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}>
              {stepTitles[i]}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className="relative h-[2px] w-24 mx-4 mt-[-20px] bg-secondary">
              <div 
                className={`absolute top-0 left-0 h-full bg-primary/20 transition-all duration-300 ease-in-out`}
                style={{
                  width: i + 1 < currentStep ? '100%' : '0%'
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};