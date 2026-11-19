import { existsSync } from "node:fs";
import { join } from "node:path";

import { CATEGORY_KEYS, LIBS } from "../data/libs.ts";

const errors = [];
const slugs = new Set();
const urls = new Set();

for (const lib of LIBS) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(lib.slug)) {
    errors.push(`${lib.slug}: slug deve ser kebab-case (a-z, 0-9 e hífen)`);
  }
  if (slugs.has(lib.slug)) errors.push(`${lib.slug}: slug duplicado`);
  slugs.add(lib.slug);

  try {
    const url = new URL(lib.url);
    if (url.protocol !== "https:") errors.push(`${lib.slug}: a URL deve usar https`);
    const key = url.host.replace(/^www\./, "");
    if (urls.has(key)) errors.push(`${lib.slug}: domínio duplicado (${key})`);
    urls.add(key);
  } catch {
    errors.push(`${lib.slug}: URL inválida (${lib.url})`);
  }

  if (!lib.name?.trim()) errors.push(`${lib.slug}: nome vazio`);
  if (!CATEGORY_KEYS.includes(lib.category)) {
    errors.push(`${lib.slug}: categoria inválida (${lib.category})`);
  }
  if (!existsSync(join("public", "previews", `${lib.slug}.jpg`))) {
    console.warn(`aviso: ${lib.slug} está sem prévia (public/previews/${lib.slug}.jpg)`);
  }
}

if (errors.length) {
  console.error(errors.map((message) => `erro: ${message}`).join("\n"));
  process.exit(1);
}
console.log(`ok: ${LIBS.length} bibliotecas válidas`);
