"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger direct children instead of animating the container as one unit. */
  stagger?: boolean;
  delay?: number;
  as?: "div" | "section" | "ul" | "ol" | "article";
};

export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = prefersReducedMotion();
    const targets = stagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el];

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 24 });

    const anim = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      delay,
      stagger: stagger ? 0.1 : 0,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [stagger, delay]);

  const Tag = as as keyof JSX.IntrinsicElements;

  return (
    // @ts-expect-error dynamic tag with ref
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
