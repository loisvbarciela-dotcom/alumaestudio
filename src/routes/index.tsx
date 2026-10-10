import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LANG, detectLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "ALUMA — Cine e historias que merecen luz" },
    { name: "description", content: "Estudio audiovisual en Galicia. Cine híbrido e historias personalizadas bajo dirección humana." },
    { property: "og:title", content: "ALUMA — Cine e historias que merecen luz" },
    { property: "og:description", content: "Estudio audiovisual en Galicia. Cine híbrido e historias personalizadas bajo dirección humana." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  beforeLoad: () => {
    const lang = typeof window === "undefined" ? DEFAULT_LANG : detectLang();
    throw redirect({ to: "/$lang", params: { lang }, replace: true });
  },
  component: () => null,
});
