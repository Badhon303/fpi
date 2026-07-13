import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Section";
import Reveal from "@/components/Reveal";
import EyebrowLabel from "@/components/EyebrowLabel";
import StampBadge from "@/components/StampBadge";
import { LinkButton } from "@/components/Button";
import { MembershipCard } from "@/components/Cards";
import { membership } from "@/content/site";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Five membership categories — National, Regional, Corporate & Industry, Associate, and Honorary — open to those committed to evidence-based dialogue.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Five categories, reflecting Bangladesh's full breadth of stakeholders."
        intro={membership.intro}
      />

      <Section tone="parchment">
        <Reveal stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {membership.categories.map((c, i) => (
            <li key={c.title}>
              <MembershipCard index={i + 1} title={c.title} body={c.body} />
            </li>
          ))}
        </Reveal>

        <Reveal className="mt-12 rounded-lg border border-line bg-parchment-soft p-8 md:p-10">
          <EyebrowLabel tone="brass">Charter &amp; Terms</EyebrowLabel>
          <p className="mt-4 max-w-3xl text-body text-ink-soft">
            {membership.charterNote}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <StampBadge>Charter-Governed</StampBadge>
            <StampBadge>Code of Conduct</StampBadge>
            <StampBadge>Confidentiality</StampBadge>
          </div>
        </Reveal>
      </Section>

      {/* CTA into pre-filled contact form */}
      <Section tone="ink">
        <div className="mx-auto max-w-3xl text-center">
          <EyebrowLabel tone="brass" className="justify-center">
            Join the Platform
          </EyebrowLabel>
          <h2 className="mt-5 font-display text-h2 font-normal text-parchment">
            Apply for membership.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-parchment/70">
            Submit a membership inquiry and a member of the FPI Bangladesh Secretariat will
            follow up regarding category, terms, and next steps.
          </p>
          <div className="mt-9 flex justify-center">
            <LinkButton href="/contact?inquiry=Membership" variant="primary" tone="dark">
              Apply for Membership
              <ArrowRight size={18} />
            </LinkButton>
          </div>
          <p className="mt-8 text-xs text-parchment/40">
            Membership terms, fees, and rights are governed by the Governing Board in
            accordance with the charter.
          </p>
        </div>
      </Section>
    </>
  );
}
