import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { formatCount, LiveCount } from "@/components/live-count";
import { SearchForm } from "@/components/search-form";
import { Shell } from "@/components/shell";
import { POSTS } from "@/lib/posts";
import { JsonLd } from "@/components/json-ld";
import { seo } from "@/lib/seo";
import type { Profile } from "@/lib/types";

type Search = { q?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    q: typeof search.q === "string" && search.q.trim() ? search.q : undefined,
  }),
  beforeLoad: ({ search }) => {
    const q = search.q?.trim();
    if (!q) return;
    throw redirect({ to: "/youtube", search: { q } });
  },
  head: () =>
    seo(
      "YouTube Subscriber Count Checker | TubeNova",
      "Free YouTube subscriber count checker. Paste a channel link for subscribers, views, and videos. Also check monetization, download thumbnails, and get a video transcript.",
    ),
  component: Home,
});

function Home() {
  const ribbon = ["Live subscribers", "Public photo", "View count", "Video count", "Press Enter"];
  const [profile, setProfile] = useState<Profile | null>(null);
  return (
    <Shell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "TubeNova",
          description: "Free YouTube subscriber count checker, monetization check, thumbnail download, and video transcript generator.",
        }}
      />
      <section className="hero-sky">
        <div className="hero-art" aria-hidden="true">
          <span className="ribbon ribbon-a" />
          <span className="ribbon ribbon-b" />
          <span className="ribbon ribbon-c" />
        </div>
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 pt-8 pb-12 lg:grid-cols-12 lg:pt-10">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center rounded-full border border-white bg-white/70 px-3 py-1 text-xs font-semibold tracking-[0.2em] text-primary uppercase shadow-sm">
              <span className="live-dot">YouTube, live</span>
            </p>
            <h1 className="mt-5 max-w-xl font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              <span className="word" style={{ animationDelay: "40ms" }}>YouTube</span>{" "}
              <span className="word" style={{ animationDelay: "120ms" }}>subscriber</span>{" "}
              <span className="word" style={{ animationDelay: "200ms" }}>count,</span>{" "}
              <span className="word gradient-text" style={{ animationDelay: "280ms" }}>live.</span>
            </h1>
            <p className="word mt-5 max-w-lg text-lg leading-8 text-muted" style={{ animationDelay: "360ms" }}>
              Free YouTube subscriber count checker. Paste a channel URL or @handle and the stage shows subscribers, views, and videos.
            </p>
            <SearchForm onProfile={setProfile} />
          </div>
          <Stage profile={profile} />
        </div>
      </section>

      <div className="marquee-wrap" aria-hidden="true">
        <div className="marquee-track">
          {[...ribbon, ...ribbon].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-4">
        <h2 className="font-display text-4xl tracking-tight">More YouTube tools</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Link to="/monetization" className="lift-card rounded-[28px] border border-white bg-white/80 p-6 shadow-sm">
            <h3 className="font-display text-3xl">Monetization</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Check the public subscriber bar a channel must clear before ads can be turned on.</p>
          </Link>
          <Link to="/thumbnails" className="lift-card rounded-[28px] border border-white bg-white/80 p-6 shadow-sm">
            <h3 className="font-display text-3xl">Thumbnails</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Download a video thumbnail or a channel profile photo.</p>
          </Link>
          <Link to="/transcript" className="lift-card rounded-[28px] border border-white bg-white/80 p-6 shadow-sm">
            <h3 className="font-display text-3xl">Transcript</h3>
            <p className="mt-2 text-sm leading-6 text-muted">Paste a video link and read the words from its caption track.</p>
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-4xl tracking-tight">Guides beside the tool</h2>
          <Link to="/blog" className="hidden items-center gap-1 text-sm font-semibold text-primary sm:inline-flex">
            All posts <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {POSTS.slice(0, 3).map((post, index) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="lift-card flex min-h-52 flex-col rounded-[28px] border border-white bg-white/80 p-6 shadow-sm"
            >
              <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
                0{index + 1} · {post.minutes} min
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight tracking-tight">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted">{post.description}</p>
              <span className="mt-4 text-sm font-semibold text-primary">Read</span>
            </Link>
          ))}
        </div>
      </section>

      <Faqs />
    </Shell>
  );
}

function Stage({ profile }: { profile: Profile | null }) {
  const [photoOk, setPhotoOk] = useState(true);
  useEffect(() => {
    setPhotoOk(true);
  }, [profile?.avatar]);
  const initial = (profile?.title || "?").slice(0, 1).toUpperCase();

  return (
    <aside key={profile?.id ?? "empty"} className="stage profile-open relative min-h-[22rem] p-7 lg:col-span-5">
      <span className="halo" aria-hidden="true" />
      <div className="relative flex items-center gap-4">
        {profile ? (
          <div className="relative size-16 shrink-0">
            {photoOk && profile.avatar ? (
              <img
                src={profile.avatar}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setPhotoOk(false)}
                className="size-16 rounded-full object-cover"
              />
            ) : (
              <span className="grid size-16 place-items-center rounded-full bg-primary font-display text-xl text-white">
                {initial}
              </span>
            )}
          </div>
        ) : null}
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.22em] text-muted uppercase">
            {profile ? profile.handle : "Your channel"}
          </p>
          <p className="mt-1 truncate font-display text-3xl">{profile ? profile.title : "Waiting for a link"}</p>
        </div>
      </div>
      <p className="relative mt-6 font-display text-6xl tracking-tight sm:text-7xl">
        {profile ? <LiveCount value={profile.subscribers} /> : "—"}
      </p>
      <p className="relative mt-1 text-sm text-muted">Subscribers</p>
      <dl className="relative mt-8 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl border border-white bg-white/70 px-3 py-3">
          <dt className="text-muted">Views</dt>
          <dd className="mt-1 font-semibold">{profile ? compact(profile.views) : "—"}</dd>
        </div>
        <div className="rounded-2xl border border-white bg-white/70 px-3 py-3">
          <dt className="text-muted">Videos</dt>
          <dd className="mt-1 font-semibold">{profile ? formatCount(profile.videos) : "—"}</dd>
        </div>
      </dl>
    </aside>
  );
}

const FAQS = [
  {
    q: "How do I check a YouTube subscriber count?",
    a: "Paste a channel URL or @handle and press Enter. The stage and the card show the photo, subscribers, views, and videos.",
  },
  {
    q: "Is the subscriber count exact?",
    a: "Above 1,000 subscribers, YouTube rounds the public number to three significant figures. Channel owners see the exact count in YouTube Studio.",
  },
  {
    q: "Can I tell if a channel is monetized?",
    a: "Open Monetization check and paste the channel. Under 1,000 subscribers it shows Not monetized. Past that bar it shows Monetized.",
  },
  {
    q: "Can I download a thumbnail or profile photo?",
    a: "Yes. Open Thumbnails, paste a video link for that thumbnail, or a channel link for the profile photo and recent video thumbnails.",
  },
  {
    q: "How does the transcript work?",
    a: "Paste a video link. TubeNova reads the caption track YouTube made from the audio, and uses the creator’s own captions when they exist.",
  },
];

function compact(value: number): string {
  if (!value) return "—";
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function Faqs() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <h2 className="font-display text-4xl tracking-tight">Frequently asked questions</h2>
      <div className="mt-6 divide-y divide-line overflow-hidden rounded-[28px] border border-white bg-white/90">
        {FAQS.map((item, index) => {
          const shown = open === index;
          return (
            <article key={item.q}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={shown}
                onClick={() => setOpen(shown ? null : index)}
              >
                <span className="text-base font-semibold">{item.q}</span>
                <span className={`grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface-2 text-muted transition ${shown ? "rotate-180" : ""}`}>
                  <ChevronDown className="size-4" />
                </span>
              </button>
              {shown ? <p className="px-5 pb-5 text-sm leading-7 text-muted">{item.a}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
