import { createFileRoute, redirect } from "@tanstack/react-router";
import { DEFAULT_LANG, detectLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const lang = typeof window === "undefined" ? DEFAULT_LANG : detectLang();
    throw redirect({ to: "/$lang", params: { lang }, replace: true });
  },
  component: () => null,
});
