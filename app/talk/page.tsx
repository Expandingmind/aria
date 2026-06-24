"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AriaMark } from "../components/AriaMark";

const EASE = [0.16, 1, 0.3, 1] as const;

type Turn = { role: "user" | "assistant"; content: string };
type Phase = "idle" | "listening" | "thinking" | "speaking" | "error";

// Minimal typing for the browser Web Speech API (vendor-prefixed in most browsers).
type SpeechResultEvent = {
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((e: SpeechResultEvent) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

export default function TalkPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [supported, setSupported] = useState(true);

  const recognitionRef = useRef<Recognition | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const turnsRef = useRef<Turn[]>([]);
  turnsRef.current = turns;

  useEffect(() => {
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) {
      setSupported(false);
      return;
    }
    const rec = new Ctor();
    rec.lang = "en-US";
    rec.continuous = false;
    rec.interimResults = false;
    recognitionRef.current = rec;
  }, []);

  const speak = useCallback(async (text: string) => {
    try {
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) {
        // Fall back to the browser's own voice if ElevenLabs isn't configured.
        const synth = window.speechSynthesis;
        if (synth) {
          const u = new SpeechSynthesisUtterance(text);
          setPhase("speaking");
          u.onend = () => setPhase("idle");
          synth.speak(u);
          return;
        }
        setPhase("idle");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      setPhase("speaking");
      audio.onended = () => {
        setPhase("idle");
        URL.revokeObjectURL(url);
      };
      await audio.play();
    } catch {
      setPhase("idle");
    }
  }, []);

  const send = useCallback(
    async (text: string) => {
      const next = [...turnsRef.current, { role: "user" as const, content: text }];
      setTurns(next);
      setPhase("thinking");
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data?.error || "Something went wrong.");
          setPhase("error");
          return;
        }
        const reply: string = data.reply || "";
        setTurns((t) => [...t, { role: "assistant", content: reply }]);
        await speak(reply);
      } catch {
        setErrorMsg("Could not reach the server.");
        setPhase("error");
      }
    },
    [speak],
  );

  const startListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;
    setErrorMsg("");
    setPhase("listening");
    rec.onresult = (e: SpeechResultEvent) => {
      const transcript = e.results[0][0].transcript;
      if (transcript) send(transcript);
      else setPhase("idle");
    };
    rec.onerror = () => setPhase("idle");
    rec.onend = () => setPhase((p) => (p === "listening" ? "idle" : p));
    try {
      rec.start();
    } catch {
      setPhase("idle");
    }
  }, [send]);

  const onOrbClick = () => {
    if (phase === "listening") {
      recognitionRef.current?.stop();
      setPhase("idle");
    } else if (phase === "idle" || phase === "error") {
      startListening();
    }
  };

  const status: Record<Phase, string> = {
    idle: "Tap to speak",
    listening: "Listening…",
    thinking: "Thinking…",
    speaking: "Aria is speaking…",
    error: "Tap to try again",
  };

  return (
    <main className="relative z-[2] flex min-h-screen flex-col bg-beige text-ink">
      {/* minimal header */}
      <header className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2.5">
          <AriaMark size={26} />
          <span className="font-display text-xl font-medium">Aria</span>
        </Link>
        <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-green">
          ← Back
        </Link>
      </header>

      {/* conversation */}
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6">
        <div className="flex-1 space-y-4 overflow-y-auto py-8">
          {turns.length === 0 && (
            <div className="mt-10 text-center">
              <p className="tracking-luxe mb-3 text-xs uppercase text-green">
                Live demo
              </p>
              <h1 className="font-display text-4xl font-light leading-tight sm:text-5xl">
                Talk to <em className="italic text-green">Aria</em>.
              </h1>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Tap the orb, speak, and hear Claude answer out loud — concise and
                straight to the point.
              </p>
            </div>
          )}

          <AnimatePresence initial={false}>
            {turns.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className={t.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3 text-[15px] leading-relaxed ${
                    t.role === "user"
                      ? "rounded-br-md bg-ink text-beige"
                      : "rounded-bl-md bg-green-tint text-ink"
                  }`}
                >
                  {t.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="flex flex-col items-center gap-5 py-10">
          {!supported ? (
            <p className="max-w-sm text-center text-sm text-ink-soft">
              Your browser doesn&apos;t support voice input. Try Chrome or Safari
              to talk to Aria.
            </p>
          ) : (
            <>
              <button
                onClick={onOrbClick}
                disabled={phase === "thinking" || phase === "speaking"}
                aria-label={status[phase]}
                className="relative grid h-24 w-24 place-items-center rounded-full transition-transform hover:scale-105 disabled:cursor-not-allowed"
              >
                {(phase === "listening" || phase === "speaking") && (
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-green"
                    animate={{ scale: [1, 1.35], opacity: [0.55, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
                <span className="grid h-24 w-24 place-items-center rounded-full bg-green shadow-[0_20px_50px_-20px_rgba(31,61,43,0.7)]">
                  {phase === "thinking" ? (
                    <span className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 rounded-full bg-beige"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </span>
                  ) : (
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--beige)" strokeWidth="1.6" strokeLinecap="round">
                      <rect x="9" y="3" width="6" height="11" rx="3" />
                      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                    </svg>
                  )}
                </span>
              </button>
              <p className="text-sm text-ink-soft">{status[phase]}</p>
              {phase === "error" && (
                <p className="max-w-sm text-center text-xs text-ink/50">{errorMsg}</p>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
