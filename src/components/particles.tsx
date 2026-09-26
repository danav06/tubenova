import { useEffect, useRef } from "react";

type Speck = { x: number; y: number; vx: number; vy: number; r: number; color: string };

const COLORS = ["91,46,234", "255,77,58", "180,120,20", "12,138,102"];

export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let specks: Speck[] = [];
    let raf = 0;
    let alive = true;
    let last = 0;

    const seed = () => {
      const count = Math.max(24, Math.min(48, Math.floor((width * height) / 42000)));
      specks = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 0.7 + Math.random() * 1.2,
        color: COLORS[index % COLORS.length],
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      seed();
    };

    const draw = (now: number) => {
      if (!alive) return;
      raf = window.requestAnimationFrame(draw);
      if (document.hidden || now - last < 32) return;
      last = now;
      ctx.clearRect(0, 0, width, height);
      for (const speck of specks) {
        speck.x += speck.vx;
        speck.y += speck.vy;
        if (speck.x < -8) speck.x = width + 8;
        else if (speck.x > width + 8) speck.x = -8;
        if (speck.y < -8) speck.y = height + 8;
        else if (speck.y > height + 8) speck.y = -8;
        ctx.fillStyle = `rgba(${speck.color},0.45)`;
        ctx.fillRect(speck.x, speck.y, speck.r, speck.r);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(draw);

    return () => {
      alive = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="particle-field" aria-hidden="true" />;
}
