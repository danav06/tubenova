import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { JsonLd } from "@/components/json-ld";
import { findPost } from "@/lib/posts";
import { seo } from "@/lib/seo";
import { readExtraPosts } from "@/lib/studio-store";
import type { Post } from "@/lib/types";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = findPost(params.slug);
    return seo(post ? `${post.title} | TubeNova` : "Article | TubeNova", post?.description ?? "TubeNova YouTube guide");
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { slug } = Route.useParams();
  const builtIn = findPost(slug);
  const [extra, setExtra] = useState<Post | null>(null);

  useEffect(() => {
    if (builtIn) return;
    setExtra(readExtraPosts().find((post) => post.slug === slug) ?? null);
  }, [builtIn, slug]);

  const post = builtIn ?? extra;

  return (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 pt-12">
        <Link to="/blog" className="text-sm text-primary">
          All posts
        </Link>
        {post ? (
          <>
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Article",
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                author: { "@type": "Organization", name: "TubeNova" },
              }}
            />
            <p className="mt-6 text-xs tracking-wide text-muted uppercase">
              {post.date} · {post.minutes} min · {post.category}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight">{post.title}</h1>
            <div className="mt-8 space-y-4 text-base leading-7 text-fg/90">
              {post.blocks.map((block, index) =>
                block.kind === "h2" ? (
                  <h2 key={index} className="pt-4 font-display text-2xl text-fg">
                    {block.text}
                  </h2>
                ) : (
                  <p key={index}>{block.text}</p>
                ),
              )}
            </div>
          </>
        ) : (
          <p className="mt-8 text-muted">That post is not here. It may only exist in this browser’s Studio drafts.</p>
        )}
      </article>
    </Shell>
  );
}
