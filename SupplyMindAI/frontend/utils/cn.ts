import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names intelligently.
 * Uses `clsx` for conditional classes and `tailwind-merge` to resolve conflicts.
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-brand-600", "text-white")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
