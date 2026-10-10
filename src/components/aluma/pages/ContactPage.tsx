import { useState } from "react";
import { CONTACT_EMAIL, ROOMS, dict, type Lang, type Room } from "@/lib/i18n";

const ENDPOINT = import.meta.env["VITE_CONTACT_ENDPOINT"] as string | undefined;

export function ContactPage({ lang }: { lang: Lang }) {
  const t = dict(lang);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const room = String(data.get("projectType") ?? "");
    const message = String(data.get("message") ?? "");
    const roomName = (ROOMS as readonly string[]).includes(room)
      ? t.work.rooms[room as Room]
      : room;

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, projectType: room, message, lang }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        form.reset();
      } catch {
        setStatus("error");
      }
      return;
    }

    // No endpoint configured yet: hand the message to the visitor's mail app, addressed to ALUMA.
    const subject = [t.contact.label, roomName, name].filter(Boolean).join(" · ");
    const body = [
      `${t.contact.name}: ${name}`,
      `${t.contact.email}: ${email}`,
      `${t.contact.projectType}: ${roomName}`,
      "",
      message,
    ].join("\n");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    try {
      window.location.href = href;
      setStatus("sent");
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
