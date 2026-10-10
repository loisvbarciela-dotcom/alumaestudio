import { LANGS, PAGE_KEYS, SITE_URL, slugFor, pieces, posts, type Lang } from "../src/lib/i18n";

const groups: Record<Lang, string>[] = [];
const localized = (path: (lang: Lang) => string) => Object.fromEntries(LANGS.map(lang => [lang, `${SITE_URL}${path(lang)}`])) as Record<Lang, string>;
groups.push(localized(lang => `/${lang}`));
for (const page of PAGE_KEYS) groups.push(localized(lang => `/${lang}/${slugFor(page, lang)}`));
for (const piece of pieces) groups.push(localized(lang => `/${lang}/${slugFor("work", lang)}/${piece.slug}`));
for (const post of posts) groups.push(localized(lang => `/${lang}/blog/${post.slug}`));
const entries = groups.flatMap(group => LANGS.map(lang => `  <url>\n    <loc>${group[lang]}</loc>\n${LANGS.map(code => `    <xhtml:link rel="alternate" hreflang="${code}" href="${group[code]}"/>`).join("\n")}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${group.gl}"/>\n  </url>`));
await Bun.write("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join("\n")}\n</urlset>\n`);
console.log(`Sitemap: ${entries.length} localized URLs`);
