import { FlowBackground } from "@/components/FlowBackground";
import { GithubLink } from "@/components/GithubLink";
import { LangSwitch } from "@/components/LangSwitch";
import { LibCard } from "@/components/LibCard";
import { LibGrid } from "@/components/LibGrid";
import { DICTIONARIES } from "@/data/i18n";
import { hostOf, LIBS } from "@/data/libs";
import { AUTHOR, HTML_LANG, type Locale, SITE_NAME, SITE_URL, urlFor } from "@/lib/site";

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
    <div className="hub relative isolate">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      >
        <FlowBackground className="size-full" />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <LibGrid
        dict={dict}
        items={LIBS.map(({ slug, name, category, url }) => ({
          slug,
          name,
          category,
          url,
          host: hostOf(url),
        }))}
        byline={
          <a
            href={AUTHOR.url}
            target="_blank"
            rel="noopener"
            className="inline-flex h-6 items-center gap-1.5 text-[12px] leading-none text-[var(--secondary)] no-underline transition-colors hover:text-[var(--primary)]"
          >
            <img
              src="/riivo-dog.webp"
              alt=""
              width={96}
              height={96}
              className="block size-6 max-w-none"
            />
            <span className="leading-none">
              {dict.by}: <span className="font-medium text-[var(--primary)]">riivo</span>
            </span>
          </a>
        }
        actions={
          <>
            <GithubLink label={dict.github} />
            <LangSwitch locale={locale} dict={dict} />
          </>
        }
        hero={
          <header className="flex flex-col items-center gap-2 px-5 pt-14 pb-10 text-center sm:px-8 sm:pt-[4.5rem]">
            <h1 className="m-0 font-[family-name:var(--font-display)] text-[38px] leading-[1] font-extrabold tracking-[-0.04em] text-balance sm:text-[64px]">
              {dict.title}
            </h1>
            <p className="m-0 max-w-[44rem] text-[16px] leading-6 font-medium text-balance text-[var(--primary)]/70">
              {dict.lede}
            </p>
          </header>
        }
        footer={
          <footer className="mx-auto flex max-w-[120rem] flex-col gap-2 px-5 pt-12 pb-6 text-[12px] font-medium sm:px-8 md:flex-row md:items-center md:justify-between xl:px-12">
            <p className="m-0">
              <span className="text-[var(--secondary)]">{dict.footerTag}</span>
              <span className="opacity-30">{dict.footerFade}</span>
            </p>
            <a
              href={AUTHOR.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-[var(--secondary)] no-underline transition-colors hover:text-[var(--primary)]"
            >
              <img
                src="/riivo-dog.webp"
                alt=""
                width={96}
                height={96}
                className="size-6 max-w-none"
              />
              {dict.by} {AUTHOR.name}
            </a>
          </footer>
        }
      >
        {LIBS.map((lib) => (
          <LibCard key={lib.slug} lib={lib} dict={dict} />
        ))}
      </LibGrid>
    </div>
  );
}
