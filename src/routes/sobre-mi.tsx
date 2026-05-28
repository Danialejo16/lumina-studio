import { createFileRoute } from "@tanstack/react-router";
import { useSetting } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";

export const Route = createFileRoute("/sobre-mi")({ component: Page });

function Page() {
  const about = useSetting<{ title: string; body: string; portrait: string }>("about");
  return (
    <>
      <SectionHero title={about?.title ?? "Sobre mí"} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl glass rounded-3xl p-10">
          {about?.portrait && <img src={about.portrait} alt="" className="rounded-2xl mb-6 w-full aspect-[4/3] object-cover" />}
          <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{about?.body}</p>
        </div>
      </section>
    </>
  );
}
