"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 text-xs px-3",
  md: "h-10 text-sm px-3",
  lg: "h-12 text-base px-4",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      name,
      error,
      helperText,
      startIcon,
      endIcon,
      inputSize = "md",
      disabled,
      required,
      className,
      ...rest
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={name}
            className={cn(
              "block text-sm font-medium transition-colors duration-150",
              focused ? "text-[#3B82F6]" : "text-[#9CA3AF]",
              disabled && "opacity-50"
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-[#EF4444]">*</span>}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {startIcon}
            </span>
          )}
          <input
            ref={ref}
            id={name}
            name={name}
            disabled={disabled}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "w-full rounded-lg bg-[#111827] text-[#F9FAFB] placeholder-[#6B7280]",
              "border border-[rgba(255,255,255,0.08)] outline-none",
              "transition-all duration-200",
              "focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              sizeClasses[inputSize],
              startIcon && "pl-10",
              endIcon && "pr-10",
              error && "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : helperText ? `${name}-helper` : undefined}
            {...rest}
          />
          {endIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
              {endIcon}
            </span>
          )}
        </div>
        {error && (
          <p id={`${name}-error`} className="flex items-center gap-1 text-xs text-[#EF4444]">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${name}-helper`} className="text-xs text-[#6B7280]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
