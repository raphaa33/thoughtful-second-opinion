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
              className={`h-14 w-14 rounded-full flex items-center justify-center shadow-sm border-2 transition-all duration-300 ${
                i + 1 === currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : i + 1 < currentStep
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-background border-muted-foreground/25 text-muted-foreground"
              }`}
            >
              {i + 1 < currentStep ? (
                <Check className="h-6 w-6 stroke-[3]" />
              ) : (
                <span className="text-lg font-semibold">{i + 1}</span>
              )}
            </div>
            <span 
              className={`text-sm mt-3 max-w-[120px] text-center font-medium transition-colors duration-300 ${
                i + 1 === currentStep
                  ? "text-primary"
                  : i + 1 < currentStep
                  ? "text-primary/80"
                  : "text-muted-foreground/70"
              }`}
            >
              {stepTitles[i]}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className="relative h-[2px] w-24 mx-4 mt-[-20px] bg-muted-foreground/20">
              <div 
                className={`absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-in-out`}
                style={{
                  width: currentStep > 1 && i === 0 ? '100%' : i + 1 < currentStep ? '100%' : '0%'
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};