"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { AriaMark } from "./AriaMark";

const EASE = [0.16, 1, 0.3, 1] as const;

const AGENTS = [
  { name: "Aria", role: "Your business partner", active: true },
  { name: "Atlas", role: "Your research desk", active: false },
  { name: "Muse", role: "Your writing room", active: false },
];

export function NamedAgents() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-28">
      <Reveal className="mb-14 max-w-2xl">
        <p className="tracking-luxe mb-4 text-xs uppercase text-green">
          Your agents, by name
        </p>
        <h2 className="font-display text-4xl font-light leading-tight sm:text-5xl">
          Name it. Then just call its name.
        </h2>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Connect a specific chat, give it a name and a voice, and it becomes its
          own agent. Press the Action Button, say &ldquo;Hey Aria,&rdquo; and that
          exact conversation opens with everything it already knows. Make as many
          as you like. One for your business, one for your writing, one for
          research. Each keeps its own memory and its own world.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {AGENTS.map((a, i) => (
          <Reveal key={a.name} delay={i * 0.12}>
            <article
              className={`group flex h-full flex-col rounded-3xl border p-7 transition-all duration-500 ${
                a.active
                  ? "border-green/50 bg-green-tint/50 shadow-[0_24px_60px_-30px_rgba(31,61,43,0.4)]"
                  : "border-ink/10 bg-beige hover:-translate-y-1 hover:border-green/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="relative grid h-11 w-11 place-items-center">
                  <AriaMark size={40} />
                  {a.active && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-green"
                      animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium leading-none">
                    {a.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink/50">{a.role}</p>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-between">
                <span
                  className={`rounded-full px-4 py-1.5 text-sm ${
                    a.active
                      ? "bg-green text-beige"
                      : "bg-green-tint text-green"
                  }`}
                >
                  &ldquo;Hey {a.name}&rdquo;
                </span>

                {a.active ? (
                  <span className="flex items-center gap-[3px]" aria-hidden>
                    {Array.from({ length: 9 }).map((_, b) => (
                      <motion.span
                        key={b}
                        className="w-[2px] rounded-full bg-green"
                        animate={{ height: [4, 6 + (b % 4) * 4, 4] }}
                        transition={{
                          duration: 0.8 + (b % 3) * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: b * 0.05,
                        }}
                      />
                    ))}
                  </span>
                ) : (
                  <span className="text-xs text-ink/35">Tap to wake</span>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
