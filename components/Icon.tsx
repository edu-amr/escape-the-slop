import type { CSSProperties } from "react";

import { cn } from "../lib/cn";
import "../styles/icon.css";
import { SOLAR_ICONS } from "./icons/icon-table";

/** The app's named icons. Names stay stable so callers and stored ids never change. */
export const ICONS = SOLAR_ICONS;

export type IconName = keyof typeof ICONS;

export const ICON_SIZE = {
  xs: 10,
  sm: 12,
  base: 14,
  lg: 16,
  xl: 20,
  "2xl": 24,
} as const;

type Props = {
  name: IconName;
  size?: number | keyof typeof ICON_SIZE;
  variant?: "outline" | "filled";
  className?: string;
  style?: CSSProperties;
  title?: string;
  "aria-label"?: string;
};

export function Icon({
  name,
  size = 16,
  variant: _variant = "outline",
  className,
  style,
  title,
  "aria-label": label,
}: Props) {
  const Glyph = ICONS[name];
  const px = typeof size === "number" ? size : ICON_SIZE[size];
  return (
    <Glyph
      className={cn("ui-icon", className)}
      data-icon-name={name}
      size={px}
      style={style}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
    </Glyph>
  );
}
