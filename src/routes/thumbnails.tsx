import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ToolForm } from "@/components/tool-form";
import { Shell } from "@/components/shell";
import { saveBase64 } from "@/lib/save-file";
import { seo } from "@/lib/seo";

import { downloadMedia, listMedia, type Thumb } from "@/lib/youtube-tools";

export const Route = createFileRoute("/thumbnails")({
  head: () =>
    seo(
      "Download YouTube Thumbnails and Profile Photos | TubeNova",
      "Download a YouTube thumbnail or channel profile photo. Paste a video link for the thumbnail, or a channel link for the profile photo and recent thumbnails.",
    ),
  component: ThumbnailsPage,
});

function ThumbnailsPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<Thumb[]>([]);
  const [busy, setBusy] = useState("");

  async function run(raw: string) {
    const next = raw.trim();
    setQuery(next);
    if (!next) {
      setError("Paste a video or channel link first.");
      setItems([]);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await listMedia({ data: { q: next } });
      setTitle(result.title);
      setItems(result.items);
    } catch (cause) {
      setItems([]);
      setError(cause instanceof Error ? cause.message : "Lookup failed.");
    } finally {
      setLoading(false);
    }
  }

  async function save(item: Thumb) {
    setBusy(item.url);
    try {
      const file = await downloadMedia({ data: { url: item.url, name: item.title } });
      saveBase64(file.base64, file.type, file.name);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Download failed.");
    } finally {
      setBusy("");
    }
  }

  return (
    <Shell>
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">YouTube</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">Thumbnails and profile photos</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
          Paste a video link to download its thumbnail, or a channel link to download the profile photo and recent video thumbnails.
        </p>
        <ToolForm
          label="YouTube link"
          placeholder="Video or channel link"
          value={query}
          loading={loading}
          button="Find images"
          onChange={setQuery}
          onSubmit={(value) => void run(value)}
        />
        {error ? <p className="mt-4 text-sm text-coral">{error}</p> : null}
        {title ? <h2 className="mt-8 font-display text-3xl">{title}</h2> : null}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={`${item.id}-${item.label}`} className="overflow-hidden rounded-[28px] border border-white bg-white/90 shadow-sm">
              <img src={item.url} alt="" referrerPolicy="no-referrer" className="aspect-video w-full object-cover" />
              <div className="p-4">
                <p className="text-xs font-semibold tracking-wide text-primary uppercase">{item.label}</p>
                <p className="mt-1 line-clamp-2 text-sm">{item.title}</p>
                <button
                  type="button"
                  className="btn-glow mt-3 inline-flex h-10 items-center rounded-full px-4 text-sm font-semibold text-white"
                  onClick={() => void save(item)}
                >
                  {busy === item.url ? "Saving…" : "Download"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  );
}
