import type { ReactNode } from "react";

export function SectionHero({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <section className="pt-36 pb-12 px-4">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-display text-5xl md:text-7xl">{title}</h1>
        {intro && <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
