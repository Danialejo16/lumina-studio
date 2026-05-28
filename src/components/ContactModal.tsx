import { useEffect } from "react";
import { X } from "lucide-react";
import { useSetting } from "@/hooks/useSiteData";

export function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const contact = useSetting<{ email: string }>("contact");

  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-3xl p-8 max-w-md w-full relative shadow-elegant"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </button>
        <h2 className="font-display text-3xl">Contacto comercial</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Para marcas, colaboraciones, briefings o propuestas. Escríbeme y respondo en menos de
          48h.
        </p>
        <a
          href={`mailto:${contact?.email ?? "hola@danialejito.com"}?subject=Colaboraci%C3%B3n`}
          className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-br from-spirit to-spirit-glow px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {contact?.email ?? "hola@danialejito.com"}
        </a>
      </div>
    </div>
  );
}
