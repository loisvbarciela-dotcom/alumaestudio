import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CONTACT_EMAIL, ROOMS, dict, type Lang } from "@/lib/i18n";
import { submitContact } from "@/lib/contact.functions";

export function ContactPage({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const send = useServerFn(submitContact);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await send({
        data: {
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          phone: String(data.get("phone") ?? "").trim() || undefined,
          projectType: String(data.get("projectType") ?? ""),
          message: String(data.get("message") ?? ""),
          lang,
        },
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const field = "mt-2 w-full border bg-transparent px-4 py-3 text-[15px] text-oso outline-none placeholder:text-bruma/60 focus:border-ouro";

  return (
    <>
      <header className="gutter pt-[14vh] pb-[8vh]">
        <p className="label-xs text-ouro">{t.contact.label}</p>
        <h1 className="display mt-8 max-w-3xl text-5xl sm:text-7xl">{t.contact.title}</h1>
      </header>

      <section className="gutter pb-[16vh]">
        <form onSubmit={onSubmit} className="max-w-2xl border-t pt-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label-xs text-bruma">
                {t.contact.name}
              </label>
              <input id="name" name="name" required className={field} autoComplete="name" />
            </div>
            <div>
              <label htmlFor="email" className="label-xs text-bruma">
                {t.contact.email}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={field}
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="phone" className="label-xs text-bruma">
                {t.contact.phone}
              </label>
              <input id="phone" name="phone" type="tel" className={field} autoComplete="tel" />
            </div>
          </div>

          <div className="mt-8">
            <label htmlFor="projectType" className="label-xs text-bruma">
              {t.contact.projectType}
            </label>
            <select id="projectType" name="projectType" required className={field}>
              {ROOMS.map((room) => (
                <option key={room} value={room} className="bg-tinta">
                  {t.work.rooms[room]}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-8">
            <label htmlFor="message" className="label-xs text-bruma">
              {t.contact.message}
            </label>
            <textarea id="message" name="message" rows={6} required className={field} />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="label-xs mt-12 border-b border-ouro pb-1 text-oso disabled:text-bruma"
          >
            {status === "sending" ? t.contact.sending : t.contact.submit}
          </button>

          <p aria-live="polite" className="mt-8 text-[15px] text-bruma">
            {status === "sent" ? t.contact.success : status === "error" ? t.contact.error : ""}
          </p>

          <p className="mt-4 text-[15px] text-bruma">
            {t.contact.direct}{" "}
            <a
              className="border-b border-ouro/60 text-oso hover:border-ouro"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </form>
      </section>
    </>
  );
}
