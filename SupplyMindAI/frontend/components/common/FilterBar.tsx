"use client";

import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

export interface FilterDef {
  key: string;
  label: string;
  type: "select" | "date" | "text";
  options?: { value: string; label: string }[];
}

export interface FilterBarProps {
  filters: FilterDef[];
  activeFilters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onClear: () => void;
}

export function FilterBar({ filters, activeFilters, onFilterChange, onClear }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const activeCount = Object.keys(activeFilters).filter((k) => activeFilters[k]).length;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Active filter chips */}
      <AnimatePresence>
        {Object.entries(activeFilters).map(([key, value]) => {
          if (!value) return null;
          const filterDef = filters.find((f) => f.key === key);
          if (!filterDef) return null;
          const optionLabel = filterDef.options?.find((o) => o.value === value)?.label ?? value;
          return (
            <motion.span
              key={key}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(59,130,246,0.15)] px-2.5 py-1 text-xs font-medium text-[#60A5FA] border border-[rgba(59,130,246,0.25)]"
            >
              <span className="text-[#9CA3AF]">{filterDef.label}:</span>
              {optionLabel}
              <button
                type="button"
                onClick={() => onFilterChange(key, "")}
                className="ml-0.5 rounded-full hover:text-white transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </motion.span>
          );
        })}
      </AnimatePresence>

      {/* Filter button with dropdown */}
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Filter className="h-3.5 w-3.5" />}
          rightIcon={<ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />}
          onClick={() => setOpen(!open)}
        >
          Filters
          {activeCount > 0 && (
            <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#3B82F6] text-[10px] text-white">
              {activeCount}
            </span>
          )}
        </Button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-2 z-50 w-64 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[rgba(17,24,39,0.98)] backdrop-blur-[16px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] p-3 space-y-3"
            >
              {filters.map((filter) => (
                <div key={filter.key}>
                  <label className="block text-xs text-[#9CA3AF] mb-1">{filter.label}</label>
                  {filter.type === "select" && filter.options ? (
                    <select
                      value={activeFilters[filter.key] || ""}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full rounded-lg bg-[#1F2937] border border-[rgba(255,255,255,0.08)] text-sm text-[#F9FAFB] px-2 py-1.5 outline-none focus:border-[#3B82F6]"
                    >
                      <option value="">All</option>
                      {filter.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={filter.type === "date" ? "date" : "text"}
                      value={activeFilters[filter.key] || ""}
                      onChange={(e) => onFilterChange(filter.key, e.target.value)}
                      className="w-full rounded-lg bg-[#1F2937] border border-[rgba(255,255,255,0.08)] text-sm text-[#F9FAFB] px-2 py-1.5 outline-none focus:border-[#3B82F6]"
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end pt-1">
                <Button variant="ghost" size="sm" onClick={() => { onClear(); setOpen(false); }}>
                  Clear all
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Clear all */}
      {activeCount > 0 && (
        <Button variant="ghost" size="sm" onClick={onClear} leftIcon={<X className="h-3.5 w-3.5" />}>
          Clear all
        </Button>
      )}
    </div>
  );
}
