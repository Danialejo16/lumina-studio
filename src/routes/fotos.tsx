import { createFileRoute } from "@tanstack/react-router";
import { useSetting } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";

export const Route = createFileRoute("/fotos")({ component: Page });

function Page() {
  const p = useSetting<{ title: string; intro: string; images: string[] }>("photos");
  return (
    <>
      <SectionHero title={p?.title ?? "Fotos"} intro={p?.intro} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {(p?.images ?? []).map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" className="mb-4 w-full rounded-2xl break-inside-avoid hover:scale-[1.02] transition duration-500" />
          ))}
        </div>
      </section>
    </>
  );
}
