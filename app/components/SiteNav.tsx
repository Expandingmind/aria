"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { AriaMark } from "./AriaMark";

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

      {/* floating island */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center gap-1 rounded-full border py-2 pl-5 pr-2 backdrop-blur-xl transition-all duration-500 ${
            scrolled
              ? "border-ink/10 bg-beige/85 shadow-[0_16px_50px_-18px_rgba(20,20,15,0.4)]"
              : "border-ink/10 bg-beige/55 shadow-[0_10px_34px_-22px_rgba(20,20,15,0.3)]"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 pr-3">
            <AriaMark size={26} />
            <span className="font-display text-xl font-medium tracking-tight">
              Aria
            </span>
          </Link>

          <nav className="hidden items-center gap-7 px-3 text-sm text-ink-soft lg:flex">
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
            <Link href="/talk" className="link-underline text-green">
              Try it
            </Link>
          </nav>

          <Link
            href="/#access"
            className="group relative ml-1 overflow-hidden rounded-full bg-ink px-5 py-2 text-sm text-beige transition-transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">Request access</span>
            <span className="absolute inset-0 -translate-x-full bg-green transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
        </motion.div>
      </div>
    </>
  );
}
