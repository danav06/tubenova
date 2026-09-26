import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | TubeNova" },
      { name: "description", content: "Terms for using TubeNova." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <Shell>
      <article className="mx-auto max-w-2xl space-y-4 px-4 pt-12 text-base leading-7 text-muted">
        <h1 className="font-display text-4xl text-fg">Terms</h1>
        <p>TubeNova is independent. It is not affiliated with YouTube or Google.</p>
        <p>Public statistics may be rounded, delayed, hidden, or shown as a labeled preview. Do not treat the ticker animation as an official platform figure.</p>
        <p>Do not use TubeNova to harvest personal data or bypass privacy controls.</p>
      </article>
    </Shell>
  );
}
