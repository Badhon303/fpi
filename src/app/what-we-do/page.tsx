import type { Metadata } from "next";
import {
  MessagesSquare,
  BookOpen,
  Globe2,
  Puzzle,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import EyebrowLabel from "@/components/EyebrowLabel";
import StampBadge from "@/components/StampBadge";
import { LinkButton } from "@/components/Button";
import { functionalAreas, researchPriorities } from "@/content/site";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "FPI Bangladesh works across six functional areas addressing specific gaps in Bangladesh's policy and economic landscape.",
};

const areaIcons = [
  MessagesSquare,
  BookOpen,
  Globe2,
  Puzzle,
  GraduationCap,
  HeartHandshake,
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Six functional areas, one disciplined method."
        intro="Each functional area is designed to address a specific gap in Bangladesh's policy and economic landscape — through structured, evidence-based work."
      />

      {/* Detailed functional areas */}
      <Section tone="parchment">
        <div className="space-y-4">
          {functionalAreas.map((area, i) => {
            const Icon = areaIcons[i];
            return (
              <Reveal key={area.title}>
                <article className="group grid gap-6 rounded-lg border border-line bg-parchment p-8 transition-colors duration-300 hover:border-brass md:grid-cols-[auto_1fr] md:gap-10 md:p-10">
                  <div className="flex items-start gap-5">
                    <span className="font-mono text-sm text-brass">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-forest transition-colors duration-300 group-hover:border-brass group-hover:text-brass">
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-medium leading-tight text-ink">
                      {area.title}
                    </h2>
                    <p className="mt-3 max-w-2xl text-body text-ink-soft">{area.body}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Initial research priorities */}
      <Section tone="ink">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <EyebrowLabel tone="brass">Initial Research Priorities</EyebrowLabel>
            <h2 className="mt-4 font-display text-h2 font-normal text-parchment">
              Launching in 2026.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-parchment/75">
              {researchPriorities.note}
            </p>
            <StampBadge tone="parchment" className="mt-6">
              Being finalized by the Governing Board
            </StampBadge>
          </div>
          <Reveal stagger className="grid content-start gap-4">
            {researchPriorities.items.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-5 rounded-lg border border-line-dark bg-[#13233b] p-6"
              >
                <span className="font-mono text-sm text-brass">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-xl text-parchment">{item}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="parchment">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-line bg-parchment-soft p-8 md:flex-row md:items-center md:p-10">
          <h2 className="font-display text-2xl font-medium text-ink">
            See our priority focus on international trade and policy.
          </h2>
          <LinkButton href="/trade-policy" variant="primary" className="shrink-0">
            Trade &amp; Policy
            <ArrowRight size={18} />
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
