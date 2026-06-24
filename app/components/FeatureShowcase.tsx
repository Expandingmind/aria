"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FeatureShowcase() {
  return (
    <div className="space-y-24 md:space-y-36">
      {/* ── Voice ── */}
      <Row
        eyebrow="Voice"
        title="A voice that listens, and answers."
        body="Talk the way you'd talk to a person — ramble, pause, change your mind. Aria hears you clearly, holds the thread, and replies out loud in a calm, natural voice you can listen to anywhere."
        visual={<VoiceVisual />}
      />

      {/* ── Memory ── */}
      <Row
        reverse
        eyebrow="Memory"
        title="Memory that actually lasts."
        body="Your projects, your preferences, the threads of past conversations — Aria keeps them all and brings them forward exactly when they matter. You never start from zero again."
        visual={<MemoryVisual />}
      />

      {/* ── Contacts ── */}
      <Row
        eyebrow="Contacts"
        title="It knows the people in your world."
        body="Introduce Aria to the people who matter and it keeps the context on who's who. A name is enough — no re-explaining relationships, history, or what you owe whom."
        visual={<ContactsVisual />}
      />
    </div>
  );
}

function Row({
  eyebrow,
  title,
  body,
  visual,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
      <Reveal className={reverse ? "md:order-2" : ""}>
        <p className="tracking-luxe mb-4 text-xs uppercase text-green">
          {eyebrow}
        </p>
        <h3 className="font-display text-3xl font-light leading-tight sm:text-[2.6rem]">
          {title}
        </h3>
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
          {body}
        </p>
      </Reveal>
      <Reveal delay={0.12} className={reverse ? "md:order-1" : ""}>
        <div className="relative rounded-[32px] border border-ink/10 bg-beige-deep/40 p-8">
          {visual}
        </div>
      </Reveal>
    </div>
  );
}

/* ---- Mock UI visuals ---- */

function VoiceVisual() {
  return (
    <div className="flex h-56 items-center justify-center gap-1.5">
      {Array.from({ length: 40 }).map((_, i) => {
        const bell = Math.sin((i / 39) * Math.PI);
        const base = 6 + bell * 70;
        return (
          <motion.span
            key={i}
            className="w-1 rounded-full"
            style={{ background: i % 3 === 0 ? "var(--green)" : "var(--ink)", opacity: 0.2 + bell * 0.6 }}
            animate={{ height: [base, base + 18, base] }}
            transition={{ duration: 1.4 + (i % 5) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.03 }}
          />
        );
      })}
    </div>
  );
}

function MemoryVisual() {
  const memories = [
    "Launch copy due Thursday",
    "Prefers concise summaries",
    "Q3 goal: 3 new partners",
    "Calls family on Sundays",
  ];
  return (
    <div className="flex h-56 flex-col justify-center gap-3">
      {memories.map((m, i) => (
        <motion.div
          key={m}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
          className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-beige px-4 py-3"
        >
          <span className="h-2 w-2 shrink-0 rounded-full bg-green" />
          <span className="text-sm text-ink">{m}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ContactsVisual() {
  const people = [
    { n: "Maya", r: "Design lead" },
    { n: "David", r: "Investor" },
    { n: "Lena", r: "Co-founder" },
  ];
  return (
    <div className="flex h-56 flex-col justify-center gap-3">
      {people.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
          className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-beige px-4 py-3"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full bg-green-tint font-display text-lg text-green">
            {p.n[0]}
          </span>
          <div>
            <p className="text-sm font-medium text-ink">{p.n}</p>
            <p className="text-xs text-ink/50">{p.r}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
