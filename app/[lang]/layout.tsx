import "../globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";

import { HTML_LANG, isLocale } from "@/lib/site";
import { CrispChat } from "@/scripts/crisp-chat";

import { fontVariables } from "../fonts";

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={HTML_LANG[lang]} data-skin="grok" className={fontVariables}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <CrispChat />
      </body>
    </html>
  );
}
