import { Link } from "@tanstack/react-router";
import { dict, formatDate, postLink, posts, readingMinutes, type Lang } from "@/lib/i18n";

export function BlogPage({ lang }: { lang: Lang }) {
  const t = dict(lang);

  return (
    <>
      <header className="gutter pt-[14vh] pb-[10vh]">
        <p className="label-xs text-ouro">{t.blog.label}</p>
        <h1 className="display mt-8 max-w-4xl text-5xl sm:text-7xl">{t.blog.title}</h1>
      </header>

      <section className="gutter pb-[16vh]">
        {posts.length === 0 ? (
          <p className="text-bruma">{t.blog.empty}</p>
        ) : (
          <ul className="divide-y border-t">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link {...postLink(lang, post.slug)} className="group grid gap-8 py-12 md:grid-cols-12">
                  {post.imaxe && (
                    <div className="aspect-video overflow-hidden md:col-span-5">
                      <img
                        src={post.imaxe}
                        alt=""
                        loading="lazy"
                        width={1672}
                        height={941}
                        className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                      />
                    </div>
                  )}
                  <div className={post.imaxe ? "md:col-span-7" : "md:col-span-12"}>
                    <p className="label-xs text-bruma">
                      <time dateTime={post.data}>{formatDate(post.data, lang)}</time> ·{" "}
                      {readingMinutes(post, lang)} {t.blog.minutes}
                    </p>
                    <h2 className="display mt-4 text-4xl transition-colors group-hover:text-ouro sm:text-5xl">
                      {post.titulo[lang]}
                    </h2>
                    <p className="mt-4 max-w-xl text-bruma">{post.extracto[lang]}</p>
                    <span className="label-xs mt-6 inline-block border-b border-ouro pb-0.5 text-oso">
                      {t.blog.read}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export function BlogArticle({ lang, slug }: { lang: Lang; slug: string }) {
  const t = dict(lang);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;

  return (
    <article className="pb-[16vh]">
      <header className="gutter pt-[14vh] pb-[8vh]">
        <p className="label-xs text-ouro">
          <time dateTime={post.data}>{formatDate(post.data, lang)}</time> ·{" "}
          {readingMinutes(post, lang)} {t.blog.minutes}
        </p>
        <h1 className="display mt-8 max-w-4xl text-5xl sm:text-7xl">{post.titulo[lang]}</h1>
        <p className="mt-8 max-w-2xl text-lg text-bruma">{post.extracto[lang]}</p>
      </header>
      {post.imaxe && (
        <img
          src={post.imaxe}
          alt=""
          width={1672}
          height={941}
          className="aspect-video w-full object-cover"
        />
      )}
      <div className="gutter mt-16 max-w-2xl space-y-6 text-lg leading-relaxed text-oso/90">
        {post.corpo[lang].map((para, i) => {
          if (para.startsWith("# ")) {
            return (
              <h2 key={i} className="label-xs display pt-10 text-ouro">
                {para.slice(2)}
              </h2>
            );
          }
          if (para.startsWith("· ")) {
            return (
              <p key={i} className="flex gap-4">
                <span aria-hidden className="text-ouro">·</span>
                <span>{para.slice(2)}</span>
              </p>
            );
          }
          return <p key={i}>{para}</p>;
        })}
      </div>
      <div className="gutter mt-16">
        <Link
          to="/$lang/$section"
          params={{ lang, section: "blog" }}
          className="label-xs border-b border-ouro pb-0.5 text-oso hover:text-ouro"
        >
          ← {t.blog.back}
        </Link>
      </div>
    </article>
  );
}
