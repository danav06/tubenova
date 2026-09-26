import { useEffect, useState } from "react";

export function formatCount(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US").format(Math.floor(value));
}

export function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function LiveCount({
  value,
  pulse = true,
  money = false,
}: {
  value: number;
  pulse?: boolean;
  money?: boolean;
}) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    setShown(value);
  }, [value]);

  useEffect(() => {
    if (!pulse) return;
    const step = Math.max(1, Math.round(value * 0.0000004));
    const id = window.setInterval(() => {
      setShown((current) => Math.max(0, current + Math.round((Math.random() - 0.35) * step)));
    }, 1600);
    return () => window.clearInterval(id);
  }, [pulse, value]);

  return <span className="tabular-nums">{money ? formatMoney(shown) : formatCount(shown)}</span>;
}
