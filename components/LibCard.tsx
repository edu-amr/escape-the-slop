import { existsSync } from "node:fs";
import { join } from "node:path";

import type { Dictionary } from "@/data/i18n";
import { hostOf, type Lib } from "@/data/libs";

export function LibCard({ lib, dict }: { lib: Lib; dict: Dictionary }) {
  const hasPreview = existsSync(
    join(process.cwd(), "public", "previews", `${lib.slug}.jpg`),
  );

  return (
    <a
      href={lib.url}
      target="_blank"
      rel="noopener"
      aria-label={`${lib.name} (${dict.newTab})`}
      className="group relative flex flex-col overflow-hidden rounded-[14px] bg-[#ececec]/65 transition-[translate,box-shadow,background-color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none hover:-translate-y-0.5 hover:bg-[#ececec] hover:shadow-[0_14px_28px_-14px_rgb(0_0_0/0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative m-2 mb-0 aspect-[16/10] overflow-hidden rounded-lg bg-white">
        {hasPreview ? (
          <img
            src={`/previews/${lib.slug}.jpg`}
            alt={`${dict.preview} ${lib.name}`}
            width={1280}
            height={1000}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 size-full max-w-none scale-[1.01] object-cover object-top transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-[1.01]"
          />
        ) : (
          <div className="grid size-full place-items-center bg-ink/[0.04] text-center">
            <div>
              <p className="m-0 text-[22px] font-medium tracking-[-0.03em] text-ink">
                {lib.name}
              </p>
              <p className="m-0 mt-1 text-[12px] text-ink-secondary">{dict.noPreview}</p>
            </div>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] rounded-lg inset-ring-1 inset-ring-ink/[0.06]"
        />
        <span className="absolute right-2.5 bottom-2.5 z-[2] inline-flex items-center rounded-full border border-white/15 bg-black/75 px-[11px] py-[5px] text-[10.5px] leading-none font-bold tracking-[0.055em] text-white uppercase">
          {hostOf(lib.url)}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-4 pt-4 pb-[18px]">
        <div className="flex items-center justify-between gap-3">
          <h2 className="m-0 truncate font-[family-name:var(--font-display)] text-[16px] leading-tight font-medium tracking-[-0.01em] text-ink">
            {lib.name}
          </h2>
          <svg
            viewBox="0 0 24 24"
            width={18}
            height={18}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0 text-blue-500 transition-colors duration-200 group-hover:text-blue-700"
          >
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </div>
        <p className="m-0 text-[11px] font-medium tracking-[0.09em] text-ink-secondary uppercase">
          {dict.categories[lib.category]}
        </p>
      </div>
    </a>
  );
}
