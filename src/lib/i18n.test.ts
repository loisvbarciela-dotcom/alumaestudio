import { describe, expect, test } from "bun:test";
import { LANGS, isLang, slugFor, pageFromSlug, formatDate, pieces, posts, SOCIAL_LINKS, galicianRedirectPath } from "./i18n";
import { contactSchema } from "./contact-schema";

describe("Russian language support", () => {
  test("Russian is available alongside the three existing languages", () => {
    expect([...LANGS]).toEqual(["gl", "es", "en", "ru"]);
    expect(isLang("ru")).toBe(true);
    expect(isLang("xx")).toBe(false);
  });
  test("Russian section URLs resolve back to their section", () => {
    expect(slugFor("contact", "ru")).toBe("kontakty");
    expect(pageFromSlug("vash-film", "ru")).toBe("love");
  });
  test("Russian enquiries are accepted without changing their message", () => {
    const data = { name: "Анна", email: "anna@example.com", projectType: "ficcion", message: "Хотим фильм для свадьбы", lang: "ru" };
    expect(contactSchema.parse(data)).toEqual(data);
    expect(contactSchema.safeParse({ ...data, lang: "xx" }).success).toBe(false);
  });
  test("Phone in enquiries is optional and accepted when present", () => {
    const withoutPhone = { name: "María", email: "maria@example.com", projectType: "ficcion", message: "Ola", lang: "gl" };
    expect(contactSchema.parse(withoutPhone)).toEqual(withoutPhone);
    const withPhone = { ...withoutPhone, phone: "+34 600 123 456" };
    expect(contactSchema.parse(withPhone)).toEqual(withPhone);
  });
  test("Russian dates use a Russian month", () => {
    expect(formatDate("2026-10-10", "ru")).toBe("10 октября 2026");
  });
  test("every existing work and article has Russian localized content", () => {
    for (const piece of pieces) {
      expect(piece.titulo.ru.length).toBeGreaterThan(0);
      if (piece.sinopse) expect(piece.sinopse.ru.length).toBeGreaterThan(0);
    }
    for (const post of posts) {
      expect(post.titulo.ru.length).toBeGreaterThan(0);
      expect(post.extracto.ru.length).toBeGreaterThan(0);
      expect(post.corpo.ru.length).toBe(post.corpo.es.length);
    }
  });
});

describe("Unprefixed URLs", () => {
  test("unprefixed paths retain the same route under gl", () => {
    expect(galicianRedirectPath("/traballo")).toBe("/gl/traballo");
    expect(galicianRedirectPath("/contacto")).toBe("/gl/contacto");
    expect(galicianRedirectPath("/blog/ideas-que-merecen-luz")).toBe("/gl/blog/ideas-que-merecen-luz");
    expect(galicianRedirectPath("/missing/deep/path/extra")).toBe("/gl/missing/deep/path/extra");
  });
  test("infrastructure paths, file extensions and Lovable internals never redirect", () => {
    expect(galicianRedirectPath("/lovable/email/transactional/preview")).toBeNull();
    expect(galicianRedirectPath("/api/x")).toBeNull();
    expect(galicianRedirectPath("/_serverFn/abc")).toBeNull();
    expect(galicianRedirectPath("/sitemap.xml")).toBeNull();
    expect(galicianRedirectPath("/robots.txt")).toBeNull();
    expect(galicianRedirectPath("/favicon.ico")).toBeNull();
    expect(galicianRedirectPath("/traballo")).toBe("/gl/traballo");
  });
  test("root keeps its existing behavior", () => {
    expect(galicianRedirectPath("/")).toBeNull();
  });
  test("valid locale prefixes never redirect again", () => {
    for (const lang of ["gl", "es", "en", "ru"]) {
      expect(galicianRedirectPath(`/${lang}`)).toBeNull();
      expect(galicianRedirectPath(`/${lang}/missing/deep/path/extra`)).toBeNull();
    }
  });
});

test("the four official social profiles are available in order", () => {
  expect(SOCIAL_LINKS).toEqual([
    { label: "Instagram", url: "https://www.instagram.com/aluma.films/" },
    { label: "TikTok", url: "https://www.tiktok.com/@aluma.films" },
    { label: "YouTube", url: "https://www.youtube.com/@AlumaFilmsGalicia" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/146671485/" },
  ]);
});