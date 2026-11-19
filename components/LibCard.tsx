import { existsSync } from "node:fs";
import { join } from "node:path";

import { Icon } from "@/components/Icon";
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
      className="group flex flex-col rounded-2xl bg-[#ececec]/65 p-1 outline-none transition-[translate,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgb(0_0_0/0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="flex min-h-12 items-center justify-between gap-3 px-3 py-2.5">
        <div className="min-w-0">
          <h2 className="m-0 truncate font-[family-name:var(--font-display)] text-[16px] leading-5 font-bold tracking-[-0.01em] text-ink">
            {lib.name}
          </h2>
          <p className="m-0 truncate text-[12px] leading-4 text-ink-secondary">
            {hostOf(lib.url)}
          </p>
        </div>
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#e0e0e0]/65 text-ink-secondary transition-colors duration-200 group-hover:bg-ink group-hover:text-app">
          <Icon name="link-external" size={14} />
        </span>
      </div>
      <div className="relative h-[260px] overflow-hidden rounded-xl bg-white inset-ring-[0.5px] inset-ring-ink/10">
        {hasPreview ? (
          <img
            src={`/previews/${lib.slug}.jpg`}
            alt={`${dict.preview} ${lib.name}`}
            width={1280}
            height={1000}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="size-full max-w-none object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="grid size-full place-items-center bg-ink/[0.04] text-center">
            <div>
              <p className="m-0 text-[22px] font-medium tracking-[-0.03em] text-ink">
                {lib.name}
              </p>
              <p className="m-0 mt-1 text-[12px] text-ink-secondary">
                {dict.noPreview}
              </p>
            </div>
          </div>
        )}
      </div>
    </a>
  );
}
