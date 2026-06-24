import type { Metadata } from "next";
import { LegalShell, Section } from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy — Aria",
  description: "How Aria collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="June 24, 2026">
      <p className="mb-10 text-[15px] leading-relaxed text-ink-soft">
        Your privacy is foundational to Aria. This Privacy Policy explains what
        information we collect, how we use it, and the choices you have. Aria is a
        voice-first AI agent, so we are especially mindful of voice and
        conversational data.
      </p>

      <Section heading="1. Information we collect">
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Account information</strong> — such as your email address when
            you request access.
          </li>
          <li>
            <strong>Voice &amp; conversation data</strong> — audio you choose to
            send, its transcripts, and Aria&rsquo;s responses.
          </li>
          <li>
            <strong>Memory &amp; contacts</strong> — the notes, preferences, and
            people you ask Aria to remember.
          </li>
          <li>
            <strong>Usage data</strong> — basic, privacy-respecting analytics about
            how the Service is used and performs.
          </li>
        </ul>
      </Section>

      <Section heading="2. How we use your information">
        <p>We use your information to:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Provide the Service and respond to you by voice;</li>
          <li>Maintain your memory and contacts so conversations stay continuous;</li>
          <li>Keep the Service secure, reliable, and improving;</li>
          <li>Communicate with you about access and updates.</li>
        </ul>
      </Section>

      <Section heading="3. What we will never do">
        <p>
          We will never sell your personal data. We do not use the private content
          of your conversations to advertise to you.
        </p>
      </Section>

      <Section heading="4. AI processing">
        <p>
          To understand your speech and generate responses, your content may be
          processed by trusted third-party AI providers (for language reasoning,
          speech-to-text, and text-to-speech). We work to ensure these providers
          handle your data responsibly and, where available, under zero-retention
          arrangements.
        </p>
      </Section>

      <Section heading="5. Data retention">
        <p>
          We keep your information for as long as your account is active or as
          needed to provide the Service. You can delete your memory, contacts, or
          account at any time, and we will remove the associated data within a
          reasonable period.
        </p>
      </Section>

      <Section heading="6. Your controls and rights">
        <p>
          You can review, export, or delete your data. Depending on where you
          live, you may have additional rights under laws such as the GDPR or CCPA,
          including the right to access, correct, or restrict processing of your
          personal information.
        </p>
      </Section>

      <Section heading="7. Security">
        <p>
          We use technical and organizational measures designed to protect your
          information. No system is perfectly secure, but we treat your voice and
          conversations with care.
        </p>
      </Section>

      <Section heading="8. Children's privacy">
        <p>
          The Service is not directed to children under 13, and we do not knowingly
          collect their personal information.
        </p>
      </Section>

      <Section heading="9. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. We will post the
          updated version here and revise the &ldquo;last updated&rdquo; date above.
        </p>
      </Section>

      <Section heading="10. Contact">
        <p>
          Questions about your privacy? Reach us at{" "}
          <a className="text-green underline" href="mailto:privacy@aria.app">
            privacy@aria.app
          </a>
          .
        </p>
      </Section>
    </LegalShell>
  );
}
