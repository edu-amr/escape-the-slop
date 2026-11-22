import localFont from "next/font/local";

const generalSans = localFont({
  src: "./fonts/general-sans.woff2",
  weight: "200 700",
  variable: "--font-general-sans",
  display: "swap",
});

const display = localFont({
  src: "./fonts/plaza.woff2",
  weight: "100 900",
  variable: "--font-display",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/geist-mono.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontVariables = `${generalSans.variable} ${display.variable} ${geistMono.variable}`;
