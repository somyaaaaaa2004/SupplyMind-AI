"use client";

import { cn } from "@/utils/cn";

export interface DividerProps {
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Divider({ label, orientation = "horizontal", className }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("mx-2 self-stretch w-px bg-[rgba(255,255,255,0.06)]", className)}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-3 my-4", className)}>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
        <span className="text-xs text-[#6B7280] shrink-0">{label}</span>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.06)]" />
      </div>
    );
  }

  return (
    <div
      className={cn("h-px w-full bg-[rgba(255,255,255,0.06)] my-4", className)}
    />
  );
}
