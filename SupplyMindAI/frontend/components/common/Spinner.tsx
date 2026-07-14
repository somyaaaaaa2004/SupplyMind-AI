"use client";

import { cn } from "@/utils/cn";

export interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-[3px]",
};

export function Spinner({ size = "md", color, className }: SpinnerProps) {
  return (
    <span
      className={cn(
        "inline-block animate-spin rounded-full border-current border-t-transparent",
        sizeMap[size],
        className
      )}
      style={color ? { borderColor: color, borderTopColor: "transparent" } : undefined}
      role="status"
      aria-label="Loading"
    />
  );
}
