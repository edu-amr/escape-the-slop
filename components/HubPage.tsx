import PixelBlast from "@/components/PixelBlast";
import { LangSwitch } from "@/components/LangSwitch";
import { LibCard } from "@/components/LibCard";
import { LibGrid } from "@/components/LibGrid";
import { DICTIONARIES } from "@/data/i18n";
import { LIBS } from "@/data/libs";
import {
  AUTHOR,
  HTML_LANG,
  SITE_NAME,
  SITE_URL,
  urlFor,
  type Locale,
} from "@/lib/site";

export function HubPage({ locale }: { locale: Locale }) {
  const dict = DICTIONARIES[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: urlFor(locale),
        inLanguage: HTML_LANG[locale],
        description: dict.seo.description,
        publisher: { "@id": `${SITE_URL}/#publisher` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#publisher`,
        name: AUTHOR.name,
        url: AUTHOR.url,
        logo: `${SITE_URL}/riivo-dog.webp`,
      },
      {
        "@type": "CollectionPage",
        "@id": `${urlFor(locale)}#collection`,
        name: dict.seo.title,
        url: urlFor(locale),
        inLanguage: HTML_LANG[locale],
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: LIBS.length,
          itemListElement: LIBS.map((lib, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: lib.name,
            url: lib.url,
          })),
        },
      },
    ],
  };

  return (
    <div className="relative isolate overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[440px] opacity-40 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      >
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#8ec5ff"
          patternScale={2.4}
          patternDensity={1}
          speed={0.4}
          edgeFade={0.1}
          glow={0}
          lightMode
        />
      </div>
      <main className="relative mx-auto w-full max-w-[1120px] px-6 pt-6 pb-24 max-sm:px-4">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="flex items-center justify-between gap-3">
          <a
            href={AUTHOR.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full py-1 pe-3 ps-1 text-[14px] text-ink-secondary no-underline outline-none transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-focus"
          >
            <img
              src="/riivo-dog.webp"
              alt=""
              width={96}
              height={96}
              className="size-7 max-w-none"
            />
            <span>
              {dict.by}: <span className="font-medium text-ink">riivo</span>
            </span>
          </a>
          <LangSwitch locale={locale} dict={dict} />
        </div>
        <header className="mt-10 mb-10 max-sm:mt-8 max-sm:mb-7">
          <h1 className="m-0 font-[family-name:var(--font-display)] text-[40px] leading-[0.95] font-extrabold tracking-normal text-ink sm:text-[60px]">
            {dict.title}
          </h1>
          <p className="mt-3 max-w-[56ch] text-[17px] leading-6 text-ink-secondary">
            {dict.lede}
          </p>
        </header>
        <LibGrid
          dict={dict}
          items={LIBS.map(({ slug, name, category }) => ({
            slug,
            name,
            category,
          }))}
        >
          {LIBS.map((lib) => (
            <LibCard key={lib.slug} lib={lib} dict={dict} />
          ))}
        </LibGrid>
      </main>
    </div>
  );
}
