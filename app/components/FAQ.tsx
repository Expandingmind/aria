"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const ITEMS = [
  {
    q: "What is Aria?",
    a: "Aria is a voice-first AI agent. You speak naturally and hear it think back in a calm, natural voice. Unlike a normal chatbot, Aria carries real memory and an understanding of the people in your world, so every conversation builds on the last.",
  },
  {
    q: "How does the voice work?",
    a: "You talk, Aria transcribes you in real time, reasons over what you said with the full context of your memory and contacts, and replies out loud. It's a real back-and-forth conversation rather than a wall of text.",
  },
  {
    q: "What does Aria remember?",
    a: "Your projects, your preferences, the threads of past conversations, and the people you introduce it to. You stay in control of what's stored, and you can review or remove memories at any time.",
  },
  {
    q: "Is my data private?",
    a: "Privacy is foundational. Your conversations and memory belong to you. We never sell your data, and you can export or delete it whenever you like. See our Privacy Policy for the full detail.",
  },
  {
    q: "When can I use it?",
    a: "Aria is in private development. Request access with your email and we'll reach out when your voice can join the conversation.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-ink/10 border-y border-ink/10">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display text-xl font-medium sm:text-2xl">
                {item.q}
              </span>
              <span
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-green bg-green text-beige"
                    : "border-ink/20 text-ink"
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-[15px] leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
