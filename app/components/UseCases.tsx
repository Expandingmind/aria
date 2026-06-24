"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const TABS = [
  {
    id: "founders",
    label: "Founders",
    headline: "Think out loud, decide faster.",
    body: "Pace the room and talk through the hard calls. Aria keeps the thread of every decision, every investor, every open loop, so nothing slips between the cracks.",
    points: ["Recall any past decision", "Briefs before every call", "Never re-explain context"],
  },
  {
    id: "writers",
    label: "Writers",
    headline: "Speak the first draft.",
    body: "Ideas arrive faster than fingers move. Say it messy and let Aria hold the shape of your story, your characters, and the notes you left yourself last week.",
    points: ["Capture ideas the instant they land", "Remembers your voice & style", "Pick up exactly where you left off"],
  },
  {
    id: "professionals",
    label: "Busy professionals",
    headline: "A second mind for your day.",
    body: "Between meetings, in the car, on a walk, just talk. Aria knows your people and your priorities, and answers in a calm voice you can listen to anywhere.",
    points: ["Hands-free, eyes-free", "Knows who's who", "Always has the context"],
  },
  {
    id: "teams",
    label: "Teams",
    headline: "Shared memory, fewer meetings.",
    body: "Give your team an agent that remembers the same things you do. Context that used to live in one person's head now belongs to everyone.",
    points: ["One source of truth", "Onboard in conversation", "Continuity across the team"],
  },
];

export function UseCases() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];

  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            className={`rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
              i === active
                ? "border-green bg-green text-beige"
                : "border-ink/15 text-ink-soft hover:border-green/50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-beige">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid gap-10 p-9 md:grid-cols-2 md:p-14"
          >
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-3xl font-light leading-tight sm:text-4xl">
                {tab.headline}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                {tab.body}
              </p>
            </div>

            <ul className="flex flex-col justify-center gap-4">
              {tab.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-4 rounded-2xl bg-green-tint/60 px-5 py-4"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-green text-beige">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </span>
                  <span className="text-[15px] text-ink">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
