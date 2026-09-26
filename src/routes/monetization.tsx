import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { ToolForm } from "@/components/tool-form";
import { Shell } from "@/components/shell";
import { formatCount } from "@/components/live-count";
import { seo } from "@/lib/seo";

import { checkMonetization, type MonetizationReport } from "@/lib/youtube-tools";

export const Route = createFileRoute("/monetization")({
  head: () =>
    seo(
      "YouTube Monetization Checker — Is This Channel Monetized? | TubeNova",
      "Check if a YouTube channel is monetized. Paste a channel link. Under 1,000 subscribers it shows Not monetized. Past that bar it shows Monetized.",
    ),
  component: MonetizationPage,
});

function MonetizationPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [report, setReport] = useState<MonetizationReport | null>(null);

  async function run(raw: string) {
    const next = raw.trim();
    setQuery(next);
    if (!next) {
      setError("Paste a channel link first.");
      setReport(null);
      return;
    }
    setLoading(true);
    setError("");
    try {
      setReport(await checkMonetization({ data: { q: next } }));
    } catch (cause) {
      setReport(null);
      setError(cause instanceof Error ? cause.message : "Check failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">YouTube</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">Is this channel monetized?</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          Paste a channel link. Under 1,000 subscribers it is not monetized. Past that bar it is marked monetized.
        </p>
        <ToolForm
          label="Channel link"
          placeholder="https://www.youtube.com/@MrBeast"
          value={query}
          loading={loading}
          button="Check monetization"
          onChange={setQuery}
          onSubmit={(value) => void run(value)}
        />
        {error ? <p className="mt-4 text-sm text-coral">{error}</p> : null}
        {report ? (
          <article className="profile-open mt-6 rounded-[32px] border border-white bg-white/90 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              {report.avatar ? <img src={report.avatar} alt="" referrerPolicy="no-referrer" className="size-16 rounded-full object-cover" /> : null}
              <div>
                <p className="text-sm text-primary">{report.handle}</p>
                <h2 className="font-display text-3xl">{report.title}</h2>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className={`grid size-14 place-items-center rounded-full ${report.eligible ? "bg-emerald-100 text-money" : "bg-rose-100 text-coral"}`}>
                {report.eligible ? <Check className="size-8" strokeWidth={3} /> : <X className="size-8" strokeWidth={3} />}
              </span>
              <p className={`font-display text-4xl ${report.eligible ? "text-money" : "text-coral"}`}>{report.headline}</p>
            </div>
            <dl className="mt-6 grid gap-3 sm:grid-cols-3">
              <Stat label="Subscribers" value={formatCount(report.subscribers)} />
              <Stat label="Required" value="1,000" />
              <Stat label="Views" value={formatCount(report.views)} />
            </dl>
          </article>
        ) : null}
      </section>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-2 px-4 py-3">
      <p className="text-xs tracking-wide text-muted uppercase">{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}
