'use client';

import React from 'react';
import { CheckCircle2, XCircle, Clock, Circle } from 'lucide-react';
import type { ApprovalStep } from '../types';
import { format } from 'date-fns';

interface PRStatusTimelineProps {
  steps: ApprovalStep[];
}

const stepIcons = {
  approved: <CheckCircle2 className="h-5 w-5 text-[#22C55E]" />,
  rejected: <XCircle className="h-5 w-5 text-[#EF4444]" />,
  pending: <Clock className="h-5 w-5 text-[#F59E0B]" />,
  skipped: <Circle className="h-5 w-5 text-[#6B7280]" />,
};

const stepColors = {
  approved: 'border-[#22C55E] bg-[#22C55E]/10',
  rejected: 'border-[#EF4444] bg-[#EF4444]/10',
  pending: 'border-[#F59E0B] bg-[#F59E0B]/10',
  skipped: 'border-[#6B7280] bg-[#6B7280]/10',
};

const stepLabels = {
  approved: 'text-[#22C55E]',
  rejected: 'text-[#EF4444]',
  pending: 'text-[#F59E0B]',
  skipped: 'text-[#6B7280]',
};

export function PRStatusTimeline({ steps }: PRStatusTimelineProps) {
  if (!steps?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-[#6B7280]">
        <Clock className="mb-2 h-8 w-8" />
        <p className="text-sm">No timeline data available</p>
      </div>
    );
  }

  return (
    <div className="relative space-y-0">
      {steps.map((step, idx) => (
        <div key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Vertical line */}
          {idx < steps.length - 1 && (
            <div className="absolute left-[18px] top-8 h-full w-px bg-white/10" />
          )}

          {/* Icon */}
          <div
            className={`relative z-10 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border ${stepColors[step.status]}`}
          >
            {stepIcons[step.status]}
          </div>

          {/* Content */}
          <div className="flex-1 pt-0.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-[#F9FAFB]">{step.label}</p>
                {step.user && (
                  <p className="mt-0.5 text-xs text-[#9CA3AF]">by {step.user}</p>
                )}
                {step.comment && (
                  <p className="mt-1.5 rounded-md border border-white/10 bg-[#0F172A] px-3 py-2 text-xs text-[#9CA3AF] italic">
                    &ldquo;{step.comment}&rdquo;
                  </p>
                )}
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-medium capitalize ${stepLabels[step.status]}`}
                >
                  {step.status}
                </span>
                {step.time && (
                  <p className="mt-0.5 text-xs text-[#6B7280]">
                    {format(new Date(step.time), 'MMM d, yyyy HH:mm')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
