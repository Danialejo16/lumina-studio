import { useState } from "react";
import { useSubscribeNewsletter } from "@/hooks/useSiteData";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const mut = useSubscribeNewsletter();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    mut.mutate(email, { onSuccess: () => setDone(true) });
  };

  if (done) {
    return (
      <p className="text-sm text-spirit-glow">Gracias por sumarte. Nos leemos pronto.</p>
    );
  }

  return (
    <form onSubmit={submit} className={`flex ${compact ? "flex-col gap-2" : "flex-col sm:flex-row gap-3"}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@email.com"
        className="flex-1 glass rounded-xl px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-spirit"
      />
      <button
        type="submit"
        disabled={mut.isPending}
        className="rounded-xl px-5 py-2.5 text-sm font-medium bg-gradient-to-br from-spirit to-spirit-glow text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
      >
        {mut.isPending ? "..." : "Suscribirme"}
      </button>
    </form>
  );
}
