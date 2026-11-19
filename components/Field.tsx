import { type ComponentProps, type ReactNode, useId, useState } from "react";

import {
  FieldContext,
  type FieldSize,
  fieldSurface,
  useField,
} from "@/components/field-surface";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

export { Textarea } from "@/components/Textarea";
export { FieldContext, type FieldSize, fieldSurface, useField };

const fieldStyles = {
  input:
    "block h-8 w-full min-w-0 rounded-[10px] border border-transparent bg-transparent px-[9px] text-[13px] leading-[18px] tracking-[0.195px] text-ink outline-none placeholder:text-ink/40 disabled:opacity-50",
  label: "text-[11px] leading-4 tracking-[0.01em] text-ink/68",
  required: "ml-0.5 text-danger",
  hint: "text-[13px] leading-[18px] tracking-[-0.08px] text-ink/68",
  hintInvalid: "text-danger",
  footnote: "m-0 pl-2 text-[12px] leading-4 tracking-[0.01em] text-ink/56",
  field: "flex w-full min-w-0 flex-col items-start gap-1.5",
  fieldHorizontal: "flex-row items-center gap-3",
  group: "flex w-full flex-col gap-4",
  content: "flex min-w-0 flex-1 flex-col gap-0.5",
  addon: "flex shrink-0 items-center gap-1 text-ink-secondary [&>svg]:shrink-0",
  addonEnd: "order-last",
  text: "whitespace-nowrap text-[13px] leading-[18px] text-ink-secondary",
};

export function Field({
  size = "md",
  invalid = false,
  disabled = false,
  readOnly = false,
  required = false,
  orientation = "vertical",
  inputId,
  className,
  ...props
}: ComponentProps<"div"> & {
  size?: FieldSize;
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  orientation?: "vertical" | "horizontal";
  inputId?: string;
}) {
  const generated = useId();
  const id = inputId ?? generated;
  return (
    <FieldContext.Provider
      value={{
        size,
        invalid,
        disabled,
        readOnly,
        required,
        inputId: id,
        hintId: `${id}-hint`,
      }}
    >
      <div
        data-slot="field"
        data-orientation={orientation}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          fieldStyles.field,
          orientation === "horizontal" && fieldStyles.fieldHorizontal,
          className,
        )}
        {...props}
      />
    </FieldContext.Provider>
  );
}

export function FieldGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn(fieldStyles.group, className)}
      {...props}
    />
  );
}

export function FieldContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn(fieldStyles.content, className)}
      {...props}
    />
  );
}

export function Input({
  className,
  variant = "bare",
  size: sizeProp,
  invalid,
  id,
  disabled,
  readOnly,
  required,
  "aria-invalid": ariaInvalid,
  "aria-describedby": describedBy,
  ...props
}: Omit<ComponentProps<"input">, "size"> & {
  variant?: "bare" | "boxed";
  size?: FieldSize | number;
  invalid?: boolean;
}) {
  const field = useField();
  const nativeSize = typeof sizeProp === "number" ? sizeProp : undefined;
  const size = typeof sizeProp === "string" ? sizeProp : field.size;
  const isInvalid =
    invalid ??
    (ariaInvalid !== undefined
      ? ariaInvalid === true || ariaInvalid === "true"
      : field.invalid);
  return (
    <input
      data-slot="input"
      data-size={size}
      size={nativeSize}
      id={id ?? field.inputId}
      disabled={disabled ?? field.disabled}
      readOnly={readOnly ?? field.readOnly}
      required={required ?? field.required}
      aria-invalid={isInvalid || undefined}
      aria-describedby={
        describedBy ?? (field.hintId && field.invalid ? field.hintId : undefined)
      }
      className={cn(
        variant === "boxed"
          ? [fieldSurface.control, fieldSurface.size[size]]
          : [fieldStyles.input, isInvalid && "border-danger"],
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  required,
  children,
  htmlFor,
  ...props
}: ComponentProps<"label"> & { required?: boolean }) {
  const field = useField();
  return (
    <label
      data-slot="field-label"
      htmlFor={htmlFor ?? field.inputId}
      className={cn(fieldStyles.label, className)}
      {...props}
    >
      {children}
      {(required ?? field.required) ? (
        <span aria-hidden="true" className={fieldStyles.required}>
          *
        </span>
      ) : null}
    </label>
  );
}

export function FieldHint({
  className,
  invalid,
  id,
  ...props
}: ComponentProps<"p"> & { invalid?: boolean }) {
  const field = useField();
  const isInvalid = invalid ?? field.invalid;
  return (
    <p
      data-slot="field-hint"
      id={id ?? field.hintId}
      data-invalid={isInvalid || undefined}
      className={cn(fieldStyles.hint, isInvalid && fieldStyles.hintInvalid, className)}
      {...props}
    />
  );
}

export function FieldFootnote({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      data-slot="field-footnote"
      className={cn(fieldStyles.footnote, className)}
      {...props}
    />
  );
}

export function InputGroup({
  size: sizeProp,
  invalid,
  disabled,
  className,
  ...props
}: ComponentProps<"div"> & {
  size?: FieldSize;
  invalid?: boolean;
  disabled?: boolean;
}) {
  const field = useField();
  const size = sizeProp ?? field.size;
  const isInvalid = invalid ?? field.invalid;
  const isDisabled = disabled ?? field.disabled;
  return (
    <div
      data-slot="input-group"
      data-size={size}
      data-invalid={isInvalid || undefined}
      data-disabled={isDisabled || undefined}
      role="group"
      className={cn(fieldSurface.root, fieldSurface.boxHeight[size], className)}
      {...props}
    />
  );
}

export function InputGroupInput({
  className,
  id,
  disabled,
  readOnly,
  required,
  "aria-describedby": describedBy,
  ...props
}: ComponentProps<"input">) {
  const field = useField();
  return (
    <input
      data-slot="input-group-input"
      id={id ?? field.inputId}
      disabled={disabled ?? field.disabled}
      readOnly={readOnly ?? field.readOnly}
      required={required ?? field.required}
      aria-invalid={field.invalid || undefined}
      aria-describedby={
        describedBy ?? (field.hintId && field.invalid ? field.hintId : undefined)
      }
      className={cn(fieldSurface.bare, fieldSurface.bareSize[field.size], className)}
      {...props}
    />
  );
}

export function InputGroupAddon({
  align = "inline-start",
  className,
  ...props
}: ComponentProps<"div"> & { align?: "inline-start" | "inline-end" }) {
  return (
    <div
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        fieldStyles.addon,
        align === "inline-end" && fieldStyles.addonEnd,
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(fieldStyles.text, className)}
      {...props}
    />
  );
}

export function InputGroupButton({
  className,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      data-slot="input-group-button"
      type={type}
      className={cn(fieldSurface.addonButton, className)}
      {...props}
    />
  );
}

export function PasswordInput({
  showLabel,
  hideLabel,
  size,
  invalid,
  leading,
  className,
  ...props
}: Omit<ComponentProps<"input">, "size" | "type"> & {
  showLabel: string;
  hideLabel: string;
  size?: FieldSize;
  invalid?: boolean;
  leading?: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <InputGroup size={size} invalid={invalid} className={className}>
      {leading ? <InputGroupAddon>{leading}</InputGroupAddon> : null}
      <InputGroupInput
        type={visible ? "text" : "password"}
        autoComplete="current-password"
        {...props}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          <Icon name={visible ? "eye-slash" : "eye"} size={14} />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export function ClearableInput({
  clearLabel,
  size,
  invalid,
  leading,
  value,
  defaultValue,
  onChange,
  onClear,
  className,
  ...props
}: Omit<ComponentProps<"input">, "size"> & {
  clearLabel: string;
  size?: FieldSize;
  invalid?: boolean;
  leading?: ReactNode;
  onClear?: () => void;
}) {
  const [inner, setInner] = useState(String(defaultValue ?? ""));
  const text = value !== undefined ? String(value) : inner;
  return (
    <InputGroup size={size} invalid={invalid} className={className}>
      {leading ? <InputGroupAddon>{leading}</InputGroupAddon> : null}
      <InputGroupInput
        value={text}
        onChange={(event) => {
          if (value === undefined) setInner(event.target.value);
          onChange?.(event);
        }}
        {...props}
      />
      {text !== "" && !props.disabled && !props.readOnly ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={clearLabel}
            onClick={(event) => {
              if (value === undefined) setInner("");
              onClear?.();
              event.currentTarget
                .closest("[data-slot=input-group]")
                ?.querySelector("input")
                ?.focus();
            }}
          >
            <Icon name="close" size={12} />
          </InputGroupButton>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
