"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: number;
  decimals: number;
  suffix: string;
  duration?: number;
}

function AnimatedCounter({ target, decimals, suffix, duration = 1800 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          let startTimestamp: number | null = null;
          
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Cubic ease-out curve for premium feel
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(easeProgress * target);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <span ref={elementRef}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const stats = [
  { target: 45, decimals: 0, suffix: "+", label: "Countries Reached" },
  { target: 30, decimals: 0, suffix: "+", label: "Languages Supported" },
  { target: 25, decimals: 0, suffix: "K+", label: "Teachers Empowered" },
  { target: 1.2, decimals: 1, suffix: "M+", label: "Active Students" },
];

export default function GlobalStatsSection() {
  return (
    <section id="global" className="py-24 border-y border-white/5 bg-[#0d0e13] scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center fade-up">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="text-5xl font-medium signature-gradient mb-3">
              <AnimatedCounter target={s.target} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <div className="text-on-surface-variant uppercase tracking-widest text-xs">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
