"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { Palette } from "@/components/Palette";
import type { Dictionary } from "@/data/i18n";
import type { CategoryKey } from "@/data/libs";
import { CATEGORY_KEYS } from "@/data/libs";
import { REPO_URL } from "@/lib/site";

type Item = {
  slug: string;
  name: string;
  category: CategoryKey;
  url: string;
  host: string;
};
type Order = "latest" | "az" | "shuffle";

function shuffled<T>(list: T[], seed: number) {
  const out = [...list];
  let a = seed >>> 0;
  const rand = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const SEARCH_PATH =
  "M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z";
const SHUFFLE_PATH =
  "M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z";

export function LibGrid({
  dict,
  items,
  byline,
  actions,
  hero,
  footer,
  children,
}: {
  dict: Dictionary;
  items: Item[];
  byline: React.ReactNode;
  actions: React.ReactNode;
  hero: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode[];
}) {
  const [order, setOrder] = useState<Order>("latest");
  const [seed, setSeed] = useState(1);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<CategoryKey[]>([]);
  const [open, setOpen] = useState(false);

  const matches = useCallback(
    (item: Item) => {
      const term = query.trim().toLowerCase();
      return (
        (!categories.length || categories.includes(item.category)) &&
        (!term ||
          item.name.toLowerCase().includes(term) ||
          item.host.toLowerCase().includes(term) ||
          dict.categories[item.category].toLowerCase().includes(term))
      );
    },
    [query, categories, dict],
  );

  const visible = useMemo(() => {
    const indexed = items.map((item, index) => ({ item, index }));
    const filtered = indexed.filter(({ item }) => matches(item));
    if (order === "latest") return filtered.reverse();
    if (order === "az")
      return filtered.sort((a, b) => a.item.name.localeCompare(b.item.name));
    return shuffled(filtered, seed);
  }, [items, matches, order, seed]);

  const counts = useMemo(() => {
    const term = query.trim().toLowerCase();
    const map: Partial<Record<CategoryKey, number>> = {};
    for (const item of items) {
      if (
        term &&
        !item.name.toLowerCase().includes(term) &&
        !item.host.toLowerCase().includes(term)
      )
        continue;
      map[item.category] = (map[item.category] ?? 0) + 1;
    }
    return map;
  }, [items, query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const tilt = (event: React.PointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = (event.target as HTMLElement).closest<HTMLElement>(".hub-card");
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
    card.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
  };
  const untilt = (event: React.PointerEvent<HTMLUListElement>) => {
    event.currentTarget.querySelectorAll<HTMLElement>(".hub-card").forEach((card) => {
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    });
  };

  const hasFilter = categories.length > 0 || query.trim() !== "";
  const toggle = (key: CategoryKey) =>
    setCategories((current) =>
      current.includes(key) ? current.filter((k) => k !== key) : [...current, key],
    );
  const clear = () => {
    setCategories([]);
    setQuery("");
  };

  const seg = (value: Order, label: string) => (
    <button
      type="button"
      role="radio"
      aria-checked={order === value}
      onClick={() => setOrder(value)}
      className={
        order === value
          ? "relative z-[1] inline-flex cursor-pointer items-center rounded-[calc(var(--radius)-0.2rem)] bg-[var(--primary)] px-3.5 text-[12px] font-medium text-[var(--background)] transition-colors"
          : "relative z-[1] inline-flex cursor-pointer items-center rounded-[calc(var(--radius)-0.2rem)] px-3.5 text-[12px] font-medium text-[var(--secondary)] transition-colors hover:text-[var(--primary)]"
      }
    >
      {label}
    </button>
  );

  return (
    <>
      <nav className="relative z-30 grid h-[var(--bar-h)] grid-cols-[1fr_auto_1fr] items-center gap-3 px-5 sm:px-8 xl:px-12">
        <div className="flex items-center">{byline}</div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-keyshortcuts="Meta+K Control+K"
          aria-label={dict.searchOrFilter}
          className="flex h-[var(--btn-h)] w-[min(34rem,46vw)] cursor-pointer items-center gap-2.5 rounded-[var(--radius)] border border-[var(--tertiary)] bg-[var(--background)] px-3.5 text-[12px] font-medium text-[var(--secondary)] transition-colors hover:border-[var(--secondary)] hover:text-[var(--primary)] max-sm:w-[var(--btn-h)] max-sm:justify-center max-sm:px-0"
        >
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="currentColor"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d={SEARCH_PATH} />
          </svg>
          <span className="min-w-0 flex-1 truncate text-left max-sm:hidden">
            {hasFilter
              ? [...categories.map((k) => dict.categories[k]), query.trim()]
                  .filter(Boolean)
                  .join(" · ")
              : dict.searchOrFilter}
          </span>
          <kbd className="rounded-md bg-[var(--tertiary)] px-1.5 py-1 font-mono text-[10px] max-sm:hidden">
            ⌘K
          </kbd>
        </button>
        <div className="flex items-center justify-end gap-2">
          {actions}
          <a
            href={`${REPO_URL}/issues/new`}
            target="_blank"
            rel="noopener"
            className="inline-flex h-[var(--btn-h)] items-center rounded-[var(--radius)] border border-[var(--primary)] bg-[var(--primary)] px-3.5 text-[12px] font-medium whitespace-nowrap text-[var(--background)] no-underline transition-[scale,opacity] duration-150 hover:opacity-85 active:scale-[0.97] max-sm:hidden"
          >
            {dict.submit}
          </a>
        </div>
      </nav>

      {hero}

      <section
        aria-label={dict.title}
        className="mx-auto max-w-[120rem] px-5 sm:px-8 xl:px-12"
      >
        <div className="relative z-20 flex flex-col gap-2 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <div className="flex items-center justify-between gap-2 lg:justify-start">
            <div className="flex items-center gap-2">
              <div
                role="radiogroup"
                aria-label={dict.latest}
                className="inline-flex h-[var(--btn-h)] items-stretch rounded-[var(--radius)] bg-[var(--tertiary)] p-[0.2rem]"
              >
                {seg("latest", dict.latest)}
                {seg("az", dict.az)}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSeed((value) => value + 1);
                  setOrder("shuffle");
                }}
                className={
                  order === "shuffle"
                    ? "inline-flex h-[var(--btn-h)] cursor-pointer items-center gap-2.5 rounded-[var(--radius)] bg-[var(--tertiary)] px-4 text-[12px] font-medium transition-[scale,background-color,color] hover:bg-[var(--primary)] hover:text-[var(--background)] active:scale-[0.97]"
                    : "inline-flex h-[var(--btn-h)] cursor-pointer items-center gap-2.5 rounded-[var(--radius)] px-4 text-[12px] font-medium text-[var(--secondary)] transition-[scale,background-color,color] hover:bg-[var(--primary)] hover:text-[var(--background)] active:scale-[0.97]"
                }
              >
                <svg
                  viewBox="0 0 24 24"
                  width={16}
                  height={16}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d={SHUFFLE_PATH} />
                </svg>
                <span className="max-sm:hidden">{dict.shuffle}</span>
              </button>
            </div>
            <span className="text-[12px] text-[var(--secondary)] tabular-nums lg:hidden">
              {visible.length}/{items.length}
            </span>
          </div>
          <div
            role="group"
            aria-label={dict.filter}
            className="-mx-5 flex min-w-0 [scrollbar-width:none] items-center gap-1.5 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-1 lg:justify-end lg:px-0 [&::-webkit-scrollbar]:hidden"
            data-lenis-prevent-wheel
          >
            {[null, ...CATEGORY_KEYS].map((key) => {
              const on =
                key === null ? categories.length === 0 : categories.includes(key);
              const count =
                key === null
                  ? Object.values(counts).reduce((a, b) => a + b, 0)
                  : (counts[key] ?? 0);
              return (
                <button
                  key={key ?? "all"}
                  type="button"
                  aria-pressed={on}
                  onClick={() => (key === null ? setCategories([]) : toggle(key))}
                  className={
                    (on
                      ? "bg-[var(--primary)] text-[var(--background)] "
                      : "bg-[var(--tertiary)] text-[var(--secondary)] hover:text-[var(--primary)] ") +
                    "inline-flex h-[var(--btn-h)] shrink-0 cursor-pointer items-center gap-1.5 rounded-[var(--radius)] px-3.5 text-[12px] font-medium whitespace-nowrap transition-[scale,background-color,color] active:scale-[0.97]"
                  }
                >
                  {key === null ? dict.all : dict.categories[key]}
                  <span className="text-[10px] tabular-nums opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
          <span className="hidden text-[12px] text-[var(--secondary)] tabular-nums lg:block">
            {visible.length}/{items.length}
          </span>
        </div>
        {visible.length ? (
          <ul
            onPointerMove={tilt}
            onPointerLeave={untilt}
            className="m-0 mt-2 grid list-none grid-cols-1 gap-x-7 gap-y-4 p-0 md:grid-cols-2 xl:grid-cols-3"
          >
            {visible.map(({ item, index }) => (
              <li key={item.slug} className="min-w-0">
                {children[index]}
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-16 text-center text-[14px] text-[var(--secondary)]">
            <p className="m-0">{dict.empty}</p>
            <button
              type="button"
              onClick={clear}
              className="mt-4 h-[var(--btn-h)] cursor-pointer rounded-[var(--radius)] bg-[var(--tertiary)] px-4 text-[12px] font-medium hover:bg-[var(--primary)] hover:text-[var(--background)]"
            >
              {dict.clearAll}
            </button>
          </div>
        )}
      </section>

      {footer}

      {open ? (
        <Palette
          dict={dict}
          initialQuery={query}
          categories={categories}
          items={items}
          onClose={(value) => {
            setQuery(value);
            setOpen(false);
          }}
        />
      ) : null}
    </>
  );
}
