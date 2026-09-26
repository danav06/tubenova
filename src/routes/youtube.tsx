import { createFileRoute } from "@tanstack/react-router";
import { LookupPanel } from "@/components/lookup-panel";
import { Shell } from "@/components/shell";
import { lookupProfile } from "@/lib/lookup";
import { seo } from "@/lib/seo";
import type { Profile } from "@/lib/types";

type Search = { q?: string };

export const Route = createFileRoute("/youtube")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" ? search.q : undefined,
  }),
  loaderDeps: ({ search }) => ({ q: search.q ?? "" }),
  loader: async ({ deps }): Promise<Profile | null> => {
    if (!deps.q) return null;
    try {
      return await lookupProfile({ data: { platform: "youtube", q: deps.q } });
    } catch {
      return null;
    }
  },
  head: () =>
    seo(
      "YouTube Subscriber Count — Live Channel Stats | TubeNova",
      "Check a YouTube subscriber count for free. Paste a channel URL, @handle, or channel id to see subscribers, views, videos, and the profile photo.",
    ),
  component: YouTubePage,
});

function YouTubePage() {
  const { q } = Route.useSearch();
  const profile = Route.useLoaderData();
  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-6">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">YouTube</p>
        <h1 className="mt-3 max-w-2xl font-display text-5xl tracking-tight sm:text-6xl">
          The count, <span className="gradient-text italic">on stage.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-7 text-muted">
          Paste a channel URL or @handle. A rounded card opens underneath with the public photo and live counts.
        </p>
        <div className="mt-8">
          <LookupPanel key={q ?? ""} platform="youtube" initialQuery={q ?? ""} initialProfile={profile} />
        </div>
      </section>
    </Shell>
  );
}
