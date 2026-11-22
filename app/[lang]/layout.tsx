import "../globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SmoothScroll } from "@/components/SmoothScroll";
import { HTML_LANG, isLocale } from "@/lib/site";
import { CrispChat } from "@/scripts/crisp-chat";

import { fontVariables } from "../fonts";

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <html
      lang={isLocale(lang) ? HTML_LANG[lang] : "pt-BR"}
      data-skin="grok"
      className={fontVariables}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <SmoothScroll />
        <CrispChat />
      </body>
    </html>
  );
}
