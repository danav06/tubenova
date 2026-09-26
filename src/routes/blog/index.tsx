import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { POSTS } from "@/lib/posts";
import type { Post } from "@/lib/types";
import { seo } from "@/lib/seo";
import { readExtraPosts } from "@/lib/studio-store";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo(
      "YouTube Guides — Subscriber Count, Monetization, Transcripts | TubeNova",
      "Guides on checking a YouTube subscriber count, monetization, downloading thumbnails, and generating a video transcript.",
    ),
  component: BlogIndex,
});

function BlogIndex() {
  const [extra, setExtra] = useState<Post[]>([]);
  useEffect(() => {
    setExtra(readExtraPosts());
  }, []);
  const posts = [...extra, ...POSTS];

  return (
    <Shell>
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Editorial</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight sm:text-6xl">Signals from the public count.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Practical explainers that answer the search, then send you into a live lookup.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="lift-card rounded-[28px] border border-white bg-white/85 p-6 shadow-sm"
            >
              <p className="text-xs text-muted">
                {post.date} · {post.category}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          <Link to="/studio" className="text-primary">
            Write a post in Studio
          </Link>
        </p>
      </section>
    </Shell>
  );
}
