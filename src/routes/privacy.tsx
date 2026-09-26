import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | TubeNova" },
      { name: "description", content: "How TubeNova handles lookups." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-2xl space-y-4 px-4 pt-12 text-base leading-7 text-muted">
        <h1 className="font-display text-4xl text-fg">Privacy</h1>
        <p>Lookups run when you paste a link. TubeNova does not require an account.</p>
        <p>Blog drafts you write in Studio stay in this browser. They are not uploaded.</p>
        <p>If a YouTube key is configured, YouTube receives the channel lookup you start. Their policies apply to that request.</p>
      </article>
    </Shell>
  );
}
