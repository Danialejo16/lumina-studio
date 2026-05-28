import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AuthProvider } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { FAVICON_DATA_URI } from "@/lib/favicon";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass rounded-3xl p-10 text-center max-w-md">
        <h1 className="font-display text-7xl text-gradient">404</h1>
        <p className="mt-3 text-muted-foreground">Esta ruta se perdió en el camino.</p>
        <Link to="/" className="mt-6 inline-flex rounded-xl bg-gradient-to-br from-spirit to-spirit-glow px-5 py-2.5 text-sm font-medium text-primary-foreground">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass rounded-3xl p-10 text-center max-w-md">
        <h1 className="font-display text-3xl">Algo no cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">Inténtalo de nuevo o vuelve al inicio.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground">Reintentar</button>
          <a href="/" className="rounded-xl border border-glass-border px-4 py-2 text-sm">Inicio</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Dani Alejito — Viajes, espiritualidad y vida consciente" },
      { name: "description", content: "Crónicas de viaje, reflexiones espirituales y un estilo de vida más consciente." },
      { name: "theme-color", content: "#070710" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: FAVICON_DATA_URI },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <head><HeadContent /></head>
      <body className="noise">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <main className="relative z-10 min-h-screen">
          <Outlet />
        </main>
        <Footer />
        <CookieBanner />
      </AuthProvider>
    </QueryClientProvider>
  );
}
