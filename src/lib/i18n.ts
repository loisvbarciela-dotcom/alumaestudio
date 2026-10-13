import gl from "@/content/i18n/gl.json";
import es from "@/content/i18n/es.json";
import en from "@/content/i18n/en.json";
import ru from "@/content/i18n/ru.json";
import piecesData from "@/content/pieces.json";
import postsData from "@/content/posts.json";
import camisetaReconquistaAsset from "@/assets/work/camiseta-reconquista.png.asset.json";
import viaxeNoTempoAsset from "@/assets/work/viaxe-no-tempo.png.asset.json";

export const LANGS = ["gl", "es", "en", "ru"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "gl";

export type Dict = typeof gl;

const DICTS: Record<Lang, Dict> = {
  gl,
  es: es as unknown as Dict,
  en: en as unknown as Dict,
  ru: ru as unknown as Dict,
};

export function isLang(value: string | undefined): value is Lang {
  return !!value && (LANGS as readonly string[]).includes(value);
}

export function dict(lang: Lang): Dict {
  return DICTS[lang];
}

/** Canonical page keys and their localised URL slugs. */
export type PageKey = "work" | "love" | "method" | "ethics" | "studio" | "blog" | "contact";

export const SLUGS: Record<PageKey, Record<Lang, string>> = {
  work: { gl: "traballo", es: "trabajo", en: "work", ru: "raboty" },
  love: { gl: "a-tua-pelicula", es: "tu-pelicula", en: "your-film", ru: "vash-film" },
  method: { gl: "metodo", es: "metodo", en: "method", ru: "metod" },
  ethics: { gl: "etica", es: "etica", en: "ethics", ru: "etika" },
  studio: { gl: "estudio", es: "estudio", en: "studio", ru: "studiya" },
  blog: { gl: "blog", es: "blog", en: "blog", ru: "blog" },
  contact: { gl: "contacto", es: "contacto", en: "contact", ru: "kontakty" },
};

export const PAGE_KEYS = Object.keys(SLUGS) as PageKey[];

export function slugFor(page: PageKey, lang: Lang): string {
  return SLUGS[page][lang];
}

export function pageFromSlug(slug: string, lang: Lang): PageKey | null {
  return PAGE_KEYS.find((key) => SLUGS[key][lang] === slug) ?? null;
}

export function pathFor(page: PageKey, lang: Lang): string {
  return `/${lang}/${slugFor(page, lang)}`;
}

export function homePath(lang: Lang): string {
  return `/${lang}`;
}

/** Preserve unprefixed paths under the default locale without redirecting twice.
 * Infrastructure paths (server functions, API routes, Lovable previews, static
 * assets) and anything with a file extension never redirect. */
export function galicianRedirectPath(pathname: string): string | null {
  if (pathname === "/" || isLang(pathname.split("/")[1])) return null;
  const NON_PAGE_PREFIXES = ["/lovable/", "/api/", "/_serverFn/", "/_build/", "/assets/", "/__l5e/", "/_"];
  if (NON_PAGE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return null;
  if (pathname === "/sitemap.xml" || pathname === "/robots.txt") return null;
  const lastSegment = pathname.split("/").pop() ?? "";
  if (lastSegment.includes(".")) return null;
  return `/gl${pathname}`;
}

export const SITE_URL = "https://alumafilms.es";
/** Public contact address shown on the site (form notifications still go elsewhere). */
export const CONTACT_EMAIL = "info@alumafilms.es";

/** Social profiles shown in the footer. A network only appears once it has a URL. */
export const SOCIAL_LINKS: { label: string; url: string | null }[] = [
  { label: "Instagram", url: "https://www.instagram.com/alumafilms.ai/" },
  { label: "TikTok", url: "https://www.tiktok.com/@aluma.films" },
  { label: "YouTube", url: "https://www.youtube.com/@AlumaEstudio" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/146671485/" },
];

export const ROOMS = ["ficcion", "deporte", "documental", "publicidade"] as const;
export type Room = (typeof ROOMS)[number];

export type BreakdownBlock = {
  tipo: "rodado" | "xerado";
  imagen: string | null;
  texto: Record<Lang, string>;
};

export type Piece = {
  slug: string;
  titulo: Record<Lang, string>;
  sala: Room;
  ano: string | null;
  cliente: string | null;
  duracion: string | null;
  videoUrl: string | null;
  youtubeUrl: string | null;
  instagramUrl: string | null;
  posterUrl: string | null;
  aspectRatio?: "video" | "portrait";
  destacada?: boolean;
  /** Original spoken language of the piece, if known. */
  idioma?: Lang | null;
  sinopse?: Record<Lang, string> | null;
  desglose: BreakdownBlock[];
  ferramentas: string[];
};

/** Piece language names as shown in each UI language. */
export const LANGUAGE_NAMES: Record<Lang, Record<Lang, string>> = {
  gl: { gl: "Galego", es: "Castelán", en: "Inglés", ru: "Ruso" },
  es: { gl: "Gallego", es: "Español", en: "Inglés", ru: "Ruso" },
  en: { gl: "Galician", es: "Spanish", en: "English", ru: "Russian" },
  ru: { gl: "Галисийский", es: "Испанский", en: "Английский", ru: "Русский" },
};

const pieceAssets: Record<string, string> = {
  "camiseta-reconquista": camisetaReconquistaAsset.url,
  "viaxe-no-tempo": viaxeNoTempoAsset.url,
};

export const pieces = (piecesData as Piece[]).map((piece) => ({
  ...piece,
  posterUrl: pieceAssets[piece.slug] ?? piece.posterUrl,
}));

/** Extracts the 11-char video id from common YouTube URL shapes. */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m?.[1] ?? null;
}

/** Converts a public Instagram post or reel URL into its embeddable form. */
export function instagramEmbedUrl(url: string): string | null {
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([\w-]+)/i);
  const kind = match?.[1];
  const id = match?.[2];
  return kind && id ? `https://www.instagram.com/${kind}/${id}/embed/captioned/` : null;
}

export function pieceBySlug(slug: string): Piece | undefined {
  return pieces.find((p) => p.slug === slug);
}

export function nextPiece(slug: string): Piece | undefined {
  const i = pieces.findIndex((p) => p.slug === slug);
  if (i < 0 || pieces.length === 0) return undefined;
  return pieces[(i + 1) % pieces.length];
}

export function detectLang(): Lang {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem("aluma:lang");
    if (isLang(stored ?? undefined)) return stored as Lang;
  } catch {
    /* storage unavailable */
  }
  const nav = window.navigator.languages ?? [window.navigator.language];
  for (const tag of nav) {
    const base = tag.toLowerCase().split("-")[0];
    if (isLang(base)) return base;
  }
  return DEFAULT_LANG;
}

export function rememberLang(lang: Lang) {
  try {
    window.localStorage.setItem("aluma:lang", lang);
  } catch {
    /* storage unavailable */
  }
}

/* Typed router link props — routes are /$lang, /$lang/$section, /$lang/$section/$slug. */

export function homeLink(lang: Lang) {
  return { to: "/$lang" as const, params: { lang } };
}

export function pageLink(page: PageKey, lang: Lang) {
  return { to: "/$lang/$section" as const, params: { lang, section: slugFor(page, lang) } };
}

export function pieceLink(lang: Lang, slug: string) {
  return {
    to: "/$lang/$section/$slug" as const,
    params: { lang, section: slugFor("work", lang), slug },
  };
}

export type Post = {
  slug: string;
  data: string;
  imaxe: string | null;
  titulo: Record<Lang, string>;
  extracto: Record<Lang, string>;
  corpo: Record<Lang, string[]>;
};

/** Blog posts, newest first. */
export const posts = (postsData as Post[]).slice().sort((a, b) => b.data.localeCompare(a.data));

export function postBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function readingMinutes(post: Post, lang: Lang): number {
  const words = post.corpo[lang].join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const MONTHS: Record<Lang, string[]> = {
  gl: ["xaneiro", "febreiro", "marzo", "abril", "maio", "xuño", "xullo", "agosto", "setembro", "outubro", "novembro", "decembro"],
  es: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
};

/** Deterministic date formatting (same on server and browser). */
export function formatDate(iso: string, lang: Lang): string {
  const [y, m, d] = iso.split("-").map(Number);
  const month = MONTHS[lang][(m ?? 1) - 1];
  return lang === "en" || lang === "ru" ? `${d} ${month} ${y}` : `${d} de ${month} de ${y}`;
}

export function postLink(lang: Lang, slug: string) {
  return {
    to: "/$lang/$section/$slug" as const,
    params: { lang, section: slugFor("blog", lang), slug },
  };
}
