"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      {/* scroll progress hairline */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-green"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ink/10 bg-beige/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-ink">
              <span className="h-2 w-2 rounded-full bg-green-bright" />
            </span>
            <span className="font-display text-2xl font-medium tracking-tight">
              Aria
            </span>
          </Link>

          <nav className="hidden items-center gap-9 text-sm text-ink-soft lg:flex">
            <Link href="/#features" className="link-underline">
              Features
            </Link>
            <Link href="/#use-cases" className="link-underline">
              For you
            </Link>
            <Link href="/#how" className="link-underline">
              How it works
            </Link>
            <Link href="/#faq" className="link-underline">
              FAQ
            </Link>
          </nav>

          <Link
            href="/#access"
            className="group relative overflow-hidden rounded-full bg-ink px-5 py-2 text-sm text-beige transition-transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">Request access</span>
            <span className="absolute inset-0 -translate-x-full bg-green transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
        </div>
      </header>
    </>
  );
}
