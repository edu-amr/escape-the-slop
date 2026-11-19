"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { Icon } from "@/components/Icon";
import type { Dictionary } from "@/data/i18n";
import {
  HTML_LANG,
  LOCALES,
  pathFor,
  SWITCH_LABEL,
  type Locale,
} from "@/lib/site";

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
      className="h-[15px] w-5 shrink-0 max-w-none rounded-[3px] object-cover inset-ring-[0.5px] inset-ring-ink/15"
    />
  );
}

export function LangSwitch({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`${dict.language}: ${NAME[locale]}`}
          className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-full bg-ink/[0.06] ps-3 pe-2.5 text-[13px] text-ink outline-none transition-colors duration-150 hover:bg-ink/10 focus-visible:outline-2 focus-visible:outline-focus data-[state=open]:bg-ink/10"
        >
          <Flag locale={locale} />
          <span>{SWITCH_LABEL[locale]}</span>
          <Icon name="chevron-down" size={12} className="text-ink-secondary" />
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
