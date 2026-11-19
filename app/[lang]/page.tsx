import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { HubPage } from "@/components/HubPage";
import { buildMetadata } from "@/lib/metadata";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/site";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang) : {};
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  if (lang === DEFAULT_LOCALE) permanentRedirect("/");
  return <HubPage locale={lang} />;
}
