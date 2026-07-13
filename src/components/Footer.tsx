import Link from "next/link";
import { nav, org, foundingDisclosure } from "@/content/site";
import ConveningDiagram from "@/components/ConveningDiagram";
import StampBadge from "@/components/StampBadge";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-parchment">
      <div className="container-dossier py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[auto_1fr_auto] md:gap-16">
          {/* Mark + wordmark */}
          <div>
            <div className="flex items-center gap-4">
              <ConveningDiagram variant="footer-mark" className="h-16 w-16" />
              <div>
                <p className="font-display text-2xl font-semibold tracking-tight text-parchment">
                  FPI
                </p>
                <p className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-parchment/60">
                  {org.shortName}
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-parchment/70">
              {org.descriptor}.
            </p>
            <p className="mt-4 font-display text-lg italic leading-snug text-parchment/90">
              &ldquo;{org.tagline}.&rdquo;
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer" className="md:justify-self-center">
            <p className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-brass">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/" className="text-sm text-parchment/80 transition-colors hover:text-brass">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-parchment/80 transition-colors hover:text-brass"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Meta */}
          <div className="md:text-right">
            <p className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-brass">
              Secretariat
            </p>
            <p className="mt-5 text-sm text-parchment/80">
              {org.location}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 md:justify-end">
              <StampBadge tone="parchment">Non-Partisan</StampBadge>
              <StampBadge tone="parchment">Est. 2026</StampBadge>
              <StampBadge tone="parchment">Foundation-Based</StampBadge>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-line-dark pt-8">
          <p className="max-w-2xl text-xs leading-relaxed text-parchment/50">
            {foundingDisclosure}
          </p>
          <div className="mt-6 flex flex-col gap-2 text-xs text-parchment/50 md:flex-row md:items-center md:justify-between">
            <p className="font-mono uppercase tracking-eyebrow">
              &copy; {year} {org.name}
            </p>
            <p className="font-mono uppercase tracking-eyebrow">
              Dhaka, Bangladesh
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
