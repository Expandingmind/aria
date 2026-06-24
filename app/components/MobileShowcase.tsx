"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "./Reveal";
import { AriaMark } from "./AriaMark";

const EASE = [0.16, 1, 0.3, 1] as const;

// Looping demo of the Action Button flow: press → listen → think → speak.
const SEQ = [
  { phase: "idle", dur: 1700 },
  { phase: "press", dur: 850 },
  { phase: "listen", dur: 2300 },
  { phase: "think", dur: 900 },
  { phase: "speak", dur: 3400 },
] as const;

type Phase = (typeof SEQ)[number]["phase"];

export function MobileShowcase() {
  return (
    <section className="relative overflow-hidden bg-green text-beige">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--green-pale) 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-28 lg:grid-cols-2 lg:gap-8">
        {/* copy */}
        <Reveal>
          <p className="tracking-luxe mb-4 text-xs uppercase text-green-pale">
            In your pocket
          </p>
          <h2 className="font-display text-4xl font-light leading-tight text-beige sm:text-[3.2rem]">
            One tap on your iPhone.
            <br />
            <span className="italic text-green-pale">Claude speaks back.</span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-beige/65">
            Map Aria to your iPhone&rsquo;s Action Button. Press it anywhere. In
            the car, between meetings, walking out the door, and just talk. Aria
            taps into the context of your chat, so it already knows your business,
            and answers out loud: concise, clear, straight to the point.
          </p>

          <ul className="mt-9 space-y-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.t} delay={i * 0.1}>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-green-pale/40 text-sm text-green-pale">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-beige">{s.t}</p>
                    <p className="text-sm text-beige/55">{s.d}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Reveal>

        {/* phone */}
        <Reveal delay={0.15} className="flex justify-center">
          <Phone />
        </Reveal>
      </div>
    </section>
  );
}

function Phone() {
  const [step, setStep] = useState(0);
  const phase: Phase = SEQ[step].phase;

  useEffect(() => {
    const t = setTimeout(
      () => setStep((s) => (s + 1) % SEQ.length),
      SEQ[step].dur,
    );
    return () => clearTimeout(t);
  }, [step]);

  const armed = phase === "press" || phase === "listen";

  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative"
    >
      {/* Action Button callout */}
      <div className="absolute -left-4 top-[120px] z-20 flex items-center">
        <div className="-ml-28 hidden text-right sm:block">
          <p className="text-xs font-medium text-green-pale">Action Button</p>
          <p className="text-[11px] text-beige/50">Press to talk</p>
        </div>
        <span className="ml-2 hidden h-px w-8 bg-beige/30 sm:block" />
      </div>

      {/* physical action button */}
      <motion.span
        className="absolute -left-[3px] top-[118px] z-20 h-12 w-[5px] rounded-l-sm"
        style={{ background: armed ? "var(--green-bright)" : "#3a3a32" }}
        animate={armed ? { boxShadow: "0 0 18px 2px rgba(126,166,104,0.8)" } : { boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
        transition={{ duration: 0.3 }}
      />

      {/* phone body */}
      <div className="relative h-[600px] w-[290px] rounded-[3.2rem] border-[3px] border-[#2a2a24] bg-[#0b0b08] p-3 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)]">
        {/* screen */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.6rem] bg-beige">
          {/* press ripple */}
          <AnimatePresence>
            {phase === "press" && (
              <motion.span
                className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-green"
                initial={{ scale: 0.3, opacity: 0.8 }}
                animate={{ scale: 4, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* dynamic island */}
          <div className="relative z-10 flex justify-center pt-3">
            <div className="flex h-7 items-center gap-1.5 rounded-full bg-ink px-3">
              <AriaMark size={14} />
              <span className="text-[10px] text-beige/70">Aria</span>
            </div>
          </div>

          {/* chat */}
          <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-4 pt-5">
            {/* persistent context message */}
            <Bubble side="left">
              Revenue&rsquo;s up <b>12%</b> this week. The Acme and Lumen deals
              are stalled.
            </Bubble>

            <AnimatePresence mode="wait">
              {(phase === "listen" || phase === "press") && (
                <motion.div
                  key="user"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="self-end"
                >
                  <Bubble side="right">What needs my attention today?</Bubble>
                </motion.div>
              )}

              {phase === "think" && (
                <motion.div
                  key="think"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-1 self-start rounded-2xl rounded-bl-md bg-green-tint px-4 py-3"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-green"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </motion.div>
              )}

              {phase === "speak" && (
                <motion.div
                  key="speak"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="self-start"
                >
                  <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-green px-4 py-3 text-[13px] leading-snug text-beige">
                    <div className="mb-2 flex items-center gap-2 text-beige/80">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                        <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                      </svg>
                      <span className="flex items-center gap-[2px]">
                        {Array.from({ length: 14 }).map((_, i) => (
                          <motion.span
                            key={i}
                            className="w-[2px] rounded-full bg-beige/80"
                            animate={{ height: [3, 5 + (i % 4) * 3, 3] }}
                            transition={{ duration: 0.8 + (i % 3) * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                          />
                        ))}
                      </span>
                    </div>
                    Close Acme before Friday, then send the investor update.
                    Start there.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* bottom status pill */}
          <div className="px-4 pb-7 pt-3">
            <div className="flex h-12 items-center justify-center gap-3 rounded-full border border-ink/10 bg-beige-deep/50">
              {phase === "listen" ? (
                <>
                  <span className="flex items-center gap-[3px]">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <motion.span
                        key={i}
                        className="w-[2px] rounded-full bg-green"
                        animate={{ height: [4, 6 + (i % 5) * 4, 4] }}
                        transition={{ duration: 0.7 + (i % 4) * 0.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
                      />
                    ))}
                  </span>
                  <span className="text-xs text-green">Listening…</span>
                </>
              ) : phase === "speak" ? (
                <span className="text-xs text-green">Aria is speaking…</span>
              ) : phase === "think" ? (
                <span className="text-xs text-ink/40">Thinking…</span>
              ) : (
                <span className="text-xs text-ink/40">Press the Action Button to talk</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Bubble({
  side,
  children,
}: {
  side: "left" | "right";
  children: React.ReactNode;
}) {
  return (
    <div
      className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-[13px] leading-snug ${
        side === "left"
          ? "self-start rounded-bl-md bg-green-tint text-ink"
          : "rounded-br-md bg-ink text-beige"
      }`}
    >
      {children}
    </div>
  );
}

const STEPS = [
  { t: "Set it once", d: "Assign Aria to your Action Button in iPhone Settings." },
  { t: "Press anywhere", d: "A single press starts listening, no app to open." },
  { t: "It already knows", d: "Aria pulls in the context of your chat with Claude." },
  { t: "Hear it back", d: "A clear, concise answer, spoken out loud." },
];
