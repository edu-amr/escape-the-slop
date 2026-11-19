import "../globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CrispChat } from "@/scripts/crisp-chat";

import { fontVariables } from "../fonts";

export default function PtLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-skin="grok" className={fontVariables}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        <CrispChat />
      </body>
    </html>
  );
}
