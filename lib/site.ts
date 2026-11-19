export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://escape-the-slop.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "Escape the Slop";
export const AUTHOR = { name: "riivo", url: "https://riivo.com.br" };

export const LOCALES = ["pt-br", "en", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "pt-br";

export const HTML_LANG: Record<Locale, string> = {
  "pt-br": "pt-BR",
  en: "en",
  fr: "fr",
  es: "es",
};

export const OG_LOCALE: Record<Locale, string> = {
  "pt-br": "pt_BR",
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
};

export const SWITCH_LABEL: Record<Locale, string> = {
  "pt-br": "pt-BR",
  en: "en",
  fr: "fr",
  es: "es",
};

export function pathFor(locale: Locale) {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

export function urlFor(locale: Locale) {
  return locale === DEFAULT_LOCALE ? `${SITE_URL}/` : `${SITE_URL}/${locale}`;
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
