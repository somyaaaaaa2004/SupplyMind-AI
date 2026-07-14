"use client";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/utils/cn";

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  pageSizeOptions?: number[];
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export function Pagination({ page, pageSize, total, onChange, pageSizeOptions = [10, 25, 50, 100] }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const start = Math.min((page - 1) * pageSize + 1, total);
  const end = Math.min(page * pageSize, total);
  const pages = getPageNumbers(page, totalPages);

  const btnBase = cn(
    "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors duration-150",
    "border border-[rgba(255,255,255,0.06)] text-[#9CA3AF]",
    "hover:bg-[#1F2937] hover:text-[#F9FAFB] hover:border-[rgba(255,255,255,0.12)]",
    "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-[#9CA3AF]">
        Showing <span className="text-[#F9FAFB] font-medium">{start}–{end}</span> of{" "}
        <span className="text-[#F9FAFB] font-medium">{total}</span> items
      </p>

      <div className="flex items-center gap-1.5">
        <button className={btnBase} onClick={() => onChange(1, pageSize)} disabled={page === 1}>
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button className={btnBase} onClick={() => onChange(page - 1, pageSize)} disabled={page === 1}>
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="w-8 text-center text-sm text-[#6B7280]">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number, pageSize)}
              className={cn(
                btnBase,
                page === p && "bg-[#3B82F6] text-white border-[#3B82F6] hover:bg-[#2563EB] hover:border-[#2563EB] hover:text-white"
              )}
            >
              {p}
            </button>
          )
        )}

        <button className={btnBase} onClick={() => onChange(page + 1, pageSize)} disabled={page === totalPages}>
          <ChevronRight className="h-4 w-4" />
        </button>
        <button className={btnBase} onClick={() => onChange(totalPages, pageSize)} disabled={page === totalPages}>
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm text-[#9CA3AF]">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => onChange(1, Number(e.target.value))}
          className="h-8 rounded-md bg-[#1F2937] border border-[rgba(255,255,255,0.08)] text-sm text-[#F9FAFB] px-2 outline-none focus:border-[#3B82F6]"
        >
          {pageSizeOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
