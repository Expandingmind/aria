import Link from "next/link";
import { AriaMark } from "./AriaMark";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how" },
      { label: "For you", href: "/#use-cases" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Request access", href: "/#access" },
      { label: "The vision", href: "/#philosophy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-beige-deep/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <AriaMark size={30} />
              <span className="font-display text-2xl font-medium">Aria</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              A voice-first AI agent with memory and contacts. Giving
              intelligence a voice.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="tracking-luxe mb-4 text-xs uppercase text-ink/40">
                {col.title}
              </h4>
              <ul className="space-y-3 text-sm text-ink-soft">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="link-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-8 text-sm text-ink/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Aria. All rights reserved.</p>
          <p className="font-display italic text-green">
            The most natural interface was always the voice.
          </p>
        </div>
      </div>
    </footer>
  );
}
