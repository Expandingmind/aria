"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AriaMark } from "./AriaMark";

// A looping "conversation" that types itself out — you speak, Aria answers.
const TURNS = [
  {
    role: "you" as const,
    text: "Remind me what I promised Maya about the launch.",
  },
  {
    role: "aria" as const,
    text: "You told Maya you'd send the final copy by Thursday. Want me to draft it now?",
  },
];

const TYPE_MS = 28;
const HOLD_MS = 2200;

export function TranscriptDemo() {
  const [turn, setTurn] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    const full = TURNS[turn].text;
    if (chars < full.length) {
      const t = setTimeout(() => setChars((c) => c + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setChars(0);
      setTurn((n) => (n + 1) % TURNS.length);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [chars, turn]);

  const current = TURNS[turn];
  const shown = current.text.slice(0, chars);
  const isYou = current.role === "you";

  return (
    <div className="w-full max-w-md rounded-[28px] border border-ink/10 bg-beige/70 p-6 shadow-[0_30px_80px_-40px_rgba(20,20,15,0.45)] backdrop-blur-xl">
      {/* status row */}
      <div className="flex items-center gap-3 border-b border-ink/10 pb-4">
        <span className="relative grid h-9 w-9 place-items-center">
          <AriaMark size={34} />
          <motion.span
            className="absolute inset-0 rounded-full border border-green"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
        </span>
        <div className="flex flex-1 items-center gap-[3px]">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[2px] rounded-full bg-green"
              animate={{ height: [4, 6 + (i % 5) * 4, 4] }}
              transition={{
                duration: 1.1 + (i % 4) * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
        <span className="tracking-luxe text-[10px] uppercase text-ink/40">
          Live
        </span>
      </div>

      {/* transcript */}
      <div className="min-h-[120px] pt-5">
        <p
          className={`tracking-luxe mb-2 text-[10px] uppercase ${
            isYou ? "text-ink/40" : "text-green"
          }`}
        >
          {isYou ? "You" : "Aria"}
        </p>
        <p
          className={`text-lg leading-relaxed ${
            isYou ? "text-ink" : "font-display text-xl italic text-green"
          }`}
        >
          {shown}
          <span className="ml-0.5 inline-block h-5 w-[2px] -translate-y-[1px] animate-pulse bg-green align-middle" />
        </p>
      </div>
    </div>
  );
}
