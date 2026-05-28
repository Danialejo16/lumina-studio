import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSetting } from "@/hooks/useSiteData";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/sobre-mi", label: "Sobre mí" },
  { to: "/contacto", label: "Contacto" },
  { to: "/recursos", label: "Recursos" },
  { to: "/espiritualidad", label: "Espiritualidad" },
  { to: "/donaciones", label: "Donaciones" },
  { to: "/fotos", label: "Fotos" },
  { to: "/musica", label: "Música" },
  { to: "/libros", label: "Libros" },
] as const;

export function Navbar() {
  const brand = useSetting<{ name: string; logoUrl: string }>("brand");
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 shadow-elegant">
        <Link to="/" className="flex items-center gap-3 group">
          {brand?.logoUrl && (
            <img
              src={brand.logoUrl}
              alt={brand?.name ?? "Logo"}
              className="h-10 max-w-28 object-contain ring-1 ring-glass-border transition group-hover:ring-spirit"
            />
          )}
          <span className="font-display text-lg tracking-tight">{brand?.name ?? "Dani"}</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <li key={n.to}>
              <Link
                to={n.to}
                activeProps={{ className: "text-spirit-glow" }}
                activeOptions={{ exact: n.to === "/" }}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition rounded-lg"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 lg:hidden">
          <ul className="grid grid-cols-2 gap-2">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm rounded-lg hover:bg-secondary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
