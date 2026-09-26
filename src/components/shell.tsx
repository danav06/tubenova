import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { LogoMark } from "@/components/logo";
import { ParticleField } from "@/components/particles";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/youtube", label: "YouTube" },
  { to: "/blog", label: "Blog" },
] as const;

const TOOLS = [
  { to: "/youtube", label: "Subscriber count" },
  { to: "/monetization", label: "Monetization check" },
  { to: "/thumbnails", label: "Thumbnails" },
  { to: "/transcript", label: "Transcript" },
] as const;

export function Shell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen text-fg">
      <div className="aurora" aria-hidden="true">
        <ParticleField />
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
      </div>
      <header className="sticky top-3 z-30 px-3">
        <div className="nav-float mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full border border-white/80 px-3">
          <Link to="/" className="flex items-center gap-2 pl-2 font-display text-lg font-bold tracking-tight">
            <span className="logo-spin">
            <LogoMark className="size-10" />
            </span>
            <span className="gradient-text">TubeNova</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="rounded-full px-3 py-2 text-sm text-muted hover:bg-white hover:text-fg"
              activeProps={{ className: "rounded-full bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm" }}
            >
              Home
            </Link>
            <div className="group relative">
              <Link
                to="/tools"
                className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-muted hover:bg-white hover:text-fg"
                activeProps={{ className: "inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm" }}
              >
                Tools
                <ChevronDown className="size-3.5" />
              </Link>
              <div className="invisible absolute top-full left-1/2 z-50 w-56 -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-2xl border border-white bg-white p-2 shadow-lg">
                  {TOOLS.map((tool) => (
                    <Link
                      key={tool.to}
                      to={tool.to}
                      className="block rounded-xl px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-fg"
                      activeProps={{ className: "block rounded-xl bg-surface-2 px-3 py-2 text-sm font-semibold text-primary" }}
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {LINKS.filter((link) => link.to !== "/").map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-full px-3 py-2 text-sm text-muted hover:bg-white hover:text-fg"
                activeProps={{ className: "rounded-full bg-white px-3 py-2 text-sm font-semibold text-primary shadow-sm" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/youtube"
            className="btn-glow hidden h-11 items-center rounded-full px-5 text-sm font-semibold text-white md:inline-flex"
          >
            Check a channel
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className="flex flex-col gap-1 border-t border-line px-4 py-3 md:hidden" aria-label="Mobile">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="rounded-xl px-3 py-3 text-base text-muted"
                activeProps={{ className: "rounded-xl bg-white px-3 py-3 text-base font-semibold text-primary" }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="px-3 pt-2 text-xs font-semibold tracking-[0.16em] text-primary uppercase">Tools</p>
            {TOOLS.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="rounded-xl px-3 py-3 text-base text-muted"
                activeProps={{ className: "rounded-xl bg-white px-3 py-3 text-base font-semibold text-primary" }}
                onClick={() => setOpen(false)}
              >
                {tool.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>
      <main className="page-enter">{children}</main>
      <footer className="footer-band mt-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl">TubeNova</p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              YouTube stats, monetization, thumbnails, and transcripts. Not affiliated with YouTube or Google.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <p className="font-semibold text-fg">Tools</p>
            <Link to="/youtube" className="hover:text-primary">YouTube subscriber count</Link>
            <Link to="/monetization" className="hover:text-primary">Monetization check</Link>
            <Link to="/thumbnails" className="hover:text-primary">Thumbnails</Link>
            <Link to="/transcript" className="hover:text-primary">Transcript</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <p className="font-semibold text-fg">Learn</p>
            <Link to="/blog" className="hover:text-primary">Blog</Link>
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/studio" className="hover:text-primary">Studio</Link>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <p className="font-semibold text-fg">Legal</p>
            <Link to="/privacy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
        <p className="px-4 pb-8 text-center text-xs text-muted">© {new Date().getFullYear()} TubeNova</p>
      </footer>
    </div>
  );
}
