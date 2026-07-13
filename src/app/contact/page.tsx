import type { Metadata } from "next";
import { Mail, Users, Handshake, FlaskConical, CalendarCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/Section";
import EyebrowLabel from "@/components/EyebrowLabel";
import ContactForm from "@/components/ContactForm";
import { contact } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the FPI Bangladesh Secretariat — membership applications, partnership proposals, research collaboration, and event participation inquiries.",
};

const inquiryValues = [
  "Membership",
  "Partnership",
  "Research collaboration",
  "Event participation",
  "Other",
] as const;

type Inquiry = (typeof inquiryValues)[number];

const routes = [
  { icon: Users, label: "Membership applications" },
  { icon: Handshake, label: "Partnership proposals" },
  { icon: FlaskConical, label: "Research collaboration requests" },
  { icon: CalendarCheck, label: "Event participation inquiries" },
];

export default function ContactPage({
  searchParams,
}: {
  searchParams?: { inquiry?: string };
}) {
  const raw = searchParams?.inquiry;
  const defaultInquiry = inquiryValues.includes(raw as Inquiry)
    ? (raw as Inquiry)
    : undefined;

  return (
    <>
      <PageHero
        eyebrow="Contact & Engagement"
        title="Convene with the Secretariat."
        intro={contact.intro}
      />

      <Section tone="parchment">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: routing info */}
          <div>
            <EyebrowLabel>Direct Your Inquiry</EyebrowLabel>
            <p className="mt-5 text-body text-ink-soft">{contact.routing}</p>

            <ul className="mt-8 space-y-4">
              {routes.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-forest">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="text-[0.9375rem] text-ink">{label}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-lg border border-line bg-parchment-soft p-6">
              <span className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink-soft">
                <Mail size={14} /> FPI Bangladesh Secretariat
              </span>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Dhaka, Bangladesh. The Governing Board and Secretariat are currently being
                constituted; inquiries submitted here are received and routed accordingly.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-lg border border-line bg-parchment-soft p-8 md:p-10">
            <ContactForm defaultInquiry={defaultInquiry} />
          </div>
        </div>
      </Section>
    </>
  );
}
