import { existsSync } from "node:fs";
import { join } from "node:path";

import type { Dictionary } from "@/data/i18n";
import { hostOf, type Lib } from "@/data/libs";

export function LibCard({ lib, dict }: { lib: Lib; dict: Dictionary }) {
  const host = hostOf(lib.url);
  const hasPreview = existsSync(
    join(process.cwd(), "public", "previews", `${lib.slug}.jpg`),
  );

  return (
    <a
      href={lib.url}
      target="_blank"
      rel="noopener"
      aria-label={`${lib.name} (${dict.newTab})`}
      className="hub-card group relative flex flex-col rounded-[var(--radius)] p-2 no-underline outline-none focus-visible:shadow-[inset_0_0_0_2px_color-mix(in_srgb,var(--primary)_45%,transparent)] active:scale-[0.98] motion-reduce:active:scale-100"
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--radius-inner)] bg-[var(--tertiary)]">
        {hasPreview ? (
          <img
            src={`/previews/${lib.slug}.jpg`}
            alt={`${dict.preview} ${lib.name}`}
            width={1280}
            height={1000}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="size-full max-w-none rounded-[var(--radius-inner)] object-cover object-top outline-1 -outline-offset-1 outline-[var(--tertiary)]"
          />
        ) : (
          <div className="grid size-full place-items-center text-center">
            <div>
              <p className="m-0 text-[22px] font-medium tracking-[-0.03em]">{lib.name}</p>
              <p className="m-0 mt-1 text-[12px] text-[var(--secondary)]">
                {dict.noPreview}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="flex h-11 items-center justify-between gap-3 px-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <img
            src={`https://www.google.com/s2/favicons?domain=${host}&sz=32`}
            alt=""
            width={16}
            height={16}
            loading="lazy"
            decoding="async"
            className="size-4 shrink-0 rounded-full"
          />
          <h2 className="m-0 truncate text-[14px] leading-6 font-medium tracking-[-0.03em]">
            {lib.name}
          </h2>
          <span className="shrink-0 text-[12px] text-[var(--secondary)] max-sm:hidden">
            · {dict.categories[lib.category]}
          </span>
        </div>
        <svg
          viewBox="0 0 256 256"
          width={12}
          height={12}
          fill="currentColor"
          aria-hidden="true"
          className="hub-open shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
        >
          <path d="M200 64v104a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 0 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16h104a8 8 0 0 1 8 8" />
        </svg>
      </div>
    </a>
  );
}
