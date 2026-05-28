import { createFileRoute } from "@tanstack/react-router";
import { useSetting } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";

export const Route = createFileRoute("/recursos")({ component: Page });

function Page() {
  const r = useSetting<{ title: string; intro: string; items: { label: string; url: string; desc: string }[] }>("resources");
  return (
    <>
      <SectionHero title={r?.title ?? "Recursos"} intro={r?.intro} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl grid gap-5 md:grid-cols-2">
          {(r?.items ?? []).map((it, i) => (
            <a key={i} href={it.url} target="_blank" rel="noreferrer" className="glass rounded-2xl p-6 hover-spirit block">
              <h3 className="font-display text-xl">{it.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              <span className="mt-4 inline-block text-xs text-spirit-glow">Abrir →</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
