"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { cn } from "@/utils/cn";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  name?: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function Select({
  label,
  name,
  options,
  placeholder = "Select an option",
  error,
  disabled,
  value,
  onValueChange,
  className,
}: SelectProps) {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label htmlFor={name} className={cn("block text-sm font-medium text-[#9CA3AF]", disabled && "opacity-50")}>
          {label}
        </label>
      )}
      <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <SelectPrimitive.Trigger
          id={name}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-lg px-3 text-sm",
            "bg-[#111827] border border-[rgba(255,255,255,0.08)] text-[#F9FAFB]",
            "outline-none transition-all duration-200",
            "focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.15)]",
            "hover:border-[rgba(255,255,255,0.15)]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "data-[placeholder]:text-[#6B7280]",
            error && "border-[#EF4444]"
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="h-4 w-4 text-[#6B7280]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              "relative z-50 min-w-[8rem] overflow-hidden rounded-lg",
              "bg-[rgba(17,24,39,0.98)] backdrop-blur-[16px]",
              "border border-[rgba(255,255,255,0.08)]",
              "shadow-[0_10px_40px_rgba(0,0,0,0.6)]",
              "data-[state=open]:animate-in data-[state=closed]:animate-out",
              "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
              "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
            )}
            position="popper"
            sideOffset={4}
          >
            <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center text-[#9CA3AF]">
              <ChevronUp className="h-4 w-4" />
            </SelectPrimitive.ScrollUpButton>
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm",
                    "text-[#F9FAFB] outline-none",
                    "hover:bg-[#1F2937] focus:bg-[#1F2937]",
                    "data-[highlighted]:bg-[#1F2937]",
                    "data-[state=checked]:text-[#3B82F6]"
                  )}
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-3">
                    <Check className="h-4 w-4 text-[#3B82F6]" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
            <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center text-[#9CA3AF]">
              <ChevronDown className="h-4 w-4" />
            </SelectPrimitive.ScrollDownButton>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && (
        <p className="flex items-center gap-1 text-xs text-[#EF4444]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
