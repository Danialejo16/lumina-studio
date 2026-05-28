import { createFileRoute } from "@tanstack/react-router";
import { useSetting, useMediaLinks } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";
import { DailyVerseWidget } from "@/components/DailyVerseWidget";

export const Route = createFileRoute("/espiritualidad")({ component: Page });

function Page() {
  const s = useSetting<{ title: string; intro: string }>("spirit");
  const { data: links = [] } = useMediaLinks();
  const archive = links.find((l) => l.key === "archive");

  return (
    <>
      <SectionHero title={s?.title ?? "Espiritualidad"} intro={s?.intro} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-2xl space-y-6">
          <DailyVerseWidget />
          {archive && (
            <a href={archive.url} target="_blank" rel="noreferrer" className="block glass rounded-2xl px-6 py-4 text-center text-sm hover-spirit">
              Visitar Archivo Histórico →
            </a>
          )}
        </div>
      </section>
    </>
  );
}
