import {
  MessagesSquare,
  BookOpen,
  Globe2,
  Puzzle,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import HomeHero from "@/components/HomeHero";
import { Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import PullQuote from "@/components/PullQuote";
import EyebrowLabel from "@/components/EyebrowLabel";
import StampBadge from "@/components/StampBadge";
import SectionDivider from "@/components/SectionDivider";
import { LinkButton } from "@/components/Button";
import { PrincipleCard, FunctionAreaCard, MembershipCard } from "@/components/Cards";
import {
  whoWeAre,
  missionVision,
  corePrinciples,
  functionalAreas,
  tradePolicy,
  membership,
  whatSetsApart,
} from "@/content/site";

const areaIcons = [
  MessagesSquare,
  BookOpen,
  Globe2,
  Puzzle,
  GraduationCap,
  HeartHandshake,
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Who We Are */}
      <Section id="who-we-are" tone="parchment">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <EyebrowLabel>{whoWeAre.eyebrow}</EyebrowLabel>
            <h2 className="mt-4 font-display text-h2 font-normal text-ink">
              A knowledge platform, not an advocacy body.
            </h2>
          </div>
          <Reveal className="space-y-5 text-body text-ink-soft">
            <p>{whoWeAre.paragraphs[0]}</p>
            <p>{whoWeAre.paragraphs[1]}</p>
            <PullQuote>{whoWeAre.pullQuote}</PullQuote>
          </Reveal>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section tone="parchment-soft">
        <SectionHeading
          eyebrow="Mission & Vision"
          title="What we are working toward."
        />
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
          intro="They distinguish FPI Bangladesh from advocacy bodies and lobbying groups."
        />
        <Reveal
          stagger
          as="ul"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
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

      {/* What We Do */}
      <Section tone="parchment">
        <SectionHeading
          eyebrow="What We Do"
          title="Six functional areas."
          intro="Each is designed to address a specific gap in Bangladesh's policy and economic landscape."
        />
        <Reveal
          stagger
          as="ul"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {functionalAreas.map((a, i) => (
            <li key={a.title}>
              <FunctionAreaCard icon={areaIcons[i]} title={a.title} body={a.body} />
            </li>
          ))}
        </Reveal>
        <div className="mt-10">
          <LinkButton href="/what-we-do" variant="ghost">
            Explore what we do
            <ArrowRight size={18} />
          </LinkButton>
        </div>
      </Section>

      {/* Trade & Policy spotlight */}
      <Section tone="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <EyebrowLabel tone="brass">Priority Focus</EyebrowLabel>
            <h2 className="mt-4 font-display text-h2 font-normal text-parchment">
              International Trade &amp; Policy
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-parchment/75">
              {tradePolicy.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <StampBadge tone="parchment">LDC Graduation · Nov 2026</StampBadge>
              <StampBadge tone="parchment">Bangladesh–US ART</StampBadge>
            </div>
          </div>

          {/* Forum highlight card */}
          <Reveal>
            <div className="rounded-lg border border-line-dark bg-[#13233b] p-8 md:p-10">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-brass">
                  Highlighted Event · 2026
                </span>
                <ArrowUpRight className="text-brass" size={20} />
              </div>
              <h3 className="mt-5 font-display text-2xl font-medium leading-tight text-parchment">
                {tradePolicy.forum.title}
              </h3>
              <p className="mt-2 text-sm text-parchment/60">
                Co-organized with {tradePolicy.forum.partner}
              </p>
              <ul className="mt-6 space-y-3">
                {tradePolicy.forum.topics.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-parchment/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" />
                    <span className="text-[0.9375rem]">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <LinkButton href="/trade-policy" variant="secondary" tone="dark">
                  Read the trade &amp; policy focus
                  <ArrowRight size={18} />
                </LinkButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Membership teaser */}
      <Section tone="parchment">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Membership"
            title="Five categories, one platform."
            intro="Membership reflects the full breadth of Bangladesh's economic stakeholders."
          />
          <LinkButton href="/membership" variant="ghost" className="shrink-0">
            View all categories
            <ArrowRight size={18} />
          </LinkButton>
        </div>
        <Reveal
          stagger
          as="ul"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {membership.categories.map((c, i) => (
            <li key={c.title}>
              <MembershipCard index={i + 1} title={c.title} body={c.body} />
            </li>
          ))}
        </Reveal>
      </Section>

      {/* What Sets FPI Apart */}
      <Section tone="parchment-soft">
        <SectionHeading
          eyebrow="What Sets FPI Apart"
          title="Built to think clearly and convene broadly."
          intro={whatSetsApart.intro}
        />
        <Reveal className="mt-10">
          <PullQuote>{whatSetsApart.pullQuote}</PullQuote>
        </Reveal>
        <Reveal stagger as="ul" className="mt-12 grid gap-6 md:grid-cols-3">
          {whatSetsApart.characteristics.map((c, i) => (
            <li key={c.title}>
              <div className="h-full rounded-lg border border-line bg-parchment p-7">
                <span className="font-mono text-xs tracking-eyebrow text-rust">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium text-ink">
                  {c.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {c.body}
                </p>
              </div>
            </li>
          ))}
        </Reveal>
      </Section>

      {/* Closing CTA */}
      <Section tone="ink">
        <div className="mx-auto max-w-3xl text-center">
          <EyebrowLabel tone="brass" className="justify-center">
            Contact &amp; Engagement
          </EyebrowLabel>
          <h2 className="mt-5 font-display text-h2 font-normal text-parchment">
            Convene with us.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-parchment/70">
            FPI Bangladesh welcomes inquiries from institutions, businesses, researchers,
            development partners, and individuals committed to informed policy dialogue.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <LinkButton href="/contact" variant="primary" tone="dark">
              Contact the Secretariat
              <ArrowRight size={18} />
            </LinkButton>
            <LinkButton href="/membership" variant="secondary" tone="dark">
              Apply for Membership
            </LinkButton>
          </div>
          <p className="mt-8 text-xs text-parchment/40">
            The Governing Board and Secretariat are currently being constituted.
          </p>
        </div>
      </Section>
    </>
  );
}
