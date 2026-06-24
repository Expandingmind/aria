"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./components/Reveal";
import { Waveform } from "./components/Waveform";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { TranscriptDemo } from "./components/TranscriptDemo";
import { Marquee } from "./components/Marquee";
import { FeatureShowcase } from "./components/FeatureShowcase";
import { UseCases } from "./components/UseCases";
import { FAQ } from "./components/FAQ";
import { ClaudeVoiceNarrative } from "./components/ClaudeVoiceNarrative";
import { MobileShowcase } from "./components/MobileShowcase";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <>
      <SiteNav />
      <main className="relative z-[2] flex flex-col text-ink">
        {/* ───────────────────────── Hero ───────────────────────── */}
        <section
          id="top"
          ref={heroRef}
          className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-36"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--green-tint) 0%, transparent 65%)" }}
          />

          <motion.div style={{ y: heroY, opacity: heroFade }} className="grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            {/* left: copy */}
            <div className="text-center lg:text-left">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="tracking-luxe mb-7 text-xs uppercase text-green"
              >
                A voice-first AI agent
              </motion.p>

              <h1 className="font-display text-[3.4rem] font-light leading-[0.98] sm:text-7xl">
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
                className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-soft lg:mx-0"
              >
                Speak naturally, and hear it think back. Aria is an AI agent with
                real memory and a sense of the people in your world — a calmer,
                more human way to work with intelligence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE, delay: 0.7 }}
                className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
              >
                <a
                  href="#access"
                  className="group relative overflow-hidden rounded-full bg-ink px-8 py-3.5 text-sm text-beige transition-transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Request early access</span>
                  <span className="absolute inset-0 -translate-x-full bg-green transition-transform duration-500 group-hover:translate-x-0" />
                </a>
                <a href="#how" className="rounded-full px-6 py-3.5 text-sm text-ink-soft transition-colors hover:text-green">
                  See how it listens →
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.9 }}
                className="mt-10 flex items-center justify-center gap-5 text-xs text-ink/45 lg:justify-start"
              >
                {["Web", "macOS", "iOS"].map((p) => (
                  <span key={p} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green" />
                    {p}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* right: live demo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.6 }}
              className="flex justify-center lg:justify-end"
            >
              <TranscriptDemo />
            </motion.div>
          </motion.div>

          <motion.div style={{ opacity: heroFade }} className="mt-20 w-full max-w-3xl">
            <Waveform className="!justify-center" />
          </motion.div>
        </section>

        {/* ───────────────── Marquee ───────────────── */}
        <Marquee />

        {/* ───────────────── Give Claude a voice (narrative) ───────────────── */}
        <ClaudeVoiceNarrative />

        {/* ───────────────── Mobile / Action Button (big point, high up) ───────────────── */}
        <MobileShowcase />

        {/* ───────────────── Feature showcase ───────────────── */}
        <section id="features" className="mx-auto w-full max-w-6xl px-6 py-28">
          <Reveal className="mb-20 max-w-2xl">
            <p className="tracking-luxe mb-4 text-xs uppercase text-green">
              One agent. Your whole world.
            </p>
            <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
              Three things, done with intention.
            </h2>
          </Reveal>
          <FeatureShowcase />
        </section>

        {/* ───────────────── Speed comparison ───────────────── */}
        <section className="border-y border-ink/10 bg-beige-deep/70">
          <div className="mx-auto max-w-5xl px-6 py-28">
            <Reveal className="mb-14 text-center">
              <p className="tracking-luxe mb-4 text-xs uppercase text-green">
                Speak at the speed of thought
              </p>
              <h2 className="mx-auto max-w-2xl font-display text-4xl font-light leading-tight sm:text-5xl">
                Your voice is faster than your hands.
              </h2>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              <SpeedBar label="Typing" wpm={40} fraction={0.27} muted />
              <SpeedBar label="Speaking with Aria" wpm={150} fraction={1} />
            </div>
            <p className="mt-6 text-center text-xs text-ink/40">
              Average sustained speaking pace vs. typing pace, words per minute.
            </p>
          </div>
        </section>

        {/* ───────────────── Use cases ───────────────── */}
        <section id="use-cases" className="mx-auto w-full max-w-6xl px-6 py-28">
          <Reveal className="mb-12 max-w-2xl">
            <p className="tracking-luxe mb-4 text-xs uppercase text-green">
              Made for the way you work
            </p>
            <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
              However you think, Aria keeps up.
            </h2>
          </Reveal>
          <UseCases />
        </section>

        {/* ───────────────── How it works ───────────────── */}
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
                    <h3 className="mt-6 text-xl font-medium text-beige">{s.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-beige/60">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────── Philosophy quote ───────────────── */}
        <section className="border-y border-ink/10 bg-beige-deep/70">
          <div className="mx-auto max-w-4xl px-6 py-28 text-center">
            <Reveal>
              <p className="font-display text-3xl font-light italic leading-snug sm:text-[2.6rem]">
                The most natural interface was never a screen.
                <br />
                <span className="text-green">It was always the voice.</span>
              </p>
            </Reveal>
          </div>
        </section>

        {/* ───────────────── FAQ ───────────────── */}
        <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-28">
          <Reveal className="mb-12 text-center">
            <p className="tracking-luxe mb-4 text-xs uppercase text-green">
              Questions
            </p>
            <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
              Everything you might ask.
            </h2>
          </Reveal>
          <FAQ />
        </section>

        {/* ───────────────── CTA ───────────────── */}
        <section id="access" className="relative overflow-hidden bg-green px-6 py-36 text-beige">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[560px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--green-pale) 0%, transparent 65%)" }}
          />
          <Reveal className="relative mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-light leading-tight text-beige sm:text-6xl">
              Be among the first to{" "}
              <em className="italic text-green-pale">speak</em>.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-lg text-beige/70">
              Aria is in private development. Leave your email and we&apos;ll
              reach out when your voice can join the conversation.
            </p>

            <form
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-full border border-beige/25 bg-beige/95 px-6 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-beige"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-full bg-beige px-7 py-3.5 text-sm font-medium text-green-deep transition-all hover:-translate-y-0.5 hover:bg-green-pale"
              >
                Request access
              </button>
            </form>
            <p className="mt-4 text-xs text-beige/50">
              No spam. Just a note when Aria is ready to listen.
            </p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

/* ───────────────────────── Bits ───────────────────────── */

function SpeedBar({
  label,
  wpm,
  fraction,
  muted,
}: {
  label: string;
  wpm: number;
  fraction: number;
  muted?: boolean;
}) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-ink/10 bg-beige p-8">
        <div className="mb-5 flex items-baseline justify-between">
          <span className="text-sm text-ink-soft">{label}</span>
          <span className="font-display text-4xl font-light">
            {wpm}
            <span className="ml-1 text-base text-ink/40">wpm</span>
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-green-tint/60">
          <motion.div
            className="h-full rounded-full"
            style={{ background: muted ? "var(--ink)" : "var(--green)", opacity: muted ? 0.35 : 1 }}
            initial={{ width: 0 }}
            whileInView={{ width: `${fraction * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
          />
        </div>
      </div>
    </Reveal>
  );
}

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
