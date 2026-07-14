"use client";

import {
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  Activity,
  Ban,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Badge } from "./Badge";

export type ProcurementStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "DRAFT"
  | "ACTIVE"
  | "CANCELLED"
  | "PROCESSING"
  | "COMPLETED";

export interface StatusBadgeProps {
  status: ProcurementStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  ProcurementStatus,
  {
    variant: "default" | "primary" | "success" | "warning" | "danger" | "outline";
    icon: React.ElementType;
    label: string;
    pulse?: boolean;
  }
> = {
  PENDING: { variant: "warning", icon: Clock, label: "Pending" },
  APPROVED: { variant: "success", icon: CheckCircle, label: "Approved" },
  REJECTED: { variant: "danger", icon: XCircle, label: "Rejected" },
  DRAFT: { variant: "default", icon: FileText, label: "Draft" },
  ACTIVE: { variant: "primary", icon: Activity, label: "Active", pulse: true },
  CANCELLED: { variant: "outline", icon: Ban, label: "Cancelled" },
  PROCESSING: { variant: "primary", icon: Loader2, label: "Processing", pulse: true },
  COMPLETED: { variant: "success", icon: CheckCircle2, label: "Completed" },
};

export function StatusBadge({ status, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} size={size} dot={config.pulse}>
      <Icon
        className={`h-3 w-3 shrink-0 ${config.icon === Loader2 ? "animate-spin" : ""}`}
      />
      {config.label}
    </Badge>
  );
}
