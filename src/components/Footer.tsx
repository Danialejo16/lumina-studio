import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSetting, useMediaLinks } from "@/hooks/useSiteData";
import { NewsletterForm } from "./NewsletterForm";
import { ContactModal } from "./ContactModal";

export function Footer() {
  const footer = useSetting<{ copyright: string }>("footer");
  const brand = useSetting<{ name: string; tagline: string }>("brand");
  const { data: links = [] } = useMediaLinks();
  const [showContact, setShowContact] = useState(false);

  return (
    <footer className="relative mt-32 px-4 pb-10 pt-20">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl">{brand?.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{brand?.tagline}</p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Navegación</h4>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
            {[
              ["/sobre-mi", "Sobre mí"],
              ["/contacto", "Contacto"],
              ["/recursos", "Recursos"],
              ["/espiritualidad", "Espiritualidad"],
              ["/fotos", "Fotos"],
              ["/libros", "Libros"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-muted-foreground hover:text-spirit-glow transition">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setShowContact(true)}
                className="text-spirit hover:text-spirit-glow transition text-left"
              >
                Contacto comercial →
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-widest text-muted-foreground">Newsletter</h4>
          <p className="mt-3 text-sm text-muted-foreground">
            Cartas ocasionales desde la ruta.
          </p>
          <div className="mt-4">
            <NewsletterForm compact />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-glass-border pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>{footer?.copyright}</span>
        <div className="flex gap-4">
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer" className="hover:text-spirit-glow transition">
              {l.label}
            </a>
          ))}
          <Link to="/admin" className="hover:text-spirit-glow transition">
            Admin
          </Link>
        </div>
      </div>

      <ContactModal open={showContact} onClose={() => setShowContact(false)} />
    </footer>
  );
}
