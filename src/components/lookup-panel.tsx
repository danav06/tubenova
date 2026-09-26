import { useEffect, useState } from "react";
import { LoaderCircle, Search } from "lucide-react";
import { lookupProfile } from "@/lib/lookup";
import type { Platform, Profile } from "@/lib/types";
import { formatCount, LiveCount } from "@/components/live-count";

const PLACEHOLDERS: Record<Platform, string> = {
  youtube: "https://www.youtube.com/@MrBeast",
};

export function LookupPanel({
  platform,
  initialQuery,
  initialProfile = null,
}: {
  platform: Platform;
  initialQuery: string;
  initialProfile?: Profile | null;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(Boolean(initialQuery.trim()) && !initialProfile);

  async function run(next: string) {
    const trimmed = next.trim();
    if (!trimmed) {
      setError("Paste a channel, profile, or page link.");
      return;
    }
    setQuery(trimmed);
    setLoading(true);
    setError("");
    try {
      const result = await lookupProfile({ data: { platform, q: trimmed } });
      setProfile(result);
    } catch (cause) {
      setProfile(null);
      setError(cause instanceof Error ? cause.message : "Lookup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (initialProfile || !initialQuery.trim()) return;
    void run(initialQuery);
    // Only when arriving from a link that the server could not resolve.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, platform, initialProfile]);

  return (
    <div>
      <form
        className="dock"
        onSubmit={(event) => {
          event.preventDefault();
          void run(query);
        }}
      >
        <div className="dock-inner flex flex-col gap-3 p-2 sm:flex-row">
        <label className="sr-only" htmlFor="lookup">
          Profile link
        </label>
        <input
          id="lookup"
          suppressHydrationWarning
          value={query}
          enterKeyHint="search"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;
            event.preventDefault();
            void run(event.currentTarget.value);
          }}
          placeholder={PLACEHOLDERS[platform]}
          className="h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base text-fg outline-none"
        />
        <button
          type="button"
          onClick={() => void run(query)}
          className="btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white"
        >
          {loading ? <LoaderCircle className="size-4 animate-spin" /> : <Search className="size-4" />}
          Check stats
        </button>
        </div>
      </form>
      <p className="mt-2 text-xs text-muted">Press Enter or click Check stats.</p>

      {error ? (
        <p className="card-enter mt-4 rounded-2xl border border-coral/30 bg-white px-4 py-3 text-sm text-coral">
          {error}
        </p>
      ) : null}

      {loading && !profile ? (
        <div className="profile-open mt-4 flex items-center gap-3 rounded-[28px] border border-white bg-white px-5 py-6 shadow-sm">
          <LoaderCircle className="size-5 animate-spin text-primary" />
          <p className="font-semibold">Checking live stats…</p>
        </div>
      ) : null}

      {profile ? <ProfileCard profile={profile} platform={platform} /> : null}
    </div>
  );
}

export function ProfileCard({ profile, platform }: { profile: Profile; platform: Platform }) {
  const [photoOk, setPhotoOk] = useState(true);
  const initial = (profile.title || "?").slice(0, 1).toUpperCase();

  return (
    <article
      key={`${profile.id}-${profile.title}`}
      className="profile-open lift-card relative mt-4 overflow-hidden rounded-[32px] border border-white bg-white/90 shadow-[0_30px_80px_-36px_rgba(42,33,64,0.45)]"
    >
      <div className="h-1.5 bg-gradient-to-r from-primary via-pink to-sun" />
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="relative size-28 shrink-0">
          {photoOk && profile.avatar ? (
            <img
              src={profile.avatar}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setPhotoOk(false)}
              className="size-28 rounded-full object-cover"
            />
          ) : (
            <div className="grid size-28 place-items-center rounded-full bg-primary font-display text-3xl text-white">
              {initial}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="live-dot inline-flex items-center text-xs font-semibold tracking-[0.16em] text-money uppercase">
            {profile.hidden ? "Public profile" : profile.source === "preview" ? "Preview" : "Live"}
          </p>
          <h2 className="mt-1 truncate font-display text-3xl tracking-tight">{profile.title}</h2>
          <p className="font-medium text-primary">{profile.handle}</p>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted">{profile.description}</p>
        </div>
      </div>
      <div className="grid gap-3 px-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label={platform === "youtube" ? "Subscribers" : "Followers"} delay="40ms">
          {profile.hidden ? "—" : <LiveCount value={profile.subscribers} pulse />}
        </Stat>
        <Stat label="Views" delay="100ms">
          {profile.hidden || !profile.views ? "—" : <LiveCount value={profile.views} />}
        </Stat>
        <Stat label={platform === "youtube" ? "Videos" : "Posts"} delay="160ms">
          {profile.hidden ? "—" : formatCount(profile.videos)}
        </Stat>
        <Stat label="Joined" delay="220ms">
          {profile.publishedAt}
        </Stat>
        <Stat label="Country" delay="280ms">
          {profile.country}
        </Stat>
      </div>
    </article>
  );
}

function Stat({
  label,
  children,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  delay: string;
}) {
  return (
    <div
      className="stat-enter rounded-2xl border border-line bg-surface-2/80 px-4 py-4"
      style={{ animationDelay: delay }}
    >
      <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-2 font-display text-2xl tracking-tight text-fg">{children}</p>
    </div>
  );
}
