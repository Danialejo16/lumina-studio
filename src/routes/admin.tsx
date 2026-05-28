import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  useAllSettings, useUpdateSetting,
  useMediaLinks, useUpsertLink,
  useBlogPosts, useUpsertPost, useDeletePost,
  useHtmlWidgets, useUpsertWidget,
} from "@/hooks/useSiteData";

export const Route = createFileRoute("/admin")({ component: AdminPage });

const TABS = ["Diseño", "Textos", "Blog", "Multimedia", "Widgets"] as const;

function AdminPage() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Textos");

  if (loading) return <div className="pt-40 text-center text-muted-foreground">Cargando…</div>;
  if (!user) return <LoginForm />;
  if (!isAdmin) return (
    <div className="pt-40 text-center px-4">
      <div className="glass max-w-md mx-auto rounded-3xl p-8">
        <h2 className="font-display text-3xl">Acceso restringido</h2>
        <p className="mt-2 text-sm text-muted-foreground">Tu cuenta no tiene rol admin. Solicítalo al propietario.</p>
        <p className="mt-4 text-xs text-muted-foreground">User ID: <code>{user.id}</code></p>
        <button onClick={signOut} className="mt-6 text-sm text-spirit-glow">Cerrar sesión</button>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-4xl">Panel</h1>
          <button onClick={signOut} className="text-sm text-muted-foreground hover:text-foreground">Salir</button>
        </div>

        <div className="glass rounded-2xl p-2 flex gap-1 overflow-x-auto mb-6">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm rounded-xl whitespace-nowrap transition ${tab === t ? "bg-gradient-to-br from-spirit to-spirit-glow text-primary-foreground" : "hover:bg-secondary"}`}>
              {t}
            </button>
          ))}
        </div>

        {tab === "Diseño" && <DesignTab />}
        {tab === "Textos" && <TextsTab />}
        {tab === "Blog" && <BlogTab />}
        {tab === "Multimedia" && <MediaTab />}
        {tab === "Widgets" && <WidgetsTab />}
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    const fn = mode === "login" ? supabase.auth.signInWithPassword : supabase.auth.signUp;
    const { error } = await fn({ email, password: pwd, options: { emailRedirectTo: window.location.origin + "/admin" } } as any);
    setLoading(false);
    if (error) setErr(error.message);
  };

  return (
    <div className="pt-40 pb-20 px-4">
      <form onSubmit={submit} className="mx-auto max-w-md glass rounded-3xl p-8 space-y-4">
        <h1 className="font-display text-3xl">{mode === "login" ? "Acceso admin" : "Crear cuenta"}</h1>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="Email" className="w-full glass rounded-xl px-4 py-3 text-sm" />
        <input value={pwd} onChange={(e)=>setPwd(e.target.value)} type="password" required minLength={6} placeholder="Contraseña" className="w-full glass rounded-xl px-4 py-3 text-sm" />
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button disabled={loading} className="w-full rounded-xl bg-gradient-to-br from-spirit to-spirit-glow px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50">
          {loading ? "..." : (mode === "login" ? "Entrar" : "Registrarme")}
        </button>
        <button type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")} className="w-full text-xs text-muted-foreground">
          {mode === "login" ? "Crear cuenta nueva" : "Ya tengo cuenta"}
        </button>
      </form>
    </div>
  );
}

function JsonEditor({ value, onChange }: { value: any; onChange: (v: any) => void }) {
  const [text, setText] = useState(() => JSON.stringify(value ?? {}, null, 2));
  const [err, setErr] = useState("");
  return (
    <div>
      <textarea value={text} onChange={(e) => { setText(e.target.value); try { onChange(JSON.parse(e.target.value)); setErr(""); } catch (x: any) { setErr(x.message); } }}
        rows={12} className="w-full glass rounded-xl p-4 text-xs font-mono" />
      {err && <p className="text-xs text-destructive mt-1">{err}</p>}
    </div>
  );
}

function DesignTab() {
  const { data: all } = useAllSettings();
  const upd = useUpdateSetting();
  const palette = all?.palette ?? {};
  const home = all?.home ?? {};

  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-2xl mb-4">Colores principales</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(["bg","surface","accent","accentGlow","border"] as const).map((k) => (
            <label key={k} className="text-xs">
              <span className="text-muted-foreground">{k}</span>
              <div className="mt-1 flex gap-2 items-center glass rounded-xl px-3 py-2">
                <input type="color" value={palette[k] ?? "#000000"} onChange={(e) => upd.mutate({ key: "palette", value: { ...palette, [k]: e.target.value } })} className="w-8 h-8 rounded" />
                <input value={palette[k] ?? ""} onChange={(e) => upd.mutate({ key: "palette", value: { ...palette, [k]: e.target.value } })} className="flex-1 bg-transparent text-xs" />
              </div>
            </label>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Nota: la paleta se guarda; aplicarla globalmente requiere extender el theme con CSS vars dinámicas (próxima iteración).</p>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display text-2xl mb-4">Imagen hero</h3>
        <input value={home.heroImage ?? ""} onChange={(e) => upd.mutate({ key: "home", value: { ...home, heroImage: e.target.value } })} placeholder="URL de la imagen" className="w-full glass rounded-xl px-4 py-3 text-sm" />
      </div>
    </div>
  );
}

function TextsTab() {
  const { data: all } = useAllSettings();
  const upd = useUpdateSetting();
  const keys = ["brand","home","about","contact","resources","spirit","donations","photos","music","books","footer"];

  return (
    <div className="space-y-4">
      {keys.map((k) => (
        <details key={k} className="glass rounded-2xl p-4">
          <summary className="cursor-pointer font-display text-xl capitalize">{k}</summary>
          <div className="mt-4">
            <JsonEditor value={all?.[k]} onChange={(v) => upd.mutate({ key: k, value: v })} />
          </div>
        </details>
      ))}
      <p className="text-xs text-muted-foreground">Los cambios se guardan al editar (con debounce automático del navegador). Recarga la web pública para verlos.</p>
    </div>
  );
}

function BlogTab() {
  const { data: posts = [] } = useBlogPosts({ onlyPublished: false });
  const upsert = useUpsertPost();
  const del = useDeletePost();
  const [editing, setEditing] = useState<any | null>(null);

  return (
    <div className="space-y-4">
      <button onClick={() => setEditing({ slug: "", title: "", cover_url: "", excerpt: "", content_html: "", published: true })}
        className="rounded-xl bg-gradient-to-br from-spirit to-spirit-glow px-4 py-2 text-sm text-primary-foreground">
        + Nuevo post
      </button>
      {editing && (
        <div className="glass rounded-2xl p-6 space-y-3">
          <input placeholder="Slug" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full glass rounded-xl px-4 py-2 text-sm" />
          <input placeholder="Título" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full glass rounded-xl px-4 py-2 text-sm" />
          <input placeholder="URL portada" value={editing.cover_url ?? ""} onChange={(e) => setEditing({ ...editing, cover_url: e.target.value })} className="w-full glass rounded-xl px-4 py-2 text-sm" />
          <input placeholder="Extracto" value={editing.excerpt ?? ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full glass rounded-xl px-4 py-2 text-sm" />
          <textarea placeholder="Contenido HTML" value={editing.content_html} onChange={(e) => setEditing({ ...editing, content_html: e.target.value })} rows={10} className="w-full glass rounded-xl px-4 py-2 text-sm font-mono" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} /> Publicado</label>
          <div className="flex gap-2">
            <button onClick={() => { upsert.mutate(editing, { onSuccess: () => setEditing(null) }); }} className="rounded-xl bg-primary px-4 py-2 text-sm text-primary-foreground">Guardar</button>
            <button onClick={() => setEditing(null)} className="text-sm text-muted-foreground">Cancelar</button>
          </div>
        </div>
      )}
      <div className="grid gap-3">
        {posts.map((p) => (
          <div key={p.id} className="glass rounded-2xl p-4 flex items-center gap-4">
            {p.cover_url && <img src={p.cover_url} alt="" className="w-16 h-16 rounded-lg object-cover" />}
            <div className="flex-1">
              <h4 className="font-display text-lg">{p.title}</h4>
              <p className="text-xs text-muted-foreground">{p.slug} · {p.published ? "publicado" : "borrador"}</p>
            </div>
            <button onClick={() => setEditing(p)} className="text-sm text-spirit-glow">Editar</button>
            <button onClick={() => confirm("¿Eliminar?") && del.mutate(p.id)} className="text-sm text-destructive">Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MediaTab() {
  const { data: links = [] } = useMediaLinks();
  const up = useUpsertLink();
  return (
    <div className="space-y-3">
      {links.map((l) => (
        <div key={l.id} className="glass rounded-2xl p-4 grid gap-2 sm:grid-cols-[140px,1fr,auto]">
          <input value={l.label} onChange={(e) => up.mutate({ ...l, label: e.target.value })} className="glass rounded-lg px-3 py-2 text-sm" />
          <input value={l.url} onChange={(e) => up.mutate({ ...l, url: e.target.value })} className="glass rounded-lg px-3 py-2 text-sm" />
          <span className="text-xs text-muted-foreground self-center">{l.kind}</span>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">También puedes pegar URLs de YouTube en formato embed (ej: <code>https://www.youtube.com/embed/ID</code>) en cualquier widget HTML.</p>
    </div>
  );
}

function WidgetsTab() {
  const { data: widgets = [] } = useHtmlWidgets();
  const up = useUpsertWidget();
  return (
    <div className="space-y-4">
      {widgets.map((w) => (
        <div key={w.id} className="glass rounded-2xl p-6 space-y-3">
          <div className="flex items-center justify-between">
            <input value={w.label} onChange={(e) => up.mutate({ ...w, label: e.target.value })} className="glass rounded-lg px-3 py-2 text-sm" />
            <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={w.enabled} onChange={(e) => up.mutate({ ...w, enabled: e.target.checked })} /> Activo</label>
          </div>
          <textarea value={w.html} onChange={(e) => up.mutate({ ...w, html: e.target.value })} rows={8} placeholder="HTML / iframe / script" className="w-full glass rounded-xl px-3 py-2 text-xs font-mono" />
          {w.enabled && <div className="glass rounded-xl p-4"><div dangerouslySetInnerHTML={{ __html: w.html }} /></div>}
        </div>
      ))}
    </div>
  );
}
