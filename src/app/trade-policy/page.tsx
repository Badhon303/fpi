import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import EyebrowLabel from "@/components/EyebrowLabel";
import StampBadge from "@/components/StampBadge";
import { LinkButton } from "@/components/Button";
import { tradePolicy } from "@/content/site";

export const metadata: Metadata = {
  title: "Trade & Policy",
  description:
    "International trade and policy as a priority focus for FPI Bangladesh — LDC graduation, the Bangladesh–US ART, and the 2026 Bangladesh–US Business Forum with AmCham.",
};

export default function TradePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Priority Focus"
        title="International Trade and Policy."
        intro="Bangladesh stands at a pivotal moment in its engagement with the global economy — one that demands rigorous, independent analysis."
      />

      {/* Context */}
      <Section tone="parchment">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <EyebrowLabel>The Moment</EyebrowLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              <StampBadge>LDC Graduation · Nov 2026</StampBadge>
              <StampBadge>Bangladesh–US ART</StampBadge>
              <StampBadge>Bilateral Partnerships</StampBadge>
            </div>
          </div>
          <Reveal className="space-y-5 text-body text-ink-soft">
            <p>{tradePolicy.intro}</p>
            <p className="font-display text-xl italic text-ink">{tradePolicy.positioning}</p>
          </Reveal>
        </div>
      </Section>

      {/* Work areas */}
      <Section tone="parchment-soft">
        <SectionHeading
          eyebrow="Scope of Work"
          title="Five lines of trade and investment work."
        />
        <Reveal stagger as="ol" className="mt-12 grid gap-4">
          {tradePolicy.workAreas.map((w, i) => (
            <li
              key={i}
              className="flex items-start gap-6 rounded-lg border border-line bg-parchment p-6 md:p-7"
            >
              <span className="font-mono text-sm text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-body text-ink-soft">{w}</p>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* Highlighted forum event */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="Highlighted Event · 2026"
          title="Bangladesh–US Business Forum 2026."
          tone="dark"
          intro={`Co-organized with the ${tradePolicy.forum.partner}.`}
        />
        <Reveal className="mt-12">
          <div className="overflow-hidden rounded-lg border border-line-dark bg-[#13233b]">
            <div className="flex items-center justify-between border-b border-line-dark px-8 py-5">
              <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-brass">
                <CalendarDays size={15} /> 2026 · Dhaka
              </span>
              <ArrowUpRight className="text-brass" size={20} />
            </div>
            <div className="grid gap-10 p-8 md:grid-cols-[1.2fr_1fr] md:p-10">
              <div>
                <p className="text-lg leading-relaxed text-parchment/80">
                  {tradePolicy.forum.body}
                </p>
              </div>
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-parchment/50">
                  Forum Themes
                </p>
                <ul className="mt-5 space-y-3">
                  {tradePolicy.forum.topics.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-parchment/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                      <span className="text-[0.9375rem]">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Publications note */}
      <Section tone="parchment">
        <Reveal className="mx-auto max-w-2xl text-center">
          <EyebrowLabel tone="brass" className="justify-center">
            Forthcoming
          </EyebrowLabel>
          <p className="mt-5 font-display text-2xl font-normal leading-snug text-ink md:text-[1.75rem]">
            {tradePolicy.publications}
          </p>
        </Reveal>
        <div className="mt-10 flex justify-center">
          <LinkButton href="/contact" variant="primary">
            Propose a Partnership
            <ArrowRight size={18} />
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
