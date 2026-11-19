import { RadioGroup as RadioGroupPrimitive } from "radix-ui";
import {
  type ComponentProps,
  createContext,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/cn";
import { MotionSpan, useMotionReduced } from "@/lib/sheet-motion";
import { useStretch } from "@/lib/use-stretch";

const segmentedStyles = {
  root: "relative isolate inline-flex h-7 shrink-0 items-center gap-0.5 rounded-full bg-ink/[0.06] p-0.5 data-[disabled]:opacity-50",
  pill: "pointer-events-none absolute left-0 top-0 -z-10 rounded-full segmented-fill",
  item: [
    "h-6 min-w-0 cursor-pointer whitespace-nowrap rounded-full px-2.5 text-[13px] leading-6 text-ink-secondary",
    "transition-[background-color,color,box-shadow,scale] duration-[120ms] ease-[ease] enabled:hover:text-ink",
    "outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-focus",
    "disabled:cursor-default enabled:active:scale-[0.96] motion-reduce:enabled:active:scale-100",
    "data-[state=checked]:text-ink",
  ].join(" "),
};

type Pill = {
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  moved: boolean;
};

const SegmentedContext = createContext<{ placed: boolean }>({ placed: false });

export type SegmentedProps = Omit<
  ComponentProps<typeof RadioGroupPrimitive.Root>,
  "orientation" | "aria-label"
> & {
  "aria-label": string;
};

export function Segmented({
  value: owned,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: SegmentedProps) {
  const [own, setOwn] = useState(defaultValue ?? "");
  const value = owned ?? own;
  const group = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState<Pill | null>(null);
  const reduced = useMotionReduced();

  useLayoutEffect(() => {
    const root = group.current;
    if (!root) return;
    const place = () => {
      const chosen = root.querySelector<HTMLElement>(
        '[role="radio"][data-state="checked"]',
      );
      if (!chosen || !chosen.offsetWidth) return setPill(null);
      const next = {
        x: chosen.offsetLeft,
        y: chosen.offsetTop,
        width: chosen.offsetWidth,
        height: chosen.offsetHeight,
      };
      setPill((last) =>
        last &&
        last.x === next.x &&
        last.y === next.y &&
        last.width === next.width &&
        last.height === next.height
          ? last
          : { ...next, value, moved: last !== null && last.value !== value },
      );
    };
    place();
    const mutations = new MutationObserver(place);
    mutations.observe(root, { childList: true, subtree: true });
    if (typeof ResizeObserver === "undefined")
      return () => mutations.disconnect();
    const watch = new ResizeObserver(place);
    watch.observe(root);
    return () => {
      watch.disconnect();
      mutations.disconnect();
    };
  }, [value]);

  const stretch = useStretch(
    pill ? { start: pill.x, end: pill.x + pill.width } : null,
    reduced || !pill?.moved,
  );

  return (
    <SegmentedContext.Provider value={{ placed: pill !== null }}>
      <RadioGroupPrimitive.Root
        ref={group}
        data-slot="segmented"
        data-segmented=""
        orientation="horizontal"
        loop
        value={value}
        onValueChange={(next) => {
          setOwn(next);
          onValueChange?.(next);
        }}
        className={cn(segmentedStyles.root, className)}
        {...props}
      >
        {pill && (
          <MotionSpan
            aria-hidden="true"
            data-segmented-pill=""
            style={{
              x: stretch.start,
              y: pill.y,
              width: stretch.size,
              height: pill.height,
            }}
            className={segmentedStyles.pill}
          />
        )}
        {children}
      </RadioGroupPrimitive.Root>
    </SegmentedContext.Provider>
  );
}

export function SegmentedItem({
  className,
  ...props
}: ComponentProps<typeof RadioGroupPrimitive.Item>) {
  const { placed } = useContext(SegmentedContext);
  return (
    <RadioGroupPrimitive.Item
      data-slot="segmented-item"
      className={cn(
        segmentedStyles.item,
        !placed && "data-[state=checked]:segmented-fill",
        className,
      )}
      {...props}
    />
  );
}
