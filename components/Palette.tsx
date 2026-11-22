"use client";

import { useEffect, useRef, useState } from "react";

import type { Dictionary } from "@/data/i18n";
import type { CategoryKey } from "@/data/libs";

export type PaletteItem = { slug: string; name: string; url: string; host: string };

export function Palette({
  dict,
  initialQuery,
  categories,
  items,
  onClose,
}: {
  dict: Dictionary;
  initialQuery: string;
  categories: CategoryKey[];
  items: (PaletteItem & { category: CategoryKey })[];
  onClose: (query: string) => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [active, setActive] = useState(0);
  const term = query.trim().toLowerCase();
  const results = items.filter(
    (item) =>
      (!categories.length || categories.includes(item.category)) &&
      (!term ||
        item.name.toLowerCase().includes(term) ||
        item.host.toLowerCase().includes(term) ||
        dict.categories[item.category].toLowerCase().includes(term)),
  );
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  useEffect(() => {
    input.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    list.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const current = Math.min(active, Math.max(results.length - 1, 0));

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose(query);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(Math.min(current + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(Math.max(current - 1, 0));
    } else if (event.key === "Enter" && results[current]) {
      window.open(results[current].url, "_blank", "noopener");
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dict.searchOrFilter}
      onKeyDown={onKeyDown}
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-start justify-center px-5 pt-[10vh] max-sm:items-end max-sm:px-0 max-sm:pt-0"
    >
      <div
        aria-hidden="true"
        onClick={() => onClose(query)}
        className="absolute inset-0 bg-black/40 backdrop-blur-[3px]"
      />
      <div className="relative flex h-[min(34rem,70vh)] w-[40rem] max-w-full flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--tertiary)] bg-[var(--background)] text-[var(--primary)] shadow-[0_24px_80px_#0004] max-sm:h-[86svh] max-sm:rounded-b-none">
        <div className="flex flex-col gap-2.5 border-b border-[var(--tertiary)] px-4 py-3.5">
          <input
            ref={input}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-label={dict.searchLabel}
            placeholder={dict.searchPlaceholder}
            autoComplete="off"
            spellCheck={false}
            className="w-full border-0 bg-transparent text-[16px] leading-[1.4] tracking-[-0.01em] outline-none placeholder:text-[var(--secondary)]"
          />
        </div>
        <ul
          ref={list}
          id="palette-list"
          role="listbox"
          data-lenis-prevent
          className="m-0 min-h-0 flex-1 list-none overflow-auto overscroll-contain p-1.5"
        >
          {results.length ? (
            results.map((item, index) => (
              <li key={item.slug} role="presentation">
                <a
                  role="option"
                  aria-selected={index === current}
                  data-index={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener"
                  onMouseMove={() => setActive(index)}
                  className="flex items-center gap-3 rounded-[var(--radius-inner)] px-2.5 py-2 text-[14px] no-underline aria-selected:bg-[var(--tertiary)]"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${item.host}&sz=32`}
                    alt=""
                    width={20}
                    height={20}
                    loading="lazy"
                    className="size-5 shrink-0 rounded-full"
                  />
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  <span className="shrink-0 text-[12px] text-[var(--secondary)]">
                    {dict.categories[item.category]}
                  </span>
                </a>
              </li>
            ))
          ) : (
            <li className="p-8 text-center text-[var(--secondary)]">{dict.empty}</li>
          )}
        </ul>
        <div className="flex items-center gap-4 border-t border-[var(--tertiary)] px-4 py-2.5 text-[11px] text-[var(--secondary)] max-sm:hidden">
          <span>
            <kbd className="rounded-md bg-[var(--tertiary)] px-1.5 py-1 font-mono">↑</kbd>{" "}
            <kbd className="rounded-md bg-[var(--tertiary)] px-1.5 py-1 font-mono">↓</kbd>{" "}
            {dict.hintNavigate}
          </span>
          <span>
            <kbd className="rounded-md bg-[var(--tertiary)] px-1.5 py-1 font-mono">↵</kbd>{" "}
            {dict.hintOpen}
          </span>
          <span className="flex-1" />
          <span>
            <kbd className="rounded-md bg-[var(--tertiary)] px-1.5 py-1 font-mono">
              ESC
            </kbd>{" "}
            {dict.close}
          </span>
          <span className="tabular-nums">{results.length}</span>
        </div>
      </div>
    </div>
  );
}
