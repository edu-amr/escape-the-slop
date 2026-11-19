"use client";

import { useState } from "react";

import { SearchField } from "@/components/SearchField";
import { Segmented, SegmentedItem } from "@/components/Segmented";
import type { Dictionary } from "@/data/i18n";
import { CATEGORY_KEYS, type CategoryKey } from "@/data/libs";

type Item = { slug: string; name: string; category: CategoryKey };

export function LibGrid({
  dict,
  items,
  children,
}: {
  dict: Dictionary;
  items: Item[];
  children: React.ReactNode[];
}) {
  const [category, setCategory] = useState<"all" | CategoryKey>("all");
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();
  const visible = items.flatMap((item, index) =>
    (category === "all" || item.category === category) &&
    (!term || item.name.toLowerCase().includes(term))
      ? [{ item, node: children[index] }]
      : [],
  );

  return (
    <section aria-label={dict.title} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Segmented
          aria-label={dict.filter}
          value={category}
          onValueChange={(value) => setCategory(value as "all" | CategoryKey)}
          className="h-auto max-w-full flex-wrap rounded-2xl bg-[#ececec]/65"
        >
          <SegmentedItem value="all">{dict.all}</SegmentedItem>
          {CATEGORY_KEYS.map((key) => (
            <SegmentedItem key={key} value={key}>
              {dict.categories[key]}
            </SegmentedItem>
          ))}
        </Segmented>
        <SearchField
          className="w-64 max-sm:w-full"
          aria-label={dict.searchLabel}
          placeholder={dict.search}
          clearLabel={dict.clear}
          value={query}
          onValueChange={setQuery}
        />
      </div>
      {visible.length ? (
        <ul className="m-0 grid list-none grid-cols-3 gap-5 p-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {visible.map(({ item, node }) => (
            <li key={item.slug} className="min-w-0">
              {node}
            </li>
          ))}
        </ul>
      ) : (
        <p className="m-0 py-16 text-center text-[14px] text-ink-secondary">
          {dict.empty}
        </p>
      )}
    </section>
  );
}
