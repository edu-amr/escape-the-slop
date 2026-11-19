import { DICTIONARIES } from "@/data/i18n";
import { CATEGORY_KEYS, LIBS } from "@/data/libs";
import { AUTHOR, LOCALES, SITE_NAME, SITE_URL, urlFor } from "@/lib/site";

export function buildLlmsTxt() {
  const dict = DICTIONARIES.en;
  const lines = [
    `# ${SITE_NAME}`,
    "",
    `> ${dict.seo.description}`,
    "",
    `Maintained by [${AUTHOR.name}](${AUTHOR.url}). Open source, community-curated.`,
    "",
    "## Pages",
    "",
    ...LOCALES.map((locale) => `- [${locale}](${urlFor(locale)})`),
    "",
    "## Libraries",
    "",
  ];
  for (const key of CATEGORY_KEYS) {
    const items = LIBS.filter((lib) => lib.category === key);
    if (!items.length) continue;
    lines.push(`### ${dict.categories[key]}`, "");
    lines.push(...items.map((lib) => `- [${lib.name}](${lib.url})`), "");
  }
  lines.push(
    "## Optional",
    "",
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [Full list](${SITE_URL}/llms-full.txt)`,
    "",
  );
  return lines.join("\n");
}

export function buildLlmsFullTxt() {
  const dict = DICTIONARIES.en;
  const lines = [
    `# ${SITE_NAME} — full list`,
    "",
    dict.seo.description,
    "",
    `Total: ${LIBS.length} libraries. Categories: ${CATEGORY_KEYS.map((key) => dict.categories[key]).join(", ")}.`,
    "",
  ];
  for (const lib of LIBS) {
    lines.push(
      `## ${lib.name}`,
      "",
      `- URL: ${lib.url}`,
      `- Category: ${dict.categories[lib.category]}`,
      "",
    );
  }
  return lines.join("\n");
}
