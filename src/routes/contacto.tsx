import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useSetting } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";
import { SocialGrid } from "@/components/SocialGrid";

export const Route = createFileRoute("/contacto")({ component: Page });

function Page() {
  const contact = useSetting<{ title: string; intro: string; email: string }>("contact");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = contact?.email ?? "hola@danialejito.com";
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Contacto de ${name}`)}&body=${encodeURIComponent(msg + "\n\n" + email)}`;
  };

  return (
    <>
      <SectionHero title={contact?.title ?? "Contacto"} intro={contact?.intro} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-4xl grid gap-8 md:grid-cols-[1fr,1.2fr]">
          <div>
            <h3 className="font-display text-2xl mb-4">Redes</h3>
            <SocialGrid filter={(k) => ["youtube","instagram","tiktok"].includes(k)} />
          </div>
          <form onSubmit={submit} className="glass rounded-3xl p-8 space-y-4">
            <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} placeholder="Tu nombre" className="w-full glass rounded-xl px-4 py-3 text-sm" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" maxLength={254} placeholder="Tu email" className="w-full glass rounded-xl px-4 py-3 text-sm" />
            <textarea value={msg} onChange={(e) => setMsg(e.target.value)} required maxLength={1000} rows={5} placeholder="Tu mensaje" className="w-full glass rounded-xl px-4 py-3 text-sm" />
            <button className="w-full rounded-xl bg-gradient-to-br from-spirit to-spirit-glow px-6 py-3 text-sm font-medium text-primary-foreground">Enviar</button>
          </form>
        </div>
      </section>
    </>
  );
}
