import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SettingKey =
  | "brand"
  | "palette"
  | "home"
  | "about"
  | "contact"
  | "resources"
  | "spirit"
  | "donations"
  | "photos"
  | "music"
  | "books"
  | "footer";

export function useAllSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*");
      if (error) throw error;
      const map: Record<string, any> = {};
      (data ?? []).forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });
}

export function useSetting<T = any>(key: SettingKey): T | undefined {
  const { data } = useAllSettings();
  return data?.[key];
}

export function useUpdateSetting() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const { error } = await supabase
        .from("site_settings")
        .upsert({ key, value, updated_at: new Date().toISOString() });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_settings"] }),
  });
}

export function useMediaLinks() {
  return useQuery({
    queryKey: ["media_links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("media_links")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useUpsertLink() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (link: { id?: string; key: string; label: string; url: string; kind: string; sort_order: number }) => {
      const { error } = await supabase.from("media_links").upsert(link);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["media_links"] }),
  });
}

export function useBlogPosts(opts: { onlyPublished?: boolean } = { onlyPublished: true }) {
  return useQuery({
    queryKey: ["blog_posts", opts.onlyPublished],
    queryFn: async () => {
      let q = supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
      if (opts.onlyPublished) q = q.eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useUpsertPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: any) => {
      const { error } = await supabase.from("blog_posts").upsert({
        ...post,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog_posts"] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog_posts"] }),
  });
}

export function useHtmlWidgets() {
  return useQuery({
    queryKey: ["html_widgets"],
    queryFn: async () => {
      const { data, error } = await supabase.from("html_widgets").select("*");
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useUpsertWidget() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (w: { id?: string; key: string; label: string; html: string; enabled: boolean }) => {
      const { error } = await supabase.from("html_widgets").upsert(w);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["html_widgets"] }),
  });
}

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email });
      if (error && !error.message.toLowerCase().includes("duplicate")) throw error;
    },
  });
}
