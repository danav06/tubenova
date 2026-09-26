import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { readExtraPosts, writeExtraPosts } from "@/lib/studio-store";
import type { Post } from "@/lib/types";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio | TubeNova" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StudioPage,
});

const empty = (): Post => ({
  slug: "",
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Notes",
  minutes: 5,
  blocks: [{ kind: "p", text: "" }],
});

function StudioPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [draft, setDraft] = useState<Post>(empty);
  const [status, setStatus] = useState("Drafts stay in this browser and show up on the blog.");

  useEffect(() => {
    setPosts(readExtraPosts());
  }, []);

  function save(event: React.FormEvent) {
    event.preventDefault();
    const slug = draft.slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    if (!draft.title.trim() || !slug) {
      setStatus("Title and slug are required.");
      return;
    }
    const nextPost: Post = {
      ...draft,
      slug,
      title: draft.title.trim(),
      description: draft.description.trim() || draft.title.trim(),
      blocks: draft.blocks.filter((block) => block.text.trim()),
    };
    const next = [nextPost, ...posts.filter((post) => post.slug !== slug)];
    writeExtraPosts(next);
    setPosts(next);
    setDraft(empty());
    setStatus("Saved. Open the blog to see it.");
  }

  return (
    <Shell>
      <section className="mx-auto grid max-w-6xl gap-6 px-4 pt-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Studio</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">Write the next post</h1>
          <p className="mt-3 text-sm leading-6 text-muted">{status}</p>
          <ul className="mt-6 space-y-2">
            {posts.map((post) => (
              <li key={post.slug}>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-line px-4 py-3 text-left text-sm"
                  onClick={() => setDraft(post)}
                >
                  {post.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={save} className="space-y-3 rounded-3xl border border-line bg-surface p-5 lg:col-span-3">
          <Field label="Title" value={draft.title} onChange={(title) => setDraft({ ...draft, title })} />
          <Field label="Slug" value={draft.slug} onChange={(slug) => setDraft({ ...draft, slug })} />
          <Field
            label="Description"
            value={draft.description}
            onChange={(description) => setDraft({ ...draft, description })}
          />
          <label className="block text-sm text-muted">
            Body
            <textarea
              value={draft.blocks.map((block) => block.text).join("\n\n")}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  blocks: event.target.value.split(/\n\n+/).map((text) => ({ kind: "p", text })),
                })
              }
              className="mt-2 min-h-48 w-full rounded-2xl border border-line bg-bg px-4 py-3 text-base text-fg outline-none"
            />
          </label>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="h-11 rounded-full bg-primary px-5 font-semibold text-primary-ink">
              Publish in this browser
            </button>
            <Link to="/blog" className="inline-flex h-11 items-center text-sm text-primary">
              View blog
            </Link>
          </div>
        </form>
      </section>
    </Shell>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-12 w-full rounded-2xl border border-line bg-bg px-4 text-base text-fg outline-none"
      />
    </label>
  );
}
