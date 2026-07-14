"use client";

import { forwardRef, TextareaHTMLAttributes, useRef, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/utils/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoResize?: boolean;
  rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, name, error, helperText, autoResize, rows = 4, disabled, required, className, onChange, ...rest }, ref) => {
    const innerRef = useRef<HTMLTextAreaElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLTextAreaElement>) || innerRef;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && resolvedRef.current) {
        resolvedRef.current.style.height = "auto";
        resolvedRef.current.style.height = `${resolvedRef.current.scrollHeight}px`;
      }
      onChange?.(e);
    };

    useEffect(() => {
      if (autoResize && resolvedRef.current) {
        resolvedRef.current.style.height = "auto";
        resolvedRef.current.style.height = `${resolvedRef.current.scrollHeight}px`;
      }
    }, [autoResize, resolvedRef]);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={name} className={cn("block text-sm font-medium text-[#9CA3AF]", disabled && "opacity-50")}>
            {label}
            {required && <span className="ml-0.5 text-[#EF4444]">*</span>}
          </label>
        )}
        <textarea
          ref={resolvedRef}
          id={name}
          name={name}
          rows={rows}
          disabled={disabled}
          onChange={handleChange}
          className={cn(
            "w-full rounded-lg bg-[#111827] text-[#F9FAFB] placeholder-[#6B7280]",
            "border border-[rgba(255,255,255,0.08)] outline-none",
            "px-3 py-2.5 text-sm resize-none transition-all duration-200",
            "focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]",
            autoResize && "overflow-hidden",
            className
          )}
          aria-invalid={!!error}
          {...rest}
        />
        {error && (
          <p className="flex items-center gap-1 text-xs text-[#EF4444]">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[#6B7280]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
