"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "light" | "dark";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-[0.9375rem] font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

function classesFor(variant: Variant, tone: Tone) {
  if (variant === "primary") {
    return "bg-forest text-parchment hover:bg-forest-dim";
  }
  if (variant === "secondary") {
    return tone === "dark"
      ? "border border-parchment/40 text-parchment hover:border-brass hover:text-brass"
      : "border border-line text-ink hover:border-brass hover:text-forest";
  }
  // ghost
  return tone === "dark"
    ? "text-parchment/80 hover:text-brass"
    : "text-forest hover:text-forest-dim";
}

const hover = { y: -2, transition: { duration: 0.15 } };
const tap = { y: 0, scale: 0.99 };

type LinkButtonProps = BaseProps & {
  href: string;
  external?: boolean;
};

export function LinkButton({
  children,
  href,
  variant = "primary",
  tone = "light",
  className,
  external,
}: LinkButtonProps) {
  const cls = cn(base, classesFor(variant, tone), "shadow-sm hover:shadow-md", className);
  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={hover}
        whileTap={tap}
        className={cls}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.span whileHover={hover} whileTap={tap} className="inline-flex">
      <Link href={href} className={cls}>
        {children}
      </Link>
    </motion.span>
  );
}

type ActionButtonProps = BaseProps & {
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  tone = "light",
  className,
  type = "button",
  onClick,
  disabled,
}: ActionButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : hover}
      whileTap={disabled ? undefined : tap}
      className={cn(base, classesFor(variant, tone), "shadow-sm hover:shadow-md", className)}
    >
      {children}
    </motion.button>
  );
}
