"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { Icon } from "@/components/Icon";
import type { Dictionary } from "@/data/i18n";
import { HTML_LANG, type Locale, LOCALES, pathFor, SWITCH_LABEL } from "@/lib/site";

const FLAG: Record<Locale, string> = {
  "pt-br": "/flags/br.svg",
  en: "/flags/us.svg",
  fr: "/flags/fr.svg",
  es: "/flags/es.svg",
};

const NAME: Record<Locale, string> = {
  "pt-br": "Português (Brasil)",
  en: "English",
  fr: "Français",
  es: "Español",
};

function Flag({ locale }: { locale: Locale }) {
  return (
    <img
      src={FLAG[locale]}
      alt=""
      width={20}
      height={15}
      draggable={false}
      className="h-[15px] w-5 max-w-none shrink-0 rounded-[3px] object-cover inset-ring-[0.5px] inset-ring-ink/15"
    />
  );
}

export function LangSwitch({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${dict.language}: ${NAME[locale]}`}
          className="inline-flex h-[var(--btn-h)] cursor-pointer items-center gap-2 rounded-[var(--radius)] border border-[var(--tertiary)] bg-[var(--background)] px-3.5 text-[12px] font-medium whitespace-nowrap text-[var(--primary)] no-underline transition-[scale,border-color] duration-150 outline-none hover:border-[var(--secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] active:scale-[0.97] data-[state=open]:border-[var(--secondary)]"
        >
          <Flag locale={locale} />
          <span>{SWITCH_LABEL[locale]}</span>
          <svg
            viewBox="0 0 24 24"
            width={14}
            height={14}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="text-[var(--secondary)]"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        {LOCALES.map((item) => (
          <DropdownMenuItem key={item} asChild>
            <a
              href={pathFor(item)}
              hrefLang={HTML_LANG[item]}
              lang={HTML_LANG[item]}
              aria-current={item === locale ? "true" : undefined}
              className="flex items-center gap-2.5"
            >
              <Flag locale={item} />
              <span className="flex-1">{NAME[item]}</span>
              {item === locale ? <Icon name="check" size={14} /> : null}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
