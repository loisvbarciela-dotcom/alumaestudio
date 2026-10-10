import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteShell } from "@/components/aluma/SiteShell";
import { WorkPage } from "@/components/aluma/pages/WorkPage";
import { MethodPage } from "@/components/aluma/pages/MethodPage";
import { EthicsPage } from "@/components/aluma/pages/EthicsPage";
import { StudioPage } from "@/components/aluma/pages/StudioPage";
import { BlogPage } from "@/components/aluma/pages/BlogPage";
import { ContactPage } from "@/components/aluma/pages/ContactPage";
import { LovePage } from "@/components/aluma/pages/LovePage";
import { LANGS, dict, isLang, pageFromSlug, slugFor, type Lang, type PageKey } from "@/lib/i18n";
import { buildHead } from "@/lib/seo";

export const Route = createFileRoute("/$lang/$section/")({
  beforeLoad: ({ params }) => {
    if (!isLang(params.lang)) throw notFound();
    if (!pageFromSlug(params.section, params.lang)) throw notFound();
  },
  head: ({ params }) => {
    const lang = (isLang(params.lang) ? params.lang : "gl") as Lang;
    const page = pageFromSlug(params.section, lang);
    if (!page) {
      return { meta: [{ title: "Aluma" }, { name: "robots", content: "noindex" }] };
    }
    const t = dict(lang);
    const alternates = Object.fromEntries(
      LANGS.map((code) => [code, `/${code}/${slugFor(page, code)}`]),
    ) as Record<Lang, string>;
    return buildHead({
      lang,
      title: t.meta[page].title,
      description: t.meta[page].description,
      path: `/${lang}/${slugFor(page, lang)}`,
      alternates,
    });
  },
  component: SectionRoute,
});

const PAGES: Record<PageKey, (props: { lang: Lang }) => React.ReactElement> = {
  work: WorkPage,
  love: LovePage,
  method: MethodPage,
  ethics: EthicsPage,
  studio: StudioPage,
  blog: BlogPage,
  contact: ContactPage,
};

function SectionRoute() {
  const params = Route.useParams();
  const lang = (isLang(params.lang) ? params.lang : "gl") as Lang;
  const page = pageFromSlug(params.section, lang);
  if (!page) throw notFound();
  const Page = PAGES[page];

  return (
    <SiteShell lang={lang}>
      <Page lang={lang} />
    </SiteShell>
  );
}
