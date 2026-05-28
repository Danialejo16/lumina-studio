import { createFileRoute } from "@tanstack/react-router";
import { useSetting } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";

export const Route = createFileRoute("/libros")({ component: Page });

function Page() {
  const b = useSetting<{ title: string; intro: string; items: { title: string; author: string; url: string; cover: string }[] }>("books");
  return (
    <>
      <SectionHero title={b?.title ?? "Libros"} intro={b?.intro} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-5xl grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {(b?.items ?? []).map((it, i) => (
            <a key={i} href={it.url} target="_blank" rel="noreferrer" className="glass rounded-2xl p-6 hover-spirit block">
              {it.cover && <img src={it.cover} alt="" className="rounded-xl mb-4 w-full aspect-[3/4] object-cover" />}
              <h3 className="font-display text-xl">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.author}</p>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
