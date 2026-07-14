"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/utils/cn";

export interface SwitchProps {
  label?: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function Switch({ label, name, checked, onChange, disabled, className }: SwitchProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {label && (
        <label
          htmlFor={name}
          className={cn("text-sm text-[#F9FAFB] cursor-pointer select-none", disabled && "opacity-50 cursor-not-allowed")}
        >
          {label}
        </label>
      )}
      <SwitchPrimitive.Root
        id={name}
        name={name}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full",
          "border-2 border-transparent transition-colors duration-200",
          "bg-[rgba(255,255,255,0.1)] data-[state=checked]:bg-[#3B82F6]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg",
            "transition-transform duration-200",
            "translate-x-0 data-[state=checked]:translate-x-5"
          )}
        />
      </SwitchPrimitive.Root>
    </div>
  );
}
