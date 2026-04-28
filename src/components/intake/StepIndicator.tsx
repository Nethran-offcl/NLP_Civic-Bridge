import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/Progress";

export function StepIndicator({
  steps,
  currentStep,
  onStepClick
}: {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}) {
  return (
    <div className="space-y-4">
      <Progress value={((currentStep + 1) / steps.length) * 100} />
      <ol className="grid grid-cols-5 gap-2">
        {steps.map((step, index) => (
          <li key={step} className="min-w-0">
            <button
              type="button"
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
              className={cn(
                "flex w-full min-h-11 items-center justify-center rounded-md border px-2 text-center text-xs font-semibold transition-colors disabled:cursor-default",
                index < currentStep && "border-brand-500 bg-brand-50 text-brand-600 hover:bg-brand-100 dark:border-brand-500 dark:bg-brand-900/50 dark:text-brand-100 dark:hover:bg-brand-900/70",
                index === currentStep && "border-brand-500 bg-white text-brand-600 shadow-sm dark:border-brand-500 dark:bg-brand-900 dark:text-brand-50 cursor-default",
                index > currentStep && "border-slate-200 bg-slate-50 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
              )}
            >
              {index < currentStep ? <Check className="h-4 w-4" /> : <span className="truncate">{step}</span>}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
