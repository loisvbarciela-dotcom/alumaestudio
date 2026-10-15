// Converts the Markdown articles in propuestas-web/blog-tu-pelicula (es + gl/en/ru)
// into src/content/posts-tu-pelicula.json, using the same shape as posts.json
// (slug, data, imaxe, titulo, extracto, corpo) plus optional meta, cta, faq and
// enlaces fields that the current blog components ignore.
// It also rewrites /es/... links in the translated Markdown to each language's URLs.
//
// Usage: node scripts/build-blog-posts.mjs [--check]
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "propuestas-web/blog-tu-pelicula");
const OUT = join(ROOT, "src/content/posts-tu-pelicula.json");
const LANGS = ["gl", "es", "en", "ru"];
const SITE = "https://alumafilms.es";

// Mirrors SLUGS in src/lib/i18n.ts.
const SLUGS = {
  work: { gl: "traballo", es: "trabajo", en: "work", ru: "raboty" },
  love: { gl: "a-tua-pelicula", es: "tu-pelicula", en: "your-film", ru: "vash-film" },
  method: { gl: "metodo", es: "metodo", en: "method", ru: "metod" },
  ethics: { gl: "etica", es: "etica", en: "ethics", ru: "etika" },
  studio: { gl: "estudio", es: "estudio", en: "studio", ru: "studiya" },
  blog: { gl: "blog", es: "blog", en: "blog", ru: "blog" },
  contact: { gl: "contacto", es: "contacto", en: "contact", ru: "kontakty" },
};

const IMAGES = {
  "love-hero.jpg": "/__l5e/assets-v1/366846b8-e9ab-4737-af7a-298781b66aa1/love-hero.jpg",
  "love-film-thumbnail.png": "/__l5e/assets-v1/a4fd8c17-f218-4d3b-a8f3-51efadc3b126/love-film-thumbnail.png",
};
for (const f of readdirSync(join(ROOT, "public/posters"))) IMAGES[f] = `/posters/${f}`;
for (const f of readdirSync(join(ROOT, "public/placeholders"))) IMAGES[f] = `/placeholders/${f}`;

function localizePath(path, lang) {
  const m = path.match(/^\/es\/([^/#?]+)(.*)$/);
  if (!m) return path;
  const [, section, rest] = m;
  const page = Object.keys(SLUGS).find((k) => SLUGS[k].es === section);
  if (!page) throw new Error(`Unknown section in link: ${path}`);
  return `/${lang}/${SLUGS[page][lang]}${rest}`;
}

function parseText(text, file) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`No front matter: ${file}`);
  const fm = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i < 0) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (value.startsWith("[")) value = JSON.parse(value);
    else if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    fm[key] = value;
  }
  return { fm, body: m[2] };
}

function localizeText(text, lang) {
  const slug = (text.match(/^slug: (.*)$/m) || [])[1]?.trim();
  return text
    .replace(/\]\((\/es\/[^)]+)\)/g, (_, u) => `](${localizePath(u, lang)})`)
    .replace(/"(\/es\/[^"]+)"/g, (_, u) => `"${localizePath(u, lang)}"`)
    .replace(/ — (\/es\/[^"\s]+)"/g, (_, u) => ` — ${localizePath(u, lang)}"`)
    .replace(/^url: .*$/m, `url: ${SITE}/${lang}/blog/${slug}`);
}

const inline = (s, links) =>
  s
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => {
      links?.push({ texto: t.replace(/\*\*|`/g, ""), url: u });
      return t;
    })
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[\s(«“])\*([^*\s][^*]*?)\*(?=[\s.,;:)»”]|$)/g, "$1$2")
    .replace(/\s+/g, " ")
    .trim();

function toPost(body) {
  const corpo = [];
  const faq = [];
  const enlaces = [];
  let title = "";
  let cta = null;
  let afterRule = false;
  let h3 = null; // pending ### heading, merged with the paragraph that follows it
  let para = [];
  let table = [];

  const emit = (text, { list = false } = {}) => {
    if (h3 !== null) {
      const q = h3;
      h3 = null;
      if (!list) {
        if (/[?？]$/.test(q)) faq.push({ q, a: text });
        corpo.push(`· ${q}${/[?？.:]$/.test(q) ? " " : " — "}${text}`);
        return;
      }
      corpo.push(q);
    }
    corpo.push(text);
  };
  const flushH3 = () => {
    if (h3 !== null) { corpo.push(h3); h3 = null; }
  };
  const flushPara = () => {
    if (!para.length) return;
    const raw = para.join(" ");
    para = [];
    if (afterRule) {
      // Closing CTA line: keep the sentence, move the arrow links to `cta`.
      const links = [];
      const plain = inline(raw.replace(/\s*→\s*\[[^\]]+\]\([^)]+\)(\s*·\s*\[[^\]]+\]\([^)]+\))*/g, (m) => {
        inline(m, links);
        return "";
      }), enlaces);
      if (plain) corpo.push(plain);
      if (links[0]) cta = links[0];
      enlaces.push(...links);
      return;
    }
    const text = inline(raw, enlaces);
    if (text) emit(text);
  };
  const flushTable = () => {
    if (!table.length) return;
    flushH3();
    const rows = table.map((r) => r.replace(/^\||\|$/g, "").split("|").map((c) => inline(c, enlaces)));
    const [head, , ...data] = rows;
    if (head.length === 2) {
      corpo.push(`${head[0]} — ${head[1]}`);
      for (const r of data) corpo.push(`· ${r[0]} — ${r[1]}`);
    } else {
      for (const r of data) corpo.push(`· ${r[0]} — ${r.slice(1).map((c, i) => `${head[i + 1]}: ${c}`).join("; ")}`);
    }
    table = [];
  };

  for (const line of body.split("\n")) {
    const l = line.trimEnd();
    if (l.startsWith("|")) { flushPara(); table.push(l); continue; }
    flushTable();
    if (!l.trim()) { flushPara(); continue; }
    if (/^---+$/.test(l)) { flushPara(); flushH3(); afterRule = true; continue; }
    if (l.startsWith("# ")) { flushPara(); title = inline(l.slice(2)); continue; }
    if (l.startsWith("## ")) { flushPara(); flushH3(); corpo.push(`# ${inline(l.slice(3), enlaces)}`); continue; }
    if (l.startsWith("### ")) { flushPara(); flushH3(); h3 = inline(l.slice(4), enlaces); continue; }
    if (/^[-*] /.test(l) || /^\d+\. /.test(l)) {
      flushPara();
      const item = /^[-*] /.test(l) ? `· ${inline(l.slice(2), enlaces)}` : inline(l, enlaces);
      emit(item, { list: true });
      continue;
    }
    if (l.startsWith("> ")) { para.push(l.slice(2)); continue; }
    para.push(l.trim());
  }
  flushPara();
  flushTable();
  flushH3();
  const seen = new Set();
  const uniq = enlaces.filter((e) => (seen.has(e.url) ? false : seen.add(e.url)));
  return { title, corpo, faq, cta, enlaces: uniq };
}

const check = process.argv.includes("--check");
const files = readdirSync(SRC).filter((f) => /^\d\d-.+\.md$/.test(f)).sort();
const posts = [];
const problems = [];

for (const file of files) {
  const post = { slug: "", data: "", imaxe: null, titulo: {}, extracto: {}, corpo: {}, meta: {}, cta: {}, faq: {}, enlaces: {} };
  for (const lang of LANGS) {
    const path = lang === "es" ? join(SRC, file) : join(SRC, lang, file);
    if (!existsSync(path)) { problems.push(`missing ${lang}/${file}`); continue; }
    const original = readFileSync(path, "utf8");
    const text = lang === "es" ? original : localizeText(original, lang);
    if (text !== original && !check) writeFileSync(path, text);
    const { fm, body } = parseText(text, path);
    if (lang === "es") {
      post.slug = fm.slug;
      post.data = fm.publicacion_sugerida;
      const img = (fm.imagen_destacada.match(/([\w.-]+\.(?:jpg|png))/) || [])[1];
      post.imaxe = (img && IMAGES[img]) || IMAGES["love-film-thumbnail.png"];
    } else if (fm.slug !== post.slug) problems.push(`${lang}/${file}: slug mismatch`);
    const parsed = toPost(body);
    post.titulo[lang] = fm.titulo;
    post.extracto[lang] = fm.meta_description;
    post.corpo[lang] = parsed.corpo;
    post.meta[lang] = { title: fm.meta_title, description: fm.meta_description };
    const ctaUrl = parsed.cta ? (lang === "es" ? parsed.cta.url : localizePath(parsed.cta.url, lang)) : `/${lang}/${SLUGS.love[lang]}`;
    post.cta[lang] = { texto: parsed.cta?.texto ?? "", url: ctaUrl };
    post.faq[lang] = parsed.faq;
    post.enlaces[lang] = parsed.enlaces.map((e) => ({ ...e, url: lang === "es" ? e.url : localizePath(e.url, lang) }));
    if (fm.meta_title.length > 60) problems.push(`${lang}/${file}: meta_title ${fm.meta_title.length}`);
    if (fm.meta_description.length > 155) problems.push(`${lang}/${file}: meta_description ${fm.meta_description.length}`);
    if (!parsed.corpo.length) problems.push(`${lang}/${file}: empty body`);
    if (parsed.title !== fm.titulo) problems.push(`${lang}/${file}: H1 differs from titulo`);
    if (/[!¡]/.test(parsed.corpo.join(" "))) problems.push(`${lang}/${file}: exclamation mark`);
    if (/\]\(|\*\*|`/.test(parsed.corpo.join(" "))) problems.push(`${lang}/${file}: leftover Markdown`);
  }
  for (const lang of LANGS) {
    if (post.corpo[lang] && post.corpo.es && post.corpo[lang].length !== post.corpo.es.length)
      problems.push(`${lang}/${file}: ${post.corpo[lang].length} paragraphs vs ${post.corpo.es.length} in es`);
  }
  posts.push(post);
}

if (problems.length) console.error("Problems:\n" + problems.join("\n"));
if (!check) {
  writeFileSync(OUT, JSON.stringify(posts, null, 2) + "\n");
  console.log(`Wrote ${posts.length} posts to ${OUT}`);
}
process.exitCode = problems.length ? 1 : 0;
