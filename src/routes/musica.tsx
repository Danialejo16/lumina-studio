import { createFileRoute } from "@tanstack/react-router";
import { useSetting } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";

export const Route = createFileRoute("/musica")({ component: Page });

function Page() {
  const m = useSetting<{ title: string; intro: string; spotifyEmbed: string; soundcloudEmbed: string }>("music");
  return (
    <>
      <SectionHero title={m?.title ?? "Música y Podcast"} intro={m?.intro} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl space-y-6">
          {m?.spotifyEmbed && (
            <div className="glass rounded-2xl overflow-hidden p-2">
              <iframe src={m.spotifyEmbed} width="100%" height="380" frameBorder={0} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-xl" />
            </div>
          )}
          {m?.soundcloudEmbed && (
            <div className="glass rounded-2xl overflow-hidden p-2">
              <iframe src={m.soundcloudEmbed} width="100%" height="300" frameBorder={0} loading="lazy" className="rounded-xl" />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
