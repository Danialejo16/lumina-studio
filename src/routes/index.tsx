import { createFileRoute, Link } from "@tanstack/react-router";
import { useSetting, useBlogPosts } from "@/hooks/useSiteData";
import { NewsletterForm } from "@/components/NewsletterForm";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const home = useSetting<{ heroTitle: string; heroSubtitle: string; heroImage: string; ctaPrimary: string; ctaSecondary: string }>("home");
  const { data: posts = [] } = useBlogPosts();

  return (
    <>
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          <p className="text-xs uppercase tracking-[0.4em] text-spirit-glow">Vlogs · Espiritualidad · Estilo de vida</p>
          <h1 className="mt-6 font-display text-6xl md:text-8xl leading-[0.95]">
            <span className="text-gradient">{home?.heroTitle ?? "Vive ligero."}</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {home?.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/fotos" className="rounded-xl bg-gradient-to-br from-spirit to-spirit-glow px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
              {home?.ctaPrimary ?? "Explorar"}
            </Link>
            <Link to="/sobre-mi" className="glass rounded-xl px-6 py-3 text-sm hover-spirit">
              {home?.ctaSecondary ?? "Sobre mí"}
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-3xl md:text-4xl mb-8">Últimas crónicas</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.slice(0, 6).map((p) => (
              <article key={p.id} className="glass rounded-2xl overflow-hidden hover-spirit group">
                {p.cover_url && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                )}
                <div className="p-5">
                  <time className="text-xs text-muted-foreground">{new Date(p.published_at).toLocaleDateString("es")}</time>
                  <h3 className="mt-2 font-display text-xl">{p.title}</h3>
                  {p.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-3xl glass rounded-3xl p-10 text-center">
          <h2 className="font-display text-3xl">Únete a la newsletter</h2>
          <p className="mt-2 text-muted-foreground">Cartas ocasionales con rutas, libros y silencios.</p>
          <div className="mt-6"><NewsletterForm /></div>
        </div>
      </section>
    </>
  );
}
