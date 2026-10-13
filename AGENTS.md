<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Standalone product pages use the existing localized section registry and shared SiteShell so language switching and navigation stay consistent.
- Product sales copy lives in localized content files for every supported language; enquiries use the existing contact page, not a simulated submission or automatic film-generation flow.
- Keep supported languages in the shared LANGS registry and validate contact language with it; this prevents page and submission support from drifting apart.
- Cyrillic display typography uses the global locale-specific font token; the original Latin display font lacks Cyrillic glyphs.
- Regenerate the static sitemap with scripts/generate-sitemap.ts after locale or content changes; the shared registry keeps alternates aligned with real pages.
- Bun test files (`src/**/*.test.ts`) are excluded from tsconfig; the bun types collide with the project's fetch typings, and tests run via `bun test` at runtime.
- AI campaign proposals run through a server function that calls Lovable AI Gateway (Responses API) server-side; the key and prompt never reach the browser.
