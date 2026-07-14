"use client";

import { cn } from "@/utils/cn";

const sizeMap = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

const ringMap = {
  xs: "ring-1",
  sm: "ring-2",
  md: "ring-2",
  lg: "ring-2",
  xl: "ring-[3px]",
};

function hashColor(name: string): string {
  const colors = [
    "#3B82F6", "#8B5CF6", "#EC4899", "#EF4444",
    "#F59E0B", "#22C55E", "#06B6D4", "#F97316",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  ring?: boolean;
  className?: string;
}

export function Avatar({ src, name, size = "md", ring, className }: AvatarProps) {
  const bg = hashColor(name);
  const initials = getInitials(name);

  return (
    <span
      className={cn(
        "relative inline-flex items-center justify-center shrink-0 rounded-full font-semibold overflow-hidden",
        sizeMap[size],
        ring && `${ringMap[size]} ring-[#3B82F6] ring-offset-2 ring-offset-[#09090B]`,
        className
      )}
      style={!src ? { backgroundColor: bg } : undefined}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="text-white select-none">{initials}</span>
      )}
    </span>
  );
}

export interface AvatarGroupProps {
  avatars: Array<{ src?: string; name: string }>;
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AvatarGroup({ avatars, max = 4, size = "sm", className }: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((avatar, i) => (
        <span
          key={i}
          className={cn(
            "relative inline-block rounded-full ring-2 ring-[#09090B]",
            i > 0 && "-ml-2"
          )}
          style={{ zIndex: visible.length - i }}
        >
          <Avatar src={avatar.src} name={avatar.name} size={size} />
        </span>
      ))}
      {overflow > 0 && (
        <span
          className={cn(
            "relative -ml-2 inline-flex items-center justify-center rounded-full bg-[#1F2937] text-[#9CA3AF] font-medium ring-2 ring-[#09090B]",
            sizeMap[size],
            size === "xs" ? "text-[9px]" : "text-xs"
          )}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}
