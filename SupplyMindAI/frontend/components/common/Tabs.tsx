"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/utils/cn";

export interface TabItem {
  label: string;
  value: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "underline" | "pill";
  className?: string;
}

export function Tabs({ items, defaultValue, value, onChange, variant = "underline", className }: TabsProps) {
  const defaultVal = defaultValue || items[0]?.value;

  return (
    <TabsPrimitive.Root
      defaultValue={defaultVal}
      value={value}
      onValueChange={onChange}
      className={cn("w-full", className)}
    >
      <TabsPrimitive.List
        className={cn(
          "flex items-center gap-1",
          variant === "underline"
            ? "border-b border-[rgba(255,255,255,0.06)] pb-0"
            : "bg-[#0F172A] rounded-lg p-1 w-fit"
        )}
      >
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "relative flex items-center gap-2 text-sm font-medium outline-none transition-colors duration-150",
              variant === "underline"
                ? [
                    "px-4 py-2.5 text-[#9CA3AF] hover:text-[#F9FAFB]",
                    "data-[state=active]:text-[#F9FAFB]",
                    "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-transparent",
                    "data-[state=active]:after:bg-[#3B82F6]",
                  ]
                : [
                    "px-3 py-1.5 rounded-md text-[#9CA3AF] hover:text-[#F9FAFB]",
                    "data-[state=active]:text-[#F9FAFB] data-[state=active]:bg-[#1F2937]",
                  ]
            )}
          >
            {item.icon && <span className="h-4 w-4">{item.icon}</span>}
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {items.map((item) => (
        <TabsPrimitive.Content
          key={item.value}
          value={item.value}
          className="mt-4 outline-none"
        >
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
