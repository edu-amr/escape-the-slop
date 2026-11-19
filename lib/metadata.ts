import type { Metadata } from "next";

import { DICTIONARIES } from "@/data/i18n";
import {
  AUTHOR,
  HTML_LANG,
  type Locale,
  LOCALES,
  OG_LOCALE,
  SITE_NAME,
  SITE_URL,
  urlFor,
} from "@/lib/site";

export function buildMetadata(locale: Locale): Metadata {
  const dict = DICTIONARIES[locale];
  const languages = Object.fromEntries([
    ...LOCALES.map((item) => [HTML_LANG[item], urlFor(item)]),
    ["x-default", urlFor("pt-br")],
  ]);
  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: dict.seo.title },
    description: dict.seo.description,
    keywords: dict.seo.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    creator: AUTHOR.name,
    publisher: AUTHOR.name,
    category: "technology",
    alternates: { canonical: urlFor(locale), languages },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: dict.seo.title,
      description: dict.seo.description,
      url: urlFor(locale),
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((item) => item !== locale).map(
        (item) => OG_LOCALE[item],
      ),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.title,
      description: dict.seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}
