import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Section, SectionHeading } from "@/components/Section";
import Reveal from "@/components/Reveal";
import EyebrowLabel from "@/components/EyebrowLabel";
import { quarterlyBulletin } from "@/content/site";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "FPI Bangladesh's quarterly bulletin covering policy, economy, finance and sustainability.",
};

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Publications · Volume 1 · Issue 1"
        title={quarterlyBulletin.title}
        intro={quarterlyBulletin.edition}
      />

      <Section tone="parchment">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <div>
            <EyebrowLabel>Editorial</EyebrowLabel>
            <h2 className="mt-5 font-display text-h2 font-normal text-ink">
              {quarterlyBulletin.editorial.title}
            </h2>
            <p className="mt-5 font-mono text-xs uppercase tracking-eyebrow text-rust">
              {quarterlyBulletin.editorial.author} · Editor
            </p>
          </div>
          <Reveal className="space-y-5 text-body leading-relaxed text-ink-soft">
            {quarterlyBulletin.editorial.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>
      </Section>

      <Section tone="parchment-soft">
        <SectionHeading
          eyebrow="Recent News · July–September 2026"
          title="Sustainability in focus."
          intro="Selected developments shaping the policy, economic and financial landscape."
        />
        <Reveal stagger as="ol" className="mt-12 grid gap-5 md:grid-cols-2">
          {quarterlyBulletin.news.map((item, index) => (
            <li key={item.title} className="rounded-lg border border-line bg-parchment p-7">
              <div className="flex items-start justify-between gap-5">
                <span className="font-mono text-sm text-brass">{String(index + 1).padStart(2, "0")}</span>
                <span className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-rust">
                  {item.date}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium text-ink">{item.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{item.body}</p>
              <p className="mt-5 font-mono text-[0.65rem] uppercase tracking-eyebrow text-ink/50">
                Source · {item.source}
              </p>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Features"
          title="Analysis for a changing Bangladesh."
          tone="dark"
          intro="Three feature articles examine energy security, technology and financial inclusion."
        />
        <div className="mt-14 space-y-16">
          {quarterlyBulletin.features.map((feature, index) => (
            <Reveal key={feature.title} className="border-t border-line-dark pt-8">
              <div className="grid gap-8 lg:grid-cols-[0.7fr_1.5fr] lg:gap-16">
                <div>
                  <EyebrowLabel tone="brass">{feature.label}</EyebrowLabel>
                  <h3 className="mt-5 font-display text-3xl font-normal leading-tight text-parchment">
                    {feature.title}
                  </h3>
                  {feature.subtitle ? (
                    <p className="mt-4 text-lg leading-relaxed text-parchment/70">{feature.subtitle}</p>
                  ) : null}
                  <p className="mt-6 font-mono text-xs uppercase tracking-eyebrow text-parchment/50">
                    By {feature.author}
                  </p>
                </div>
                <article className="space-y-5 text-body leading-relaxed text-parchment/75">
                  {feature.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              </div>
              {index < quarterlyBulletin.features.length - 1 ? (
                <div className="mt-16 border-b border-line-dark" />
              ) : null}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="parchment">
        <SectionHeading
          eyebrow="Upcoming FPI National Consultation Forums"
          title="From insight to dialogue."
          intro="The bulletin closes with two upcoming forums for national discussion."
        />
        <Reveal stagger as="ol" className="mt-12 grid gap-6 md:grid-cols-2">
          {quarterlyBulletin.consultations.map((consultation) => (
            <li key={consultation.title} className="rounded-lg border border-line bg-parchment p-8">
              <span className="font-mono text-sm uppercase tracking-eyebrow text-brass">
                {consultation.date}
              </span>
              <h3 className="mt-6 font-display text-2xl font-medium leading-tight text-ink">
                {consultation.title}
              </h3>
              <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-eyebrow text-rust">
                {consultation.themes}
              </p>
              <p className="mt-5 text-[0.9375rem] leading-relaxed text-ink-soft">{consultation.body}</p>
              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink/60">
                {consultation.details}
              </p>
            </li>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
