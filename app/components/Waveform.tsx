"use client";

import { motion } from "framer-motion";

// An idle, breathing voice waveform — the visual heart of a voice agent.
const BARS = 48;

export function Waveform({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: "4px", height: 96 }}
    >
      {Array.from({ length: BARS }).map((_, i) => {
        // a gentle bell curve so the centre bars are tallest
        const t = i / (BARS - 1);
        const bell = Math.sin(t * Math.PI);
        const base = 8 + bell * 56;
        const peak = base + 10 + bell * 18;
        return (
          <motion.span
            key={i}
            style={{
              width: 3,
              borderRadius: 99,
              background:
                i % 2 === 0 ? "var(--green)" : "var(--ink)",
              opacity: 0.18 + bell * 0.55,
            }}
            animate={{ height: [base, peak, base] }}
            transition={{
              duration: 1.6 + (i % 5) * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.04,
            }}
          />
        );
      })}
    </div>
  );
}
