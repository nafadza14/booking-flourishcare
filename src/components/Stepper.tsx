import { Check } from "lucide-react";
import { cn } from "../lib/utils";

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: StepperProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full h-1.5 bg-brand-border/30 overflow-hidden">
      <div
        className="h-full bg-brand-progress transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function StepIndicator({ currentStep, totalSteps }: StepperProps) {
  const steps = [
    { id: 1, label: "Profil" },
    { id: 2, label: "Jadwal" },
    { id: 3, label: "Bayar" },
  ];

  return (
    <div className="flex items-center justify-center space-x-4 mb-6">
      {steps.map((step) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
              step.id < currentStep
                ? "bg-brand-success text-white"
                : step.id === currentStep
                ? "bg-brand-orange text-white ring-4 ring-brand-orange/20"
                : "bg-brand-border/40 text-brand-gray"
            )}
          >
            {step.id < currentStep ? <Check size={16} /> : step.id}
          </div>
          {step.id < totalSteps && (
            <div
              className={cn(
                "w-8 h-[2px] ml-4 transition-all",
                step.id < currentStep ? "bg-brand-success" : "bg-brand-border/40"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
