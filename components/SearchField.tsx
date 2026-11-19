import { type ComponentProps, type KeyboardEvent, type ReactNode, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/Field";
import type { FieldSize } from "@/components/field-surface";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

const searchStyles = {
  root: "w-full",
  icon: "text-ink-tertiary",
  spinner: "animate-spin text-ink-tertiary motion-reduce:animate-none",
  shortcut:
    "pointer-events-none hidden rounded-md bg-ink/6 px-1.5 text-[11px] leading-[18px] text-ink-secondary sm:inline-flex",
};

export function SearchField({
  value,
  defaultValue = "",
  onValueChange,
  onSearch,
  clearLabel,
  size,
  invalid,
  loading = false,
  shortcut,
  leading,
  className,
  onKeyDown,
  ...props
}: Omit<
  ComponentProps<"input">,
  "size" | "value" | "defaultValue" | "onChange" | "type"
> & {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  clearLabel: string;
  size?: FieldSize;
  invalid?: boolean;
  loading?: boolean;
  shortcut?: ReactNode;
  leading?: ReactNode;
}) {
  const [inner, setInner] = useState(defaultValue);
  const text = value ?? inner;
  const commit = (next: string) => {
    if (value === undefined) setInner(next);
    onValueChange?.(next);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (event.key === "Enter") onSearch?.(text);
    if (event.key === "Escape" && text !== "") {
      event.preventDefault();
      commit("");
    }
  };
  return (
    <InputGroup
      data-slot="search-field"
      size={size}
      invalid={invalid}
      disabled={props.disabled}
      className={cn(searchStyles.root, className)}
    >
      <InputGroupAddon>
        {leading ?? <Icon name="search" size={14} className={searchStyles.icon} />}
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        autoComplete="off"
        spellCheck={false}
        value={text}
        onChange={(event) => commit(event.target.value)}
        onKeyDown={handleKeyDown}
        className="[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        {...props}
      />
      {loading ? (
        <InputGroupAddon align="inline-end">
          <Icon name="refresh" size={14} className={searchStyles.spinner} />
        </InputGroupAddon>
      ) : null}
      {text !== "" && !props.disabled && !props.readOnly ? (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={clearLabel}
            onClick={(event) => {
              commit("");
              event.currentTarget
                .closest("[data-slot=input-group]")
                ?.querySelector("input")
                ?.focus();
            }}
          >
            <Icon name="close" size={12} />
          </InputGroupButton>
        </InputGroupAddon>
      ) : shortcut ? (
        <InputGroupAddon align="inline-end">
          <span className={searchStyles.shortcut}>{shortcut}</span>
        </InputGroupAddon>
      ) : null}
    </InputGroup>
  );
}
