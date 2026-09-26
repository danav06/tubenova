import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { seo } from "@/lib/seo";

const TOOLS = [
  {
    to: "/youtube",
    title: "Subscriber count",
    body: "Photo, subscribers, views, and videos.",
  },
  {
    to: "/monetization",
    title: "Monetization check",
    body: "See if a channel clears the 1,000-subscriber bar YouTube requires before ads.",
  },
  {
    to: "/thumbnails",
    title: "Thumbnails and profile photo",
    body: "Download a video thumbnail, or a channel photo and recent thumbnails.",
  },
  {
    to: "/transcript",
    title: "Video transcript",
    body: "Paste a video link and read the caption track made from the audio.",
  },
] as const;

export const Route = createFileRoute("/tools")({
  head: () =>
    seo(
      "Free YouTube Tools — Subscribers, Monetization, Thumbnails, Transcripts | TubeNova",
      "YouTube tools in one place: subscriber count checker, monetization check, thumbnail download, and video transcript generator.",
    ),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <Shell>
      <section className="mx-auto max-w-5xl px-4 pt-12 pb-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">YouTube tools</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">More than a subscriber count.</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {TOOLS.map((tool) => (
            <Link key={tool.to} to={tool.to} className="lift-card rounded-[28px] border border-white bg-white/85 p-6 shadow-sm">
              <h2 className="font-display text-3xl">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{tool.body}</p>
            </Link>
          ))}
        </div>
      </section>
    </Shell>
  );
}
