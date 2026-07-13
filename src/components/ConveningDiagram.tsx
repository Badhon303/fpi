"use client";

import { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { conveningNodes } from "@/content/site";

type Variant = "hero" | "divider" | "footer-mark";

/* ---- Geometry for the hero diagram (viewBox 0 0 760 560) ---- */
const CENTER = { x: 380, y: 280 };

const HERO_NODES = [
  { ...conveningNodes[0], fx: 380, fy: 120, sx: 380, sy: -60, lx: 380, ly: 84, anchor: "middle" as const },
  { ...conveningNodes[1], fx: 600, fy: 280, sx: 860, sy: 280, lx: 600, ly: 244, anchor: "middle" as const },
  { ...conveningNodes[2], fx: 380, fy: 440, sx: 380, sy: 620, lx: 380, ly: 484, anchor: "middle" as const },
  { ...conveningNodes[3], fx: 160, fy: 280, sx: -100, sy: 280, lx: 160, ly: 244, anchor: "middle" as const },
];

export default function ConveningDiagram({
  variant = "hero",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "divider") return <DividerMark className={className} />;
  if (variant === "footer-mark") return <FooterMark className={className} />;
  return <HeroDiagram className={className} />;
}

/* ============================ HERO ============================ */
function HeroDiagram({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const svg = root.current;
    if (!svg) return;

    const nodes = gsap.utils.toArray<SVGGElement>("[data-node]", svg);
    const lines = gsap.utils.toArray<SVGPathElement>("[data-line]", svg);
    const center = svg.querySelector("[data-center]");
    const labels = gsap.utils.toArray<SVGTextElement>("[data-label]", svg);

    // Prepare line drawing.
    lines.forEach((line) => {
      const len = line.getTotalLength();
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    });

    if (prefersReducedMotion()) {
      nodes.forEach((n) => {
        const fx = Number(n.dataset.fx);
        const fy = Number(n.dataset.fy);
        gsap.set(n, { x: fx, y: fy, opacity: 1 });
      });
      gsap.set(lines, { strokeDashoffset: 0 });
      gsap.set([center, ...labels], { opacity: 1, scale: 1 });
      return;
    }

    // Initial off-screen positions.
    nodes.forEach((n) => {
      gsap.set(n, {
        x: Number(n.dataset.sx),
        y: Number(n.dataset.sy),
        opacity: 0,
      });
    });
    gsap.set([center, ...labels], { opacity: 0, scale: 0.6, transformOrigin: "center" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.addLabel("converge").to(nodes, {
      opacity: 1,
      duration: 0.4,
      stagger: 0.12,
    });

    // Each node follows its own curved path; offset to create a stagger.
    nodes.forEach((node, i) => {
      tl.to(
        node,
        {
          duration: 1.1,
          ease: "power3.out",
          motionPath: { path: curvedPath(node), curviness: 1.4 },
        },
        `converge+=${i * 0.12}`
      );
    });

    tl.to(
        lines,
        { strokeDashoffset: 0, duration: 0.9, stagger: 0.08, ease: "power2.inOut" },
        "-=0.4"
      )
      .to(center, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.5")
      .to(labels, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08 }, "-=0.4");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={root}
      viewBox="0 0 760 560"
      className={className}
      role="img"
      aria-label="Convening diagram: Policymakers, Business and Industry, Research and Academia, and Civil Society converging into a central FPI node."
    >
      {/* connecting lines (center -> node) */}
      <g stroke="#C08A3E" strokeWidth={1.5} fill="none" opacity={0.85}>
        {HERO_NODES.map((n) => (
          <path
            key={`line-${n.id}`}
            data-line
            d={`M ${CENTER.x} ${CENTER.y} L ${n.fx} ${n.fy}`}
          />
        ))}
      </g>

      {/* central FPI node */}
      <g data-center>
        <circle cx={CENTER.x} cy={CENTER.y} r={46} fill="#1F4D3D" />
        <circle cx={CENTER.x} cy={CENTER.y} r={46} fill="none" stroke="#C08A3E" strokeWidth={1.5} />
        <text
          x={CENTER.x}
          y={CENTER.y}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-fraunces), serif"
          fontSize={26}
          fontWeight={600}
          fill="#F6F3EC"
        >
          FPI
        </text>
      </g>

      {/* outer nodes — drawn centered at origin, positioned via transform */}
      {HERO_NODES.map((n) => (
        <g
          key={n.id}
          data-node
          data-fx={n.fx}
          data-fy={n.fy}
          data-sx={n.sx}
          data-sy={n.sy}
        >
          <circle r={11} fill="#F6F3EC" stroke="#1F4D3D" strokeWidth={2} />
          <circle r={4} fill="#1F4D3D" />
        </g>
      ))}

      {/* labels (static positions, fade in) */}
      {HERO_NODES.map((n) => (
        <text
          key={`label-${n.id}`}
          data-label
          x={n.lx}
          y={n.ly}
          textAnchor={n.anchor}
          fontFamily="var(--font-plex-mono), monospace"
          fontSize={11}
          letterSpacing={1.2}
          fill="#4A5568"
          style={{ textTransform: "uppercase" }}
        >
          {n.label.toUpperCase()}
        </text>
      ))}
    </svg>
  );
}

/** Build a gently curved path from a node's start to its final position. */
function curvedPath(target: SVGGElement) {
  const sx = Number(target.dataset.sx);
  const sy = Number(target.dataset.sy);
  const fx = Number(target.dataset.fx);
  const fy = Number(target.dataset.fy);
  // control point offset perpendicular to the travel direction for a soft arc
  const mx = (sx + fx) / 2 + (sy - fy) * 0.12;
  const my = (sy + fy) / 2 + (fx - sx) * 0.12;
  return [
    { x: sx, y: sy },
    { x: mx, y: my },
    { x: fx, y: fy },
  ];
}

/* ========================== DIVIDER =========================== */
/* Simplified 3-node connector used between major sections. Static. */
function DividerMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 40"
      className={className}
      role="presentation"
      aria-hidden
    >
      <line x1="20" y1="20" x2="120" y2="20" stroke="#C08A3E" strokeWidth={1.25} />
      <line x1="120" y1="20" x2="220" y2="20" stroke="#C08A3E" strokeWidth={1.25} />
      <circle cx="20" cy="20" r="5" fill="none" stroke="#1F4D3D" strokeWidth={1.5} />
      <circle cx="220" cy="20" r="5" fill="none" stroke="#1F4D3D" strokeWidth={1.5} />
      <circle cx="120" cy="20" r="8" fill="#1F4D3D" />
      <circle cx="120" cy="20" r="8" fill="none" stroke="#C08A3E" strokeWidth={1.25} />
    </svg>
  );
}

/* ========================= FOOTER MARK ======================== */
/* Static diamond convening mark for the footer / de-facto logo. */
function FooterMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 88" className={className} role="img" aria-label="FPI convening mark">
      <g stroke="#C08A3E" strokeWidth={1.25} fill="none" opacity={0.9}>
        <line x1="44" y1="44" x2="44" y2="14" />
        <line x1="44" y1="44" x2="74" y2="44" />
        <line x1="44" y1="44" x2="44" y2="74" />
        <line x1="44" y1="44" x2="14" y2="44" />
      </g>
      <g fill="#F6F3EC" stroke="#1F4D3D" strokeWidth={1.5}>
        <circle cx="44" cy="14" r="5" />
        <circle cx="74" cy="44" r="5" />
        <circle cx="44" cy="74" r="5" />
        <circle cx="14" cy="44" r="5" />
      </g>
      <circle cx="44" cy="44" r="14" fill="#1F4D3D" />
      <text
        x="44"
        y="44"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="var(--font-fraunces), serif"
        fontSize={11}
        fontWeight={600}
        fill="#F6F3EC"
      >
        FPI
      </text>
    </svg>
  );
}
