import { LANGS, SITE_URL, type Lang } from "./i18n";

type HeadArgs = {
  lang: Lang;
  title: string;
  description: string;
  path: string; // path for this language, e.g. "/gl/traballo"
  alternates: Record<Lang, string>; // path per language
  image?: string;
};

export function buildHead({ lang, title, description, path, alternates, image }: HeadArgs) {
  const url = `${SITE_URL}${path}`;
  const meta = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { property: "og:url", content: url },
    { property: "og:locale", content: { gl: "gl_ES", es: "es_ES", en: "en_GB", ru: "ru_RU" }[lang] },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image?.startsWith("https://")) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }

  const links = [
    { rel: "canonical", href: url },
    ...LANGS.map((code) => ({
      rel: "alternate",
      hrefLang: code,
      href: `${SITE_URL}${alternates[code]}`,
    })),
    { rel: "alternate", hrefLang: "x-default", href: `${SITE_URL}${alternates.gl}` },
  ];

  return { meta, links };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aluma",
    url: SITE_URL,
    description:
      "Hybrid film studio based in Galicia, Spain. Live action and AI generation under human direction.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Galicia",
      addressCountry: "ES",
    },
    knowsLanguage: ["gl", "es", "en"],
  };
}
