"use client";

import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium rounded-full",
  {
    variants: {
      variant: {
        default: "bg-[rgba(255,255,255,0.08)] text-[#9CA3AF] border border-[rgba(255,255,255,0.08)]",
        primary: "bg-[rgba(59,130,246,0.15)] text-[#60A5FA] border border-[rgba(59,130,246,0.25)]",
        success: "bg-[rgba(34,197,94,0.12)] text-[#4ADE80] border border-[rgba(34,197,94,0.2)]",
        warning: "bg-[rgba(245,158,11,0.12)] text-[#FCD34D] border border-[rgba(245,158,11,0.2)]",
        danger: "bg-[rgba(239,68,68,0.12)] text-[#F87171] border border-[rgba(239,68,68,0.2)]",
        outline: "bg-transparent text-[#9CA3AF] border border-[rgba(255,255,255,0.12)]",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}

export function Badge({ children, variant, size, dot, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)}>
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            variant === "primary" && "bg-[#60A5FA] animate-[pulse-dot_1.5s_ease-in-out_infinite]",
            variant === "success" && "bg-[#4ADE80]",
            variant === "warning" && "bg-[#FCD34D]",
            variant === "danger" && "bg-[#F87171]",
            (!variant || variant === "default") && "bg-[#9CA3AF]",
            variant === "outline" && "bg-[#9CA3AF]"
          )}
        />
      )}
      {children}
    </span>
  );
}
