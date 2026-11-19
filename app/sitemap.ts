import type { MetadataRoute } from "next";

import { HTML_LANG, LOCALES, urlFor } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries([
    ...LOCALES.map((locale) => [HTML_LANG[locale], urlFor(locale)]),
    ["x-default", urlFor("pt-br")],
  ]);
  return LOCALES.map((locale) => ({
    url: urlFor(locale),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: locale === "pt-br" ? 1 : 0.8,
    alternates: { languages },
  }));
}
