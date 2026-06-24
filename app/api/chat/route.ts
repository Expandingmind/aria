import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

// Aria's persona — a voice-first agent that gives Claude a voice.
// Tuned for founders: concise, clear, straight to the point.
const SYSTEM = `You are Aria, a voice-first AI assistant that gives Claude a voice.
You are speaking out loud to a busy founder, so every reply is read aloud by a text-to-speech voice.

Rules:
- Be concise, clear, and straight to the point. No preamble, no "Here is" or "Sure".
- Lead with the answer. Add at most one or two short supporting sentences.
- Write the way people speak. Short sentences, natural rhythm, no markdown, no bullet lists, no emoji, no code blocks.
- Never use em dashes. Use periods or commas instead.
- Spell things out for the ear: say "three" not "3." when it reads more naturally; avoid symbols and URLs.
- If you need something to proceed, ask one short question rather than guessing at length.
- You have memory of this conversation. Use it. Don't re-introduce yourself after the first turn.`;

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Server is missing ANTHROPIC_API_KEY." },
      { status: 500 },
    );
  }

  let messages: ClientMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (messages.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      // Low effort + no thinking keeps spoken replies fast and concise.
      output_config: { effort: "low" },
      system: SYSTEM,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const reply = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    return Response.json({ reply });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      return Response.json(
        { error: `Claude API error: ${err.message}` },
        { status: err.status ?? 500 },
      );
    }
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
