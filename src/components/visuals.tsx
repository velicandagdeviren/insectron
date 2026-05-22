import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AmbientBackground() {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.7 0.22 145 / 0.35), transparent 70%)" }}
        animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 -right-40 h-[640px] w-[640px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.6 0.20 150 / 0.28), transparent 70%)" }}
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export function Particles({ count = 24 }: { count?: number }) {
  const [items, setItems] = useState<{ x: number; y: number; d: number; s: number }[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: 8 + Math.random() * 14,
        s: 1 + Math.random() * 3,
      })),
    );
  }, [count]);
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-primary/60"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, filter: "blur(0.5px)" }}
          animate={{ y: [0, -30, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

export function Counter({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}
