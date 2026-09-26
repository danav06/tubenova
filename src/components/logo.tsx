import { useId } from "react";

export function LogoMark({ className = "size-9" }: { className?: string }) {
  const raw = useId().replace(/:/g, "");
  const paint = `paint${raw}`;
  const shine = `shine${raw}`;
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={paint} x1="6" y1="4" x2="58" y2="60">
          <stop offset="0" stopColor="#6d3dff" />
          <stop offset="0.46" stopColor="#ff4d6d" />
          <stop offset="1" stopColor="#f0b429" />
        </linearGradient>
        <radialGradient id={shine} cx="32%" cy="28%" r="55%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke={`url(#${paint})`} strokeWidth="2.4" />
      <circle cx="32" cy="32" r="24.5" fill={`url(#${paint})`} />
      <circle cx="32" cy="32" r="24.5" fill={`url(#${shine})`} />
      <circle cx="32" cy="32" r="20" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
      <path d="M28 22.2 44.4 32 28 41.8Z" fill="#fff" />
      <path d="M48.2 13.4 49.6 17l3.8.4-2.9 2.4.9 3.6-3.4-2-3.4 2 .9-3.6-2.9-2.4 3.8-.4Z" fill="#fff" />
    </svg>
  );
}
