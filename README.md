# Aria

**Give Claude a voice.**

Aria is a voice-first AI agent — speak naturally and hear it think back — with
real memory and a sense of the people in your world. This repository contains
the marketing site (Phase 1). The live voice agent follows in Phase 2.

## Design

- **Palette:** very light beige `#faf3e6`, a single refined sage green accent,
  black as the tertiary ink.
- **Type:** Cormorant Garamond (display) + Inter (sans).
- **Feel:** premium, calm, luxury — with motion driven by Framer Motion.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- React 19 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Deployed on [Vercel](https://vercel.com)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Roadmap

- **Phase 1 — Landing site** _(this repo)_ ✅
- **Phase 2 — Live voice agent:** speech-in (browser / Deepgram), the Claude
  API as the brain with persistent memory + contacts, and natural speech-out
  (ElevenLabs or browser TTS).

---

© Aria. Giving intelligence a voice.
