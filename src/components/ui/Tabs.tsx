"use client";

import { cn } from "@/lib/utils";

export function Tabs<T extends string>({
  value,
  options,
  onChange,
  className
}: {
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div className={cn("inline-flex rounded-md bg-slate-100 dark:bg-slate-800 p-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "min-h-10 rounded px-3 text-sm font-semibold transition",
            value === option.value 
              ? "bg-white dark:bg-slate-700 text-slate-950 dark:text-white shadow-sm" 
              : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
