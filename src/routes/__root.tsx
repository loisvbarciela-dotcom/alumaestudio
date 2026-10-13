import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  redirect,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { dict, galicianRedirectPath, homeLink, isLang, DEFAULT_LANG } from "../lib/i18n";
import { SiteShell } from "@/components/aluma/SiteShell";
import { Button } from "@/components/ui/button";

function NotFoundComponent() {
  const segment = useRouterState({ select: (state) => state.location.pathname.split("/")[1] });
  const lang = isLang(segment) ? segment : DEFAULT_LANG;
  const t = dict(lang).notFound;
  return (
    <SiteShell lang={lang}>
      <header className="gutter pt-[14vh] pb-[8vh]">
        <p className="label-xs text-ouro">{t.label}</p>
        <h1 className="display mt-8 max-w-3xl text-5xl sm:text-7xl">{t.title}</h1>
        <p className="mt-8 max-w-2xl text-[15px] text-bruma">{t.text}</p>
        <Button asChild variant="cinema" className="label-xs mt-12">
          <Link {...homeLink(lang)}>{t.button}</Link>
        </Button>
      </header>
    </SiteShell>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const reportedError = error instanceof Error ? error : new Error(String(error));
  console.error(reportedError);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(reportedError, { boundary: "tanstack_root_error_component" });
  }, [reportedError]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  beforeLoad: ({ location }) => {
    const target = galicianRedirectPath(location.pathname);
    if (target) {
      throw redirect({
        href: `${target}${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
        statusCode: 301,
        replace: true,
      });
    }
  },
  head: ({ matches }) => ({
    meta: [
      ...(matches.some((match) => match.status === "notFound" || match._notFound)
        ? [{ name: "robots", content: "noindex" }]
        : []),
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Aluma" },
      { property: "og:site_name", content: "Aluma" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#16130F" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const segment = useRouterState({ select: (state) => state.location.pathname.split("/")[1] });
  const lang = isLang(segment) ? segment : DEFAULT_LANG;
  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
