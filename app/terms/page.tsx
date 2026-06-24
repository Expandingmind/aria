import type { Metadata } from "next";
import { LegalShell, Section } from "../components/LegalShell";

export const metadata: Metadata = {
  title: "Terms of Service — Aria",
  description: "The terms that govern your use of Aria.",
};

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="June 24, 2026">
      <p className="mb-10 text-[15px] leading-relaxed text-ink-soft">
        Welcome to Aria. These Terms of Service (&ldquo;Terms&rdquo;) govern your
        access to and use of the Aria website, applications, and services
        (collectively, the &ldquo;Service&rdquo;). By accessing or using the
        Service, you agree to be bound by these Terms. If you do not agree, please
        do not use the Service.
      </p>

      <Section heading="1. Who we are">
        <p>
          The Service is operated by Aria (&ldquo;Aria,&rdquo; &ldquo;we,&rdquo;
          &ldquo;us,&rdquo; or &ldquo;our&rdquo;). Aria is a voice-first AI agent
          that lets you speak naturally and receive spoken responses, with
          features including memory and contacts.
        </p>
      </Section>

      <Section heading="2. Eligibility">
        <p>
          You must be at least 13 years old (or the minimum age of digital
          consent in your jurisdiction) to use the Service. By using the Service,
          you represent that you meet this requirement and that the information
          you provide is accurate and complete.
        </p>
      </Section>

      <Section heading="3. Early access">
        <p>
          Aria is currently in private development. Access may be limited,
          invite-only, and provided on a pre-release basis. Features may change,
          break, or be removed without notice while the Service is in this phase.
        </p>
      </Section>

      <Section heading="4. Your account">
        <p>
          You are responsible for safeguarding any credentials associated with
          your access and for all activity that occurs under your account. Notify
          us promptly of any unauthorized use.
        </p>
      </Section>

      <Section heading="5. Acceptable use">
        <p>You agree not to use the Service to:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>Break the law or infringe the rights of others;</li>
          <li>Upload malicious code or attempt to disrupt the Service;</li>
          <li>Reverse engineer or misuse the Service or its underlying models;</li>
          <li>Generate content that is harmful, deceptive, or abusive.</li>
        </ul>
      </Section>

      <Section heading="6. Your content">
        <p>
          You retain ownership of the content you provide to Aria, including your
          voice recordings, transcripts, memory, and contacts. You grant us a
          limited license to process this content solely to operate and improve
          the Service for you, as described in our Privacy Policy.
        </p>
      </Section>

      <Section heading="7. AI-generated output">
        <p>
          Aria produces responses using artificial intelligence. Output may be
          inaccurate or incomplete and should not be relied upon as professional,
          legal, medical, or financial advice. You are responsible for how you use
          any output.
        </p>
      </Section>

      <Section heading="8. Third-party services">
        <p>
          The Service relies on third-party providers for capabilities such as
          language reasoning, speech recognition, and speech synthesis. Your use
          of the Service may also be subject to those providers&rsquo; terms.
        </p>
      </Section>

      <Section heading="9. Intellectual property">
        <p>
          The Service, including its design, branding, and software, is owned by
          Aria and protected by intellectual property laws. These Terms do not
          grant you any rights to our trademarks or branding.
        </p>
      </Section>

      <Section heading="10. Disclaimers">
        <p>
          The Service is provided &ldquo;as is&rdquo; and &ldquo;as
          available,&rdquo; without warranties of any kind, whether express or
          implied, to the fullest extent permitted by law.
        </p>
      </Section>

      <Section heading="11. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Aria will not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of data, arising from your use of the Service.
        </p>
      </Section>

      <Section heading="12. Changes to these Terms">
        <p>
          We may update these Terms from time to time. If we make material
          changes, we will take reasonable steps to notify you. Your continued use
          of the Service after changes take effect constitutes acceptance.
        </p>
      </Section>

      <Section heading="13. Contact">
        <p>
          Questions about these Terms? Reach us at{" "}
          <a className="text-green underline" href="mailto:hello@aria.app">
            hello@aria.app
          </a>
          .
        </p>
      </Section>
    </LegalShell>
  );
}
