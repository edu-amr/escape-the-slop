import { type ComponentProps, useLayoutEffect, useRef } from "react";

import { type FieldSize, fieldSurface, useField } from "@/components/field-surface";
import { cn } from "@/lib/cn";

const textareaStyles = {
  bare: "block w-full resize-none rounded-[10px] border border-transparent bg-transparent px-[9px] py-[7px] text-[13px] leading-[18px] tracking-[0.195px] text-ink outline-none [scrollbar-width:thin] placeholder:text-ink/40 disabled:opacity-50",
  bareInvalid: "border-danger",
  boxed: "py-[7px] [scrollbar-width:thin]",
  size: {
    sm: "px-2 text-[12px] leading-4",
    md: "px-2.5 text-[13px] leading-[18px] tracking-[0.195px]",
    lg: "px-3 py-2 text-[14px] leading-5",
  },
  resize: { none: "resize-none", vertical: "resize-y" },
  counter: "text-[12px] leading-4 tabular-nums text-ink/56",
};

export function Textarea({
  className,
  variant = "bare",
  size: sizeProp,
  invalid,
  autoResize = false,
  maxRows,
  resize,
  rows,
  id,
  disabled,
  readOnly,
  required,
  onInput,
  ref,
  "aria-invalid": ariaInvalid,
  "aria-describedby": describedBy,
  ...props
}: ComponentProps<"textarea"> & {
  variant?: "bare" | "boxed";
  size?: FieldSize;
  invalid?: boolean;
  autoResize?: boolean;
  maxRows?: number;
  resize?: "none" | "vertical";
}) {
  const field = useField();
  const size = sizeProp ?? field.size;
  const isInvalid =
    invalid ??
    (ariaInvalid !== undefined
      ? ariaInvalid === true || ariaInvalid === "true"
      : field.invalid);
  const inner = useRef<HTMLTextAreaElement | null>(null);
  const lineRows = rows ?? (variant === "boxed" ? 3 : undefined);

  const fit = () => {
    const element = inner.current;
    if (!element || !autoResize) return;
    const line = parseFloat(getComputedStyle(element).lineHeight) || 18;
    const padding =
      parseFloat(getComputedStyle(element).paddingTop) +
      parseFloat(getComputedStyle(element).paddingBottom);
    const ceiling = maxRows ? maxRows * line + padding : Infinity;
    element.style.height = "0px";
    const natural = Math.max(element.scrollHeight, (lineRows ?? 1) * line + padding);
    element.style.height = `${Math.min(natural, ceiling)}px`;
    element.style.overflowY = natural > ceiling ? "auto" : "hidden";
  };

  useLayoutEffect(fit);

  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      ref={(node) => {
        inner.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      id={id ?? field.inputId}
      rows={lineRows}
      disabled={disabled ?? field.disabled}
      readOnly={readOnly ?? field.readOnly}
      required={required ?? field.required}
      aria-invalid={isInvalid || undefined}
      aria-describedby={
        describedBy ?? (field.hintId && field.invalid ? field.hintId : undefined)
      }
      onInput={(event) => {
        fit();
        onInput?.(event);
      }}
      className={cn(
        variant === "boxed"
          ? [
              fieldSurface.control,
              "h-auto",
              textareaStyles.size[size],
              textareaStyles.boxed,
            ]
          : [textareaStyles.bare, isInvalid && textareaStyles.bareInvalid],
        textareaStyles.resize[
          autoResize ? "none" : (resize ?? (variant === "boxed" ? "vertical" : "none"))
        ],
        className,
      )}
      {...props}
    />
  );
}

export function TextareaCounter({
  className,
  value,
  max,
  ...props
}: Omit<ComponentProps<"span">, "children"> & { value: number; max?: number }) {
  return (
    <span
      data-slot="textarea-counter"
      className={cn(textareaStyles.counter, className)}
      {...props}
    >
      {max ? `${value}/${max}` : value}
    </span>
  );
}
