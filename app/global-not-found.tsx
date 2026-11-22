import "./globals.css";

import type { Metadata } from "next";

import { NotFoundTerminal } from "@/components/NotFoundTerminal";

import { fontVariables } from "./fonts";

export const metadata: Metadata = {
  title: "Página não encontrada — Escape the Slop",
  description: "A página que você procura não existe.",
};

export default function GlobalNotFound() {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body style={{ margin: 0, background: "#fff" }}>
        <NotFoundTerminal />
      </body>
    </html>
  );
}
