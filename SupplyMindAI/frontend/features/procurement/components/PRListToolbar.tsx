'use client';

import React from 'react';
import { Download, Plus, FileSpreadsheet, FileText } from 'lucide-react';
import { PR_STATUS_OPTIONS, URGENCY_OPTIONS } from '../constants';
import type { PRFilters } from '../types';

interface PRListToolbarProps {
  filters: PRFilters;
  onFilterChange: (filters: Partial<PRFilters>) => void;
  onNewRequest: () => void;
  onExport: (format: 'pdf' | 'excel') => void;
}

export function PRListToolbar({
  filters,
  onFilterChange,
  onNewRequest,
  onExport,
}: PRListToolbarProps) {
  const [showExport, setShowExport] = React.useState(false);
  const exportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExport(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search requests..."
            value={filters.search ?? ''}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="h-9 w-full rounded-lg border border-white/10 bg-[#111827] pl-9 pr-3 text-sm text-[#F9FAFB] placeholder-[#6B7280] focus:border-[#3B82F6] focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
          />
        </div>

        {/* Status Filter */}
        <select
          value={filters.status ?? ''}
          onChange={(e) => onFilterChange({ status: e.target.value })}
          className="h-9 rounded-lg border border-white/10 bg-[#111827] px-3 text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"
        >
          {PR_STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Urgency Filter */}
        <select
          value={filters.urgency ?? ''}
          onChange={(e) => onFilterChange({ urgency: e.target.value })}
          className="h-9 rounded-lg border border-white/10 bg-[#111827] px-3 text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"
        >
          {URGENCY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <input
          type="date"
          value={filters.dateFrom ?? ''}
          onChange={(e) => onFilterChange({ dateFrom: e.target.value })}
          className="h-9 rounded-lg border border-white/10 bg-[#111827] px-3 text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"
        />
        <span className="text-[#6B7280] text-xs">to</span>
        <input
          type="date"
          value={filters.dateTo ?? ''}
          onChange={(e) => onFilterChange({ dateTo: e.target.value })}
          className="h-9 rounded-lg border border-white/10 bg-[#111827] px-3 text-sm text-[#F9FAFB] focus:border-[#3B82F6] focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Export dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setShowExport(!showExport)}
            className="flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-[#111827] px-3 text-sm text-[#9CA3AF] hover:bg-[#1F2937] hover:text-[#F9FAFB] transition-colors"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          {showExport && (
            <div className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-lg border border-white/10 bg-[#111827] shadow-xl">
              <button
                onClick={() => { onExport('excel'); setShowExport(false); }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-[#F9FAFB] hover:bg-[#1F2937] transition-colors"
              >
                <FileSpreadsheet className="h-4 w-4 text-[#22C55E]" />
                Export Excel
              </button>
              <button
                onClick={() => { onExport('pdf'); setShowExport(false); }}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-sm text-[#F9FAFB] hover:bg-[#1F2937] transition-colors"
              >
                <FileText className="h-4 w-4 text-[#EF4444]" />
                Export PDF
              </button>
            </div>
          )}
        </div>

        {/* New Request */}
        <button
          onClick={onNewRequest}
          className="flex h-9 items-center gap-2 rounded-lg bg-[#3B82F6] px-4 text-sm font-medium text-white hover:bg-[#2563EB] transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Request
        </button>
      </div>
    </div>
  );
}
