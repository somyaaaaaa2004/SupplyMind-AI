"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { Checkbox } from "./Checkbox";
import { LoadingSkeleton } from "./LoadingSkeleton";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyState?: React.ReactNode;
  selectable?: boolean;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  loading,
  emptyState,
  selectable,
  onRowClick,
  className,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    if (av === bv) return 0;
    const cmp = av! < bv! ? -1 : 1;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const toggleRow = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === data.length) setSelected(new Set());
    else setSelected(new Set(data.map((_, i) => i)));
  };

  return (
    <div className={cn("w-full overflow-auto", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[rgba(255,255,255,0.06)]">
            {selectable && (
              <th className="w-10 px-4 py-3">
                <Checkbox
                  checked={selected.size === data.length && data.length > 0 ? true : selected.size > 0 ? "indeterminate" : false}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  "px-4 py-3 text-left font-medium text-[#9CA3AF] whitespace-nowrap",
                  col.sortable && "cursor-pointer select-none hover:text-[#F9FAFB] transition-colors"
                )}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && (
                    <span className="text-[#6B7280]">
                      {sortKey === col.key ? (
                        sortDir === "asc" ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5" />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-[rgba(255,255,255,0.04)]">
                {selectable && <td className="px-4 py-3"><div className="h-4 w-4 rounded bg-[rgba(255,255,255,0.06)] animate-shimmer" /></td>}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-4 rounded bg-[rgba(255,255,255,0.06)] animate-shimmer" style={{ width: `${60 + Math.random() * 40}%` }} />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12">
                {emptyState ?? (
                  <div className="flex flex-col items-center justify-center gap-2 text-[#6B7280]">
                    <span className="text-sm">No data available</span>
                  </div>
                )}
              </td>
            </tr>
          ) : (
            sortedData.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={cn(
                  "border-b border-[rgba(255,255,255,0.04)] transition-colors duration-100",
                  onRowClick && "cursor-pointer hover:bg-[#1F2937]",
                  selected.has(i) && "bg-[rgba(59,130,246,0.05)]",
                  i % 2 === 0 ? "" : "bg-[rgba(255,255,255,0.01)]"
                )}
              >
                {selectable && (
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={selected.has(i)} onChange={() => toggleRow(i)} />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-[#F9FAFB]">
                    {col.render
                      ? col.render(row[col.key], row, i)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
