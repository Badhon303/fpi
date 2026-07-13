"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
  interactive?: boolean;
};

/**
 * Base card: hairline border on parchment/ink that shifts to brass on hover,
 * with a subtle lift. Used by Principle / FunctionArea / Membership variants.
 */
export default function Card({
  children,
  className,
  tone = "light",
  interactive = true,
}: CardProps) {
  const toneClasses =
    tone === "dark"
      ? "border-line-dark bg-ink text-parchment"
      : "border-line bg-parchment text-ink";

  return (
    <motion.div
      whileHover={interactive ? { y: -4 } : undefined}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative rounded-lg border p-7 transition-colors duration-300",
        toneClasses,
        interactive &&
          (tone === "dark"
            ? "hover:border-brass hover:shadow-lg"
            : "hover:border-brass hover:shadow-md"),
        className
      )}
    >
      {children}
    </motion.div>
  );
}
