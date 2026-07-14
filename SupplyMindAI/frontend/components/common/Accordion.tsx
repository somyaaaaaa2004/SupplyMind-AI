"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils/cn";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  type?: "single" | "multiple";
}

export function Accordion({ items, className, type = "single" }: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type={type as "single"}
      collapsible={type === "single" ? true : undefined}
      className={cn("w-full space-y-2", className)}
    >
      {items.map((item, i) => (
        <AccordionPrimitive.Item
          key={i}
          value={`item-${i}`}
          className="rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#111827] overflow-hidden"
        >
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                "flex w-full items-center justify-between px-5 py-4 text-left",
                "text-sm font-medium text-[#F9FAFB] outline-none",
                "hover:bg-[#1F2937] transition-colors duration-150",
                "group"
              )}
            >
              <span className="flex items-center gap-3">
                {item.icon && (
                  <span className="h-4 w-4 text-[#9CA3AF] shrink-0">{item.icon}</span>
                )}
                {item.title}
              </span>
              <ChevronDown
                className="h-4 w-4 text-[#9CA3AF] transition-transform duration-200 group-data-[state=open]:rotate-180 shrink-0"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content
            className={cn(
              "overflow-hidden text-sm text-[#9CA3AF]",
              "data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            )}
          >
            <div className="px-5 pb-4 pt-0 border-t border-[rgba(255,255,255,0.06)]">
              <div className="pt-4">{item.content}</div>
            </div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
