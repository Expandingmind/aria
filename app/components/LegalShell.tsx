import Link from "next/link";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="relative z-[2]">
        <header className="relative overflow-hidden border-b border-ink/10 px-6 pb-16 pt-40">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--green-tint) 0%, transparent 65%)" }}
          />
          <div className="mx-auto max-w-3xl">
            <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-green">
              ← Back to Aria
            </Link>
            <h1 className="mt-6 font-display text-5xl font-light sm:text-6xl">{title}</h1>
            <p className="mt-4 text-sm text-ink/50">Last updated {updated}</p>
          </div>
        </header>

        <article className="legal mx-auto max-w-3xl px-6 py-16">{children}</article>
      </main>
      <SiteFooter />
    </>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 font-display text-2xl font-medium text-ink">{heading}</h2>
      <div className="space-y-4 text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}
