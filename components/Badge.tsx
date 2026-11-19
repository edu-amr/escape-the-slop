import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export type BadgeVariant = "bold" | "subtle" | "caption" | "counter";
export type BadgeColor =
  | "orange"
  | "lime"
  | "rose"
  | "yellow"
  | "cyan"
  | "blue"
  | "purple"
  | "primary"
  | "neutral"
  | "gray"
  | "soft";

const badgeStyles = {
  base: "inline-flex items-center justify-center rounded-md px-1.5 whitespace-nowrap transition-[padding,font-size] duration-200 ease-[ease]",
  variant: {
    bold: "py-0.5 text-[14px] leading-5 font-medium",
    subtle: "py-1 text-[14px] leading-5 font-medium",
    caption: "py-1 text-[12px] leading-4 font-medium",
    counter:
      "rounded-sm px-1 py-px text-[12px] leading-4 font-semibold tracking-normal",
  },
  color: {
    orange:
      "bg-[var(--color-status-orange-background)] text-[color:var(--color-status-orange-text)]",
    lime: "bg-[var(--color-status-lime-background)] text-[color:var(--color-status-lime-text)]",
    rose: "bg-[var(--color-status-rose-background)] text-[color:var(--color-status-rose-text)]",
    yellow:
      "bg-[var(--color-status-yellow-background)] text-[color:var(--color-status-yellow-text)]",
    cyan: "bg-[var(--color-status-cyan-background)] text-[color:var(--color-status-cyan-text)]",
    blue: "bg-[var(--color-status-blue-background)] text-[color:var(--color-status-blue-text)]",
    purple:
      "bg-[var(--color-status-purple-background)] text-[color:var(--color-status-purple-text)]",
    primary: "bg-accent text-accent-ink",
    neutral: "bg-control text-ink-secondary",
    gray: "bg-inset text-ink",
    soft: "bg-inset text-ink-secondary",
  },
  counterColor: {
    neutral: "bg-[var(--color-badge-neutral-background)] text-ink-secondary",
  } as Partial<Record<BadgeColor, string>>,
};

export type BadgeProps = ComponentProps<"span"> & {
  variant?: BadgeVariant;
  color?: BadgeColor;
};

export function Badge({
  variant = "bold",
  color = "neutral",
  className,
  ...props
}: BadgeProps) {
  const colorClass =
    (variant === "counter" && badgeStyles.counterColor[color]) ||
    badgeStyles.color[color];
  return (
    <span
      data-slot="badge"
      className={cn(
        badgeStyles.base,
        badgeStyles.variant[variant],
        colorClass,
        className,
      )}
      {...props}
    />
  );
}
