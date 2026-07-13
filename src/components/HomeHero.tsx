"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import ConveningDiagram from "@/components/ConveningDiagram";
import EyebrowLabel from "@/components/EyebrowLabel";
import StampBadge from "@/components/StampBadge";
import { LinkButton } from "@/components/Button";

export default function HomeHero() {
  const reduced = useReducedMotion();

  // Text reveals after the convening diagram has largely converged (~1.8s).
  const base = reduced ? 0 : 1.8;
  const fade = (delay: number) =>
    reduced
      ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden bg-ink text-parchment">
      {/* faint grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#F6F3EC 1px, transparent 1px), linear-gradient(90deg, #F6F3EC 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="container-dossier relative grid min-h-[92vh] items-center gap-8 pb-16 pt-32 lg:grid-cols-2 lg:gap-12 lg:pt-24">
        {/* Text column */}
        <div className="order-2 lg:order-1">
          <motion.div {...fade(base)}>
            <EyebrowLabel tone="brass">A National Policy Platform</EyebrowLabel>
          </motion.div>

          <motion.h1
            {...fade(base + 0.12)}
            className="mt-6 font-display text-hero font-semibold text-parchment"
          >
            Evidence-based dialogue for{" "}
            <span className="italic text-brass">inclusive economic progress.</span>
          </motion.h1>

          <motion.p
            {...fade(base + 0.24)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-parchment/75"
          >
            Forum for Policy Insight (FPI) Bangladesh is a national, independent, and
            non-partisan platform connecting research, policymakers, business, and
            stakeholders for rigorous, evidence-based policy dialogue.
          </motion.p>

          <motion.div
            {...fade(base + 0.36)}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <LinkButton href="/contact" variant="primary" tone="dark">
              Get in Touch
              <ArrowRight size={18} />
            </LinkButton>
            <LinkButton href="/about" variant="secondary" tone="dark">
              About FPI
            </LinkButton>
          </motion.div>

          <motion.div {...fade(base + 0.48)} className="mt-10 flex flex-wrap gap-2">
            <StampBadge tone="parchment">Non-Partisan</StampBadge>
            <StampBadge tone="parchment">Evidence-Based</StampBadge>
            <StampBadge tone="parchment">Est. 2026</StampBadge>
          </motion.div>
        </div>

        {/* Diagram column */}
        <div className="order-1 flex items-center justify-center lg:order-2">
          <ConveningDiagram
            variant="hero"
            className="h-auto w-full max-w-[560px]"
          />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#who-we-are"
        aria-label="Scroll to content"
        {...fade(base + 0.7)}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-parchment/50 transition-colors hover:text-brass"
      >
        <motion.span
          animate={reduced ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown size={26} />
        </motion.span>
      </motion.a>
    </section>
  );
}
