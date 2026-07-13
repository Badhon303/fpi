import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import PullQuote from "@/components/PullQuote";
import EyebrowLabel from "@/components/EyebrowLabel";
import StampBadge from "@/components/StampBadge";
import SectionDivider from "@/components/SectionDivider";
import { LinkButton } from "@/components/Button";
import { PrincipleCard } from "@/components/Cards";
import {
  org,
  whoWeAre,
  missionVision,
  corePrinciples,
  governance,
} from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who we are, our mission and vision, core principles, and governance structure — FPI Bangladesh, a foundation-based national policy platform.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="An independent, non-partisan platform for evidence-based policy."
        intro={org.descriptor}
      />

      {/* Who We Are — full */}
      <Section tone="parchment">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <EyebrowLabel>Overview</EyebrowLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              <StampBadge>Non-Partisan</StampBadge>
              <StampBadge>Foundation-Based</StampBadge>
              <StampBadge>Est. 2026</StampBadge>
            </div>
          </div>
          <Reveal className="space-y-5 text-body text-ink-soft">
            {whoWeAre.paragraphs.slice(0, 2).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <PullQuote>{whoWeAre.pullQuote}</PullQuote>
            {whoWeAre.paragraphs.slice(2).map((p, i) => (
              <p key={`b-${i}`}>{p}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section tone="parchment-soft">
        <SectionHeading eyebrow="Mission & Vision" title="Purpose and direction." />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal className="rounded-lg bg-forest p-8 text-parchment md:p-10">
            <EyebrowLabel tone="parchment">Mission</EyebrowLabel>
            <p className="mt-5 font-display text-2xl font-normal leading-snug md:text-[1.75rem]">
              {missionVision.mission}
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="rounded-lg border border-line bg-parchment p-8 md:p-10"
          >
            <EyebrowLabel tone="brass">Vision</EyebrowLabel>
            <p className="mt-5 font-display text-2xl font-normal leading-snug text-ink md:text-[1.75rem]">
              {missionVision.vision}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Core Principles */}
      <Section tone="parchment">
        <SectionHeading
          eyebrow="Core Principles"
          title="Six principles that define our character."
        />
        <Reveal stagger as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {corePrinciples.map((p, i) => (
            <li key={p.title}>
              <PrincipleCard index={i + 1} title={p.title} body={p.body} />
            </li>
          ))}
        </Reveal>
      </Section>

      <div className="container-dossier">
        <SectionDivider withMark />
      </div>

      {/* Governance */}
      <Section tone="parchment">
        <SectionHeading
          eyebrow="Governance"
          title="A foundation-based institution."
          intro={governance.intro}
        />

        {/* Vertical org structure */}
        <Reveal className="mx-auto mt-12 max-w-3xl">
          <ol className="relative space-y-4 border-l border-line pl-8">
            {governance.bodies.map((b, i) => (
              <li key={b.title} className="relative">
                <span className="absolute -left-[2.35rem] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-brass bg-parchment font-mono text-[0.65rem] text-brass">
                  {i + 1}
                </span>
                <div className="rounded-lg border border-line bg-parchment-soft p-6">
                  <h3 className="font-display text-xl font-medium text-ink">{b.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {b.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-3xl text-body text-ink-soft">
          <p>{governance.partnerships}</p>
        </Reveal>
      </Section>

      {/* Funding */}
      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <EyebrowLabel tone="brass">Financial Governance</EyebrowLabel>
            <h2 className="mt-4 font-display text-h2 font-normal text-parchment">
              {governance.funding.title}
            </h2>
          </div>
          <Reveal className="text-lg leading-relaxed text-parchment/75">
            <p>{governance.funding.body}</p>
            <p className="mt-6 text-xs text-parchment/40">
              The founding Governing Board and Secretariat are currently being constituted.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="parchment">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-line bg-parchment-soft p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">
              Interested in joining or partnering with FPI Bangladesh?
            </h2>
          </div>
          <LinkButton href="/contact" variant="primary" className="shrink-0">
            Contact the Secretariat
            <ArrowRight size={18} />
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
