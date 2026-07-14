"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import { Spinner } from "./Spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090B] disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[#3B82F6] text-white hover:bg-[#2563EB] shadow-[0_0_20px_rgba(59,130,246,0.25)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]",
        secondary:
          "bg-[#1F2937] text-[#F9FAFB] border border-[rgba(255,255,255,0.08)] hover:bg-[#374151] hover:border-[rgba(255,255,255,0.15)] backdrop-blur-[16px]",
        ghost:
          "bg-transparent text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB]",
        danger:
          "bg-[#EF4444] text-white hover:bg-[#DC2626] shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_30px_rgba(239,68,68,0.35)]",
        success:
          "bg-[#22C55E] text-white hover:bg-[#16A34A] shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.35)]",
        outline:
          "bg-transparent text-[#F9FAFB] border border-[rgba(255,255,255,0.12)] hover:bg-[#1F2937] hover:border-[rgba(255,255,255,0.2)]",
      },
      size: {
        sm: "text-xs px-3 py-1.5 h-7",
        md: "text-sm px-4 py-2 h-9",
        lg: "text-base px-6 py-2.5 h-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      loading,
      disabled,
      leftIcon,
      rightIcon,
      onClick,
      type = "button",
      ...rest
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        onClick={onClick}
        whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
        transition={{ duration: 0.15 }}
        {...(rest as Record<string, unknown>)}
      >
        {loading ? (
          <Spinner size="sm" />
        ) : (
          leftIcon && <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
