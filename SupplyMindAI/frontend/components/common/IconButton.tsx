"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Tooltip } from "./Tooltip";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:opacity-50 disabled:pointer-events-none shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-[#3B82F6] text-white hover:bg-[#2563EB] shadow-[0_0_15px_rgba(59,130,246,0.3)]",
        secondary: "bg-[#1F2937] text-[#F9FAFB] border border-[rgba(255,255,255,0.08)] hover:bg-[#374151]",
        ghost: "bg-transparent text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB]",
        danger: "bg-[rgba(239,68,68,0.12)] text-[#F87171] hover:bg-[rgba(239,68,68,0.2)]",
        success: "bg-[rgba(34,197,94,0.12)] text-[#4ADE80] hover:bg-[rgba(34,197,94,0.2)]",
        outline: "bg-transparent text-[#F9FAFB] border border-[rgba(255,255,255,0.12)] hover:bg-[#1F2937]",
      },
      size: {
        sm: "h-7 w-7",
        md: "h-9 w-9",
        lg: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  tooltip?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, tooltip, className, variant, size, ...rest }, ref) => {
    const btn = (
      <motion.button
        ref={ref}
        className={cn(iconButtonVariants({ variant, size }), className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.15 }}
        {...(rest as Record<string, unknown>)}
      >
        {icon}
      </motion.button>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{btn}</Tooltip>;
    }

    return btn;
  }
);

IconButton.displayName = "IconButton";
