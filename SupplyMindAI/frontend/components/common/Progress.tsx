"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: "accent" | "success" | "warning" | "danger";
  showLabel?: boolean;
  label?: string;
  className?: string;
  height?: number;
}

const variantColors = {
  accent: "bg-[#3B82F6]",
  success: "bg-[#22C55E]",
  warning: "bg-[#F59E0B]",
  danger: "bg-[#EF4444]",
};

export function Progress({
  value,
  max = 100,
  variant = "accent",
  showLabel,
  label,
  className,
  height = 6,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("w-full", className)}>
      {(showLabel || label) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && <span className="text-xs text-[#9CA3AF]">{label}</span>}
          {showLabel && (
            <span className="text-xs font-medium text-[#F9FAFB]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className="w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]"
        style={{ height }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <motion.div
          className={cn("h-full rounded-full", variantColors[variant])}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
