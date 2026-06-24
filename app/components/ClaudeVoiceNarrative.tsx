"use client";

import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const LINES = [
  { text: "You pour everything into Claude.", muted: false },
  { text: "It has a brain.", muted: false },
];

export function ClaudeVoiceNarrative() {
  return (
    <section id="philosophy" className="relative overflow-hidden px-6 py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--green-tint) 0%, transparent 65%)" }}
      />

      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="tracking-luxe mb-8 text-xs uppercase text-green"
        >
          The missing piece
        </motion.p>

        <h2 className="font-display text-4xl font-light leading-[1.1] sm:text-6xl">
          {LINES.map((l, i) => (
            <motion.span
              key={l.text}
              className="block text-ink"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.15 }}
            >
              {l.text}
            </motion.span>
          ))}
          <motion.span
            className="mt-2 block italic text-green"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
          >
            Now give it a voice.
          </motion.span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-ink-soft"
        >
          We spend hours typing our thoughts into Claude — and it thinks back
          brilliantly. But it has never been able to speak. Aria blends those two
          worlds, so the intelligence you already trust can finally talk with you.
        </motion.p>

        {/* type → voice transformation band */}
        <div className="mx-auto mt-16 max-w-2xl">
          <TypeToVoice />
          <div className="mt-4 flex justify-between text-xs text-ink/40">
            <span>Typed thought</span>
            <span className="text-green">Spoken with Aria</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Left: thin "typed" ticks. Right: tall living waveform. Typing becomes voice.
function TypeToVoice() {
  const N = 56;
  return (
    <div className="flex h-24 items-center gap-1.5">
      {Array.from({ length: N }).map((_, i) => {
        const t = i / (N - 1);
        const isVoice = t > 0.45;
        const bell = Math.sin(((t - 0.45) / 0.55) * Math.PI);
        const voiceH = 10 + Math.max(0, bell) * 64;
        return isVoice ? (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-green"
            style={{ opacity: 0.35 + Math.max(0, bell) * 0.6 }}
            animate={{ height: [voiceH, voiceH + 16, voiceH] }}
            transition={{
              duration: 1.3 + (i % 4) * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.03,
            }}
          />
        ) : (
          <span
            key={i}
            className="w-[3px] rounded-full bg-ink/25"
            style={{ height: 6 }}
          />
        );
      })}
    </div>
  );
}
