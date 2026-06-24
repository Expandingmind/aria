// A free, keyless "Aria" brain for the demo — no LLM, no cost.
// Concise, founder-flavored, voice-first replies. Swap to /api/chat (real Claude)
// by flipping DEMO_MODE in page.tsx once keys are in.

type Turn = { role: "user" | "assistant"; content: string };

type Rule = { match: RegExp; replies: string[] };

const RULES: Rule[] = [
  {
    match: /\b(hi|hey|hello|yo|good morning|good evening)\b/i,
    replies: [
      "Hey — I'm Aria. What's on your plate today?",
      "Hey. What do you need? Keep it quick and I'll keep up.",
    ],
  },
  {
    match: /\b(who are you|what are you|what can you (do|help))\b/i,
    replies: [
      "I'm Aria — I give Claude a voice. You talk, I answer out loud: concise, no fluff.",
    ],
  },
  {
    match: /\b(how are you|how's it going|what's up)\b/i,
    replies: ["Locked in. What do you need?"],
  },
  {
    match: /\b(focus|today|priorit|what should i|to[- ]?do|get done)\b/i,
    replies: [
      "Three things: close your top deal, ship the thing you keep postponing, and reply to the person you're avoiding. Want me to break down the first one?",
      "Pick the one move that actually changes the week — and do it before lunch. The rest can wait.",
    ],
  },
  {
    match: /\b(revenue|sales|mrr|arr|numbers|growth)\b/i,
    replies: [
      "Revenue's the scoreboard, not the game. What moved this week, and what stalled?",
      "Don't chase the number, chase what drives it. Which lever is closest to moving?",
    ],
  },
  {
    match: /\b(investor|raise|fundrais|vc|pitch|deck)\b/i,
    replies: [
      "Keep it to three lines: traction, the number, the ask. Want me to shape one you can send today?",
      "Investors back momentum. Lead with what's working, then the ask.",
    ],
  },
  {
    match: /\b(deal|close|client|customer|prospect)\b/i,
    replies: [
      "What's the one objection in the way? Handle that and the deal usually moves.",
      "Get them to the next concrete step today — a call, a doc, a yes. Don't let it cool.",
    ],
  },
  {
    match: /\b(remind|remember|note|don'?t forget)\b/i,
    replies: [
      "Got it — I'll keep that in mind. What's the deadline?",
      "Noted. Want me to surface it the next time it's relevant?",
    ],
  },
  {
    match: /\b(draft|write|email|message|reply|follow[- ]?up)\b/i,
    replies: [
      "Tell me who it's for and the one outcome you want, and I'll keep it tight.",
      "Give me the gist and I'll make it short, clear, and easy to say yes to.",
    ],
  },
  {
    match: /\b(meeting|call|calendar|sync|standup)\b/i,
    replies: [
      "Cut it in half or cut it entirely. What's the actual decision you need from it?",
      "If there's no decision to make, it's an email. What are you really trying to settle?",
    ],
  },
  {
    match: /\b(hire|hiring|team|recruit|cofounder)\b/i,
    replies: [
      "Hire for the bottleneck, not the wish list. What's slowing you down most right now?",
    ],
  },
  {
    match: /\b(stressed|overwhelm|tired|burn(ed)?[- ]?out|too much|busy)\b/i,
    replies: [
      "One thing at a time. What's the single most important thing right now? Start there.",
      "Breathe. Name the one fire that actually matters today — ignore the rest for an hour.",
    ],
  },
  {
    match: /\b(thank|thanks|appreciate|awesome|great|perfect)\b/i,
    replies: ["Anytime. Go ship something.", "On it. Talk whenever."],
  },
];

const FALLBACKS = [
  "Here's the short version: focus on the one move that matters most right now. Want me to help you pick it?",
  "Got it. What's the outcome you actually want here? Start from that and work back.",
  "Say more in one line — what's the real goal? Then I'll keep it sharp.",
  "Understood. The fastest path is usually the simplest one. What's stopping you?",
];

// Stable pick so the same input doesn't feel random within a session.
function pick(list: string[], seed: number): string {
  return list[seed % list.length];
}

export function demoReply(input: string, history: Turn[]): string {
  const text = input.trim();
  const seed = history.length + text.length;

  for (const rule of RULES) {
    if (rule.match.test(text)) {
      return pick(rule.replies, seed);
    }
  }
  return pick(FALLBACKS, seed);
}
