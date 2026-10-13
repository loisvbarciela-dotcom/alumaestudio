import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { dict, type Lang } from "@/lib/i18n";
import { proposeApproach } from "@/lib/brief.functions";

export function BriefAdvisor({ lang }: { lang: Lang }) {
  const t = dict(lang).brief;
  const propose = useServerFn(proposeApproach);
  const [brief, setBrief] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [text, setText] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setText("");
    try {
      const res = await propose({ data: { brief, lang } });
      if (!res.ok) return setStatus("error");
      setText(res.text);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="gutter pb-[10vh]">
      <div className="max-w-2xl border-t pt-12">
        <p className="label-xs text-ouro">{t.label}</p>
        <h2 className="display mt-6 text-3xl sm:text-4xl">{t.title}</h2>
        <form onSubmit={onSubmit} className="mt-8">
          <textarea
            aria-label={t.title}
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={6}
            minLength={20}
            maxLength={4000}
            required
            placeholder={t.placeholder}
            className="w-full border bg-transparent px-4 py-3 text-[15px] text-oso outline-none placeholder:text-bruma/60 focus:border-ouro"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="label-xs mt-8 border-b border-ouro pb-1 text-oso disabled:text-bruma"
          >
            {status === "sending" ? t.sending : t.submit}
          </button>
        </form>
        <div aria-live="polite" className="mt-8">
          {status === "error" && <p className="text-[15px] text-bruma">{t.error}</p>}
          {status === "done" && (
            <article className="border-l border-ouro pl-6">
              <div className="whitespace-pre-line text-[15px] leading-relaxed text-oso">{text}</div>
              <p className="mt-6 text-[13px] text-bruma">{t.note}</p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
