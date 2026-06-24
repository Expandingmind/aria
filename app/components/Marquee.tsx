"use client";

import { motion } from "framer-motion";

// A slow, elegant infinite marquee of the words that define Aria.
const WORDS = [
  "Voice",
  "Memory",
  "Contacts",
  "Presence",
  "Context",
  "Continuity",
  "Conversation",
  "Intuition",
];

export function Marquee() {
  const loop = [...WORDS, ...WORDS];
  return (
    <div className="relative flex overflow-hidden border-y border-ink/10 bg-beige py-6">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-beige to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-beige to-transparent" />

      <motion.div
        className="flex shrink-0 items-center gap-12 pr-12"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-3xl font-light italic text-ink/70">
              {w}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
