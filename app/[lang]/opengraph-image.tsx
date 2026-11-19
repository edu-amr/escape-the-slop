import { notFound } from "next/navigation";

import { OG_SIZE, ogImage } from "@/lib/og";
import { isLocale, LOCALES } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Escape the Slop";

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return ogImage(lang);
}
