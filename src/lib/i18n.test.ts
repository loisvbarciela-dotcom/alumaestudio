import { describe, expect, test } from "bun:test";
import { LANGS, isLang, slugFor, pageFromSlug, formatDate, pieces, posts } from "./i18n";
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