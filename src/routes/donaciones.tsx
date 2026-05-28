import { createFileRoute } from "@tanstack/react-router";
import { useSetting } from "@/hooks/useSiteData";
import { SectionHero } from "@/components/SectionHero";
import { SocialGrid } from "@/components/SocialGrid";

export const Route = createFileRoute("/donaciones")({ component: Page });

function Page() {
  const d = useSetting<{ title: string; intro: string }>("donations");
  return (
    <>
      <SectionHero title={d?.title ?? "Apóyame"} intro={d?.intro} />
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-3xl">
          <SocialGrid filter={(k) => ["patreon","paypal"].includes(k)} />
        </div>
      </section>
    </>
  );
}
