import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import { seo } from "@/lib/seo";
import { transcribeVideo, type Transcript } from "@/lib/youtube-tools";

type Search = { url?: string };

export const Route = createFileRoute("/transcript")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    url: typeof search.url === "string" ? search.url : undefined,
  }),
  loaderDeps: ({ search }) => ({ url: search.url ?? "" }),
  loader: async ({ deps }): Promise<{ transcript: Transcript | null; error: string }> => {
    if (!deps.url.trim()) return { transcript: null, error: "" };
    try {
      return { transcript: await transcribeVideo({ data: { q: deps.url } }), error: "" };
    } catch (cause) {
      return { transcript: null, error: cause instanceof Error ? cause.message : "Transcript failed. Try that link again." };
    }
  },
  head: () =>
    seo(
      "YouTube Transcript Generator — Video to Text | TubeNova",
      "Free YouTube transcript generator. Paste a video link and get the spoken words as paragraphs you can copy or download.",
    ),
  component: TranscriptPage,
});

function TranscriptPage() {
  const { url = "" } = Route.useSearch();
  const { transcript, error } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const paragraphs = transcript ? toParagraphs(transcript.lines.map((line) => line.text)) : [];

  function download() {
    if (!transcript) return;
    const body = paragraphs.join("\n\n");
    const file = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = file;
    link.download = `${transcript.title.replace(/[^\w.-]+/g, "-").slice(0, 60) || "transcript"}.txt`;
    link.click();
    URL.revokeObjectURL(file);
  }

  return (
    <Shell>
      <section className="mx-auto max-w-3xl px-4 pt-12 pb-8">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">YouTube</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">Video transcript</h1>
        <p className="mt-4 text-lg leading-8 text-muted">Paste a video link. TubeNova turns the spoken audio into text.</p>
        <form className="dock mt-8" method="get" action="/transcript">
          <div className="dock-inner flex flex-col gap-3 p-2 sm:flex-row">
            <label className="sr-only" htmlFor="tool-q">
              Video link
            </label>
            <input
              id="tool-q"
              name="url"
              key={url}
              defaultValue={url}
              placeholder="https://www.youtube.com/watch?v=..."
              className="h-14 min-w-0 flex-1 rounded-2xl border border-transparent bg-transparent px-4 text-base outline-none"
            />
            <button type="submit" className="btn-glow inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 font-semibold text-white">
              Get transcript
            </button>
          </div>
        </form>
        {error ? <p className="mt-4 text-sm font-semibold text-coral">{error}</p> : null}
        {transcript ? (
          <article className="profile-open mt-6 rounded-[32px] border border-white bg-white/90 p-6 shadow-sm">
            <p className="text-sm text-primary">{transcript.author}</p>
            <h2 className="font-display text-3xl">{transcript.title}</h2>
            <p className="mt-2 text-xs tracking-wide text-muted uppercase">{transcript.language}</p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="btn-glow h-10 rounded-full px-4 text-sm font-semibold text-white"
                onClick={() => void navigator.clipboard.writeText(paragraphs.join("\n\n")).then(() => setCopied(true))}
              >
                {copied ? "Copied" : "Copy text"}
              </button>
              <button type="button" className="h-10 rounded-full border border-line bg-white px-4 text-sm font-semibold" onClick={download}>
                Download .txt
              </button>
            </div>
            <div className="mt-5 max-h-[32rem] space-y-4 overflow-auto pr-2">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-base leading-8 text-fg">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ) : null}
      </section>
    </Shell>
  );
}

function toParagraphs(parts: string[]): string[] {
  const speech = parts.join(" ").replace(/\s+/g, " ").trim();
  if (!speech) return [];
  const sentences = speech.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length < 4) return [speech];
  const paragraphs: string[] = [];
  for (let index = 0; index < sentences.length; index += 3) {
    paragraphs.push(sentences.slice(index, index + 3).join(" "));
  }
  return paragraphs;
}
