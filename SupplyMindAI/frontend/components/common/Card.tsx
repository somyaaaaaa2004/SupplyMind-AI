"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
}

export function Card({ children, className, glass, hover }: CardProps) {
  const base = cn(
    "rounded-xl border transition-all duration-200",
    glass
      ? "backdrop-blur-[16px] bg-[rgba(17,24,39,0.8)] border-[rgba(255,255,255,0.06)]"
      : "bg-[#111827] border-[rgba(255,255,255,0.06)]",
    hover && "cursor-pointer hover:border-[rgba(255,255,255,0.12)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5",
    className
  );

  if (hover) {
    return (
      <motion.div
        className={base}
        whileHover={{ y: -2, boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={base}>{children}</div>;
}

export interface CardHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, subtitle, actions, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 px-6 py-4 border-b border-[rgba(255,255,255,0.06)]", className)}>
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-[#F9FAFB] truncate">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-[#9CA3AF]">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return <div className={cn("px-6 py-4", className)}>{children}</div>;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={cn("flex items-center justify-end gap-2 px-6 py-4 border-t border-[rgba(255,255,255,0.06)]", className)}>
      {children}
    </div>
  );
}
