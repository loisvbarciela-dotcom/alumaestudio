import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import type { Lang } from "@/lib/i18n";

export function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <div lang={lang} className="flex min-h-screen flex-col bg-tinta text-oso">
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
