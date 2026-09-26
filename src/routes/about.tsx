import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo(
      "About TubeNova — Free YouTube Tools",
      "TubeNova is a free YouTube toolkit: subscriber counts, monetization check, thumbnail downloads, and video transcripts.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 pt-12">
        <h1 className="font-display text-4xl tracking-tight">A YouTube toolkit, not just a counter.</h1>
        <div className="mt-6 space-y-4 text-base leading-7 text-muted">
          <p>TubeNova looks at a public channel or video from every useful angle. Paste a link and get the stats, the monetization read, the images, or the spoken words.</p>
          <h2 className="pt-2 font-display text-2xl text-fg">What you can do</h2>
          <p>Check subscribers, views, and videos. See if a channel clears the public monetization bar. Download thumbnails and the profile photo. Turn a video’s spoken audio into paragraphs.</p>
          <h2 className="pt-2 font-display text-2xl text-fg">What we will not do</h2>
          <p>We do not invent a subscriber count when YouTube hides it. If a number is rounded or estimated, we say so.</p>
        </div>
      </article>
    </Shell>
  );
}
