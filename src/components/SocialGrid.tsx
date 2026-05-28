import { useMediaLinks } from "@/hooks/useSiteData";
import { Youtube, Instagram, Heart, DollarSign, Music2, Archive, Link as LinkIcon } from "lucide-react";

const ICONS: Record<string, any> = {
  youtube: Youtube,
  instagram: Instagram,
  tiktok: Music2,
  patreon: Heart,
  paypal: DollarSign,
  archive: Archive,
};

export function SocialGrid({ filter }: { filter?: (k: string) => boolean }) {
  const { data: links = [] } = useMediaLinks();
  const list = filter ? links.filter((l) => filter(l.key)) : links;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {list.map((l) => {
        const Icon = ICONS[l.key] ?? LinkIcon;
        return (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="glass rounded-2xl p-6 flex flex-col items-center gap-3 hover-spirit"
          >
            <Icon size={28} className="text-spirit" />
            <span className="text-sm">{l.label}</span>
          </a>
        );
      })}
    </div>
  );
}
