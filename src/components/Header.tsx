"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/Button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Home has a dark hero the header sits over; other pages use a light top.
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !overHero;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-line bg-parchment/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="container-dossier flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="FPI Bangladesh — home" className="flex items-center">
          <Image
            src="/fpi-logo.png"
            alt="Forum for Policy Insight (FPI) Bangladesh"
            width={200}
            height={54}
            priority
            className={cn(
              "h-9 w-auto transition-opacity md:h-10",
              solid ? "opacity-100" : "opacity-0"
            )}
          />
          {/* Reversed wordmark over the dark hero */}
          {!solid && (
            <span className="absolute flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold tracking-tight text-parchment">
                FPI
              </span>
              <span className="hidden font-mono text-[0.7rem] uppercase tracking-eyebrow text-parchment/70 sm:inline">
                Bangladesh
              </span>
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
              solid={solid}
            />
          ))}
          <LinkButton href="/contact" variant="primary" className="px-5 py-2.5 text-sm">
            Get in Touch
          </LinkButton>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "lg:hidden",
            solid ? "text-ink" : "text-parchment"
          )}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-line bg-parchment lg:hidden"
          >
            <ul className="container-dossier flex flex-col py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block border-b border-line/60 py-3 font-sans text-lg",
                      pathname === item.href ? "text-forest" : "text-ink"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <LinkButton href="/contact" variant="primary" className="w-full">
                  Get in Touch
                </LinkButton>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  label,
  active,
  solid,
}: {
  href: string;
  label: string;
  active: boolean;
  solid: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative py-1 font-sans text-[0.9375rem] transition-colors",
        solid
          ? active
            ? "text-forest"
            : "text-ink hover:text-forest"
          : "text-parchment/90 hover:text-parchment"
      )}
    >
      {label}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-px bg-brass transition-all duration-300 ease-dossier",
          active ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}
