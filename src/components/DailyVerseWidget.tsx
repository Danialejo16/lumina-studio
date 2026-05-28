import { useEffect, useRef } from "react";

export function DailyVerseWidget() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;
    const s = document.createElement("script");
    s.src = "https://dailyverses.net/get/verse.js?language=nvi";
    s.async = true;
    s.defer = true;
    ref.current.appendChild(s);
  }, []);

  return (
    <div ref={ref} className="glass rounded-2xl p-8 text-center min-h-32">
      <div id="dailyVersesWrapper" />
    </div>
  );
}
