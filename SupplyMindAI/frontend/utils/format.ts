import { format, formatDistanceToNow, parseISO } from "date-fns";

// ─── Currency ────────────────────────────────────────────────────────────────

/**
 * Formats a number as currency.
 * @example formatCurrency(1234567.89) → "$1,234,567.89"
 */
export function formatCurrency(
  value: number,
  currency = "USD",
  locale = "en-US",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// ─── Numbers ─────────────────────────────────────────────────────────────────

/**
 * Formats a large number with K / M / B suffix.
 * @example formatCompact(1_500_000) → "1.5M"
 */
export function formatCompact(value: number, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { notation: "compact" }).format(value);
}

/**
 * Formats a decimal as a percentage string.
 * @example formatPercent(0.1234) → "12.34%"
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

// ─── Dates ───────────────────────────────────────────────────────────────────

/**
 * Formats an ISO date string for display.
 * @example formatDate("2025-01-15T10:30:00Z") → "Jan 15, 2025"
 */
export function formatDate(isoString: string, pattern = "MMM d, yyyy"): string {
  return format(parseISO(isoString), pattern);
}

/**
 * Formats an ISO date string as a relative time.
 * @example formatRelative("2025-01-14T10:00:00Z") → "2 days ago"
 */
export function formatRelative(isoString: string): string {
  return formatDistanceToNow(parseISO(isoString), { addSuffix: true });
}

// ─── Strings ─────────────────────────────────────────────────────────────────

/**
 * Truncates a string to maxLength characters.
 */
export function truncate(str: string, maxLength = 50): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

/**
 * Converts a camelCase / snake_case key to a human-readable label.
 * @example toLabel("purchaseOrderId") → "Purchase Order Id"
 */
export function toLabel(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/^\s+/, "")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Returns initials from a full name.
 * @example getInitials("Jane Doe") → "JD"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
