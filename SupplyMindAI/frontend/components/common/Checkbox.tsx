"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/utils/cn";

export interface CheckboxProps {
  label?: string;
  name?: string;
  checked?: boolean | "indeterminate";
  onChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ label, name, checked, onChange, disabled, className }: CheckboxProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CheckboxPrimitive.Root
        id={name}
        name={name}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        className={cn(
          "h-4 w-4 shrink-0 rounded border border-[rgba(255,255,255,0.15)] bg-[#111827]",
          "transition-all duration-150 outline-none",
          "focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B]",
          "data-[state=checked]:bg-[#3B82F6] data-[state=checked]:border-[#3B82F6]",
          "data-[state=indeterminate]:bg-[#3B82F6] data-[state=indeterminate]:border-[#3B82F6]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:border-[rgba(255,255,255,0.3)]"
        )}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
          {checked === "indeterminate" ? (
            <Minus className="h-3 w-3" strokeWidth={3} />
          ) : (
            <Check className="h-3 w-3" strokeWidth={3} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <label
          htmlFor={name}
          className={cn(
            "text-sm text-[#F9FAFB] cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
