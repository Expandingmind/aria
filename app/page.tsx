"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./components/Reveal";
import { Waveform } from "./components/Waveform";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative z-[2] flex flex-col text-ink">
      {/* ───────────────────────── Nav ───────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink">
              <span className="h-2 w-2 rounded-full bg-green-bright" />
            </span>
            <span className="font-display text-2xl font-medium tracking-tight">
              Aria
            </span>
          </a>
          <nav className="hidden items-center gap-9 text-sm text-ink-soft md:flex">
            <a href="#voice" className="link-underline">
              Voice
            </a>
            <a href="#memory" className="link-underline">
              Memory
            </a>
            <a href="#how" className="link-underline">
              How it works
            </a>
          </nav>
          <a
            href="#access"
            className="rounded-full border border-ink/15 bg-beige/60 px-5 py-2 text-sm backdrop-blur transition-colors hover:border-green hover:text-green"
          >
            Request access
          </a>
        </div>
      </header>

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section
        id="top"
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-28 text-center"
      >
        {/* soft radial green glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--green-tint) 0%, transparent 65%)",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroFade }} className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="tracking-luxe mb-7 text-xs uppercase text-green"
          >
            A voice-first AI agent
          </motion.p>

          <h1 className="font-display text-5xl font-light leading-[1.02] sm:text-7xl md:text-[5.5rem]">
            {["Give Claude", "a voice."].map((line, i) => (
              <motion.span
                key={line}
                className="block"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.15 + i * 0.12 }}
              >
                {i === 1 ? <em className="italic text-green">{line}</em> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-soft"
          >
            Speak naturally, and hear it think back. Aria is an AI agent with
            real memory and a sense of the people in your world — a calmer, more
            human way to work with intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.7 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#access"
              className="group relative overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm text-beige transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Request early access</span>
              <span className="absolute inset-0 -translate-x-full bg-green transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#how"
              className="rounded-full px-6 py-3.5 text-sm text-ink-soft transition-colors hover:text-green"
            >
              See how it listens →
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ opacity: heroFade }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.85 }}
          className="mt-16"
        >
          <Waveform />
        </motion.div>
      </section>

      {/* ──────────────────── Quiet philosophy line ──────────────────── */}
      <section className="border-y border-ink/10 bg-beige-deep/40">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <Reveal>
            <p className="font-display text-3xl font-light italic leading-snug text-ink sm:text-4xl">
              The most natural interface was never a screen.
              <br />
              <span className="text-green">It was always the voice.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────── Three pillars ───────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-28">
        <Reveal>
          <p className="tracking-luxe mb-4 text-xs uppercase text-green">
            What makes Aria, Aria
          </p>
          <h2 className="max-w-2xl font-display text-4xl font-light leading-tight sm:text-5xl">
            Three things, done with intention.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <article
                id={p.id}
                className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-beige p-8 transition-all duration-500 hover:-translate-y-1 hover:border-green/40 hover:shadow-[0_24px_60px_-30px_rgba(20,20,15,0.35)]"
              >
                <div className="mb-7 grid h-12 w-12 place-items-center rounded-2xl bg-green-tint text-green transition-colors group-hover:bg-green group-hover:text-beige">
                  {p.icon}
                </div>
                <h3 className="font-display text-2xl font-medium">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────────────────── How it works ───────────────────── */}
      <section id="how" className="bg-ink text-beige">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <Reveal>
            <p className="tracking-luxe mb-4 text-xs uppercase text-green-bright">
              How it works
            </p>
            <h2 className="max-w-2xl font-display text-4xl font-light leading-tight text-beige sm:text-5xl">
              Speak. It thinks. You hear it back.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-beige/10 bg-beige/10 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <div className="flex h-full flex-col bg-ink p-9">
                  <span className="font-display text-5xl font-light text-green-bright">
                    {s.n}
                  </span>
                  <h3 className="mt-6 text-xl font-medium text-beige">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-beige/60">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────── CTA ───────────────────── */}
      <section id="access" className="relative overflow-hidden px-6 py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--green-tint) 0%, transparent 65%)",
          }}
        />
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-light leading-tight sm:text-6xl">
            Be among the first to <em className="italic text-green">speak</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-lg text-ink-soft">
            Aria is in private development. Leave your email and we&apos;ll reach
            out when your voice can join the conversation.
          </p>

          <form
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-ink/15 bg-beige px-6 py-3.5 text-sm outline-none transition-colors placeholder:text-ink/40 focus:border-green"
            />
            <button
              type="submit"
              className="group relative overflow-hidden whitespace-nowrap rounded-full bg-ink px-7 py-3.5 text-sm text-beige transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Request access</span>
              <span className="absolute inset-0 -translate-x-full bg-green transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          </form>
          <p className="mt-4 text-xs text-ink/40">
            No spam. Just a note when Aria is ready to listen.
          </p>
        </Reveal>
      </section>

      {/* ───────────────────── Footer ───────────────────── */}
      <footer className="border-t border-ink/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-ink-soft sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-green-bright" />
            </span>
            <span className="font-display text-lg">Aria</span>
          </div>
          <p className="text-ink/50">
            © {new Date().getFullYear()} Aria. Giving intelligence a voice.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ───────────────────────── Content ───────────────────────── */

const PILLARS = [
  {
    id: "voice",
    title: "A voice that listens",
    body: "Talk the way you'd talk to a person. Aria hears you clearly, holds the thread, and answers out loud in a calm, natural voice.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <rect x="9" y="3" width="6" height="11" rx="3" />
        <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
      </svg>
    ),
  },
  {
    id: "memory",
    title: "Memory that lasts",
    body: "Aria remembers your projects, your preferences, and the threads of past conversations — so you never start from zero again.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a4 4 0 0 0-4 4 4 4 0 0 0-2 7 4 4 0 0 0 6 5 4 4 0 0 0 6-5 4 4 0 0 0-2-7 4 4 0 0 0-4-4Z" />
        <path d="M12 7v10" />
      </svg>
    ),
  },
  {
    id: "contacts",
    title: "Contacts it understands",
    body: "Give Aria the people in your world. It keeps context on who's who, so a name is enough — no re-explaining every time.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="8" r="3.2" />
        <path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 6.5a3 3 0 0 1 0 6M18 20a5 5 0 0 0-3-4.6" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    n: "01",
    title: "Speak",
    body: "Press to talk, or just start speaking. Aria transcribes you in real time with uncanny accuracy.",
  },
  {
    n: "02",
    title: "It thinks",
    body: "Powered by Claude, Aria reasons over your words with the full context of your memory and contacts.",
  },
  {
    n: "03",
    title: "You hear it back",
    body: "The answer returns as a natural spoken voice — a real conversation, not a wall of text.",
  },
];
