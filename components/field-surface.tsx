import { createContext, useContext } from "react";

export type FieldSize = "sm" | "md" | "lg";

export type FieldContextValue = {
  size: FieldSize;
  invalid: boolean;
  disabled: boolean;
  readOnly: boolean;
  required: boolean;
  inputId?: string;
  hintId?: string;
};

export const FieldContext = createContext<FieldContextValue>({
  size: "md",
  invalid: false,
  disabled: false,
  readOnly: false,
  required: false,
});

export function useField() {
  return useContext(FieldContext);
}

export const fieldSurface = {
  root: [
    "group/field-surface relative flex w-full min-w-0 items-center gap-1.5 rounded-[10px] bg-control text-ink ring-1 ring-inset ring-ink/10",
    "transition-[box-shadow,background-color] duration-100 ease-[ease] hover:ring-ink/20 focus-within:ring-2 focus-within:ring-focus focus-within:hover:ring-focus",
    "data-[invalid]:ring-danger data-[invalid]:hover:ring-danger data-[invalid]:focus-within:ring-danger",
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  ].join(" "),
  control: [
    "block w-full min-w-0 rounded-[10px] border-0 bg-control text-ink ring-1 ring-inset ring-ink/10 outline-none",
    "transition-[box-shadow,background-color] duration-100 ease-[ease] placeholder:text-ink/40 hover:ring-ink/20 focus-visible:ring-2 focus-visible:ring-focus",
    "aria-[invalid=true]:ring-danger aria-[invalid=true]:hover:ring-danger aria-[invalid=true]:focus-visible:ring-danger",
    "read-only:text-ink-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:ring-ink/10",
  ].join(" "),
  size: {
    sm: "h-7 px-2 text-[12px] leading-4",
    md: "h-8 px-2.5 text-[13px] leading-[18px] tracking-[0.195px]",
    lg: "h-10 px-3 text-[14px] leading-5",
  },
  boxHeight: { sm: "h-7 px-2", md: "h-8 px-2.5", lg: "h-10 px-3" },
  bare: "h-full min-w-0 flex-1 bg-transparent p-0 text-[13px] leading-[18px] tracking-[0.195px] text-ink outline-none placeholder:text-ink/40 read-only:text-ink-secondary disabled:cursor-not-allowed",
  bareSize: {
    sm: "text-[12px] leading-4",
    md: "",
    lg: "text-[14px] leading-5",
  },
  addonButton:
    "inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-md text-ink-secondary outline-none transition-colors duration-100 hover:bg-ink/6 hover:text-ink focus-visible:ring-2 focus-visible:ring-focus disabled:pointer-events-none disabled:opacity-50",
};
