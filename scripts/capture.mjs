import { chromium } from "playwright-core";
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import { LIBS } from "../data/libs.ts";

function findChromium() {
  const root = join(homedir(), "Library/Caches/ms-playwright");
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  if (!existsSync(root)) return undefined;
  for (const dir of readdirSync(root).filter((d) => d.startsWith("chromium"))) {
    for (const sub of readdirSync(join(root, dir))) {
      for (const name of [
        "chrome-headless-shell",
        "Chromium.app/Contents/MacOS/Chromium",
      ]) {
        const candidate = join(root, dir, sub, name);
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return undefined;
}

const only = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: findChromium() });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
for (const lib of LIBS.filter(
  (item) => !only.length || only.includes(item.slug),
)) {
  try {
    await page.goto(lib.url, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(lib.wait ?? 2500);
    await page.screenshot({
      path: `public/previews/${lib.slug}.jpg`,
      type: "jpeg",
      quality: 82,
    });
    console.log("ok", lib.slug, "|", (await page.title()).slice(0, 70));
  } catch (error) {
    console.log("falhou", lib.slug, String(error).slice(0, 120));
  }
}
await browser.close();
