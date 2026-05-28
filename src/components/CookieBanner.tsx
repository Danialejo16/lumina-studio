import { useEffect, useState } from "react";

const KEY = "cookies_accepted_v1";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setShow(true);
  }, []);

  if (!show) return null;

  const accept = () => {
    localStorage.setItem(KEY, "1");
    document.cookie = `${KEY}=1; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
    setShow(false);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
      <div className="glass-strong pointer-events-auto rounded-2xl px-5 py-4 max-w-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-elegant">
        <p className="text-sm text-muted-foreground flex-1">
          Usamos cookies funcionales para mejorar tu experiencia. Sólo se guardan si las aceptas.
        </p>
        <div className="flex gap-2 self-end">
          <button
            onClick={() => setShow(false)}
            className="px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="px-4 py-1.5 text-xs rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
