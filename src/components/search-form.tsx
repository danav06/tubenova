import { useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { ProfileCard } from "@/components/lookup-panel";
import { lookupProfile } from "@/lib/lookup";
import type { Profile } from "@/lib/types";

export function SearchForm({ onProfile }: { onProfile?: (profile: Profile | null) => void }) {
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const cardRef = useRef<HTMLDivElement>(null);

  async function go(raw: string) {
    const value = raw.trim();
    if (!value) {
      setHint("Paste a YouTube channel link.");
      setProfile(null);
      onProfile?.(null);
      return;
    }
    setQuery(value);
    setHint("");
    setError("");
    setLoading(true);
    try {
      const result = await lookupProfile({ data: { platform: "youtube", q: value } });
      setProfile(result);
      onProfile?.(result);
      requestAnimationFrame(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    } catch (cause) {
      setProfile(null);
      onProfile?.(null);
      setError(cause instanceof Error ? cause.message : "Lookup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form
        className="mt-8"
        onSubmit={(event) => {
          event.preventDefault();
          void go(query);
        }}
      >
        <div className="dock">
          <div className="dock-inner flex flex-col gap-3 p-2 sm:flex-row">
            <label className="sr-only" htmlFor="home-q">
              YouTube channel URL
            </label>
            <input
              id="home-q"
              suppressHydrationWarning
              value={query}
              enterKeyHint="search"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Paste a YouTube channel link"
              className="h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base outline-none"
            />
            <button type="submit" className="btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white">
              {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
              Check stats
            </button>
          </div>
        </div>
      </form>
      {hint ? <p className="mt-3 text-sm text-coral">{hint}</p> : null}
      {error ? <p className="mt-3 text-sm text-coral">{error}</p> : null}
      <p className="mt-3 text-xs text-muted">Press Enter or click Check stats. The card opens here.</p>
      <div ref={cardRef}>
        {loading && !profile ? (
          <div className="profile-open mt-4 flex items-center gap-3 rounded-[28px] border border-white bg-white px-5 py-6 shadow-sm">
            <LoaderCircle className="size-5 animate-spin text-primary" />
            <p className="font-semibold">Checking live stats…</p>
          </div>
        ) : null}
        {profile ? <ProfileCard profile={profile} platform="youtube" /> : null}
      </div>
    </div>
  );
}