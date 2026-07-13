import EyebrowLabel from "@/components/EyebrowLabel";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "parchment" | "ink" | "parchment-soft";
  id?: string;
};

const toneMap = {
  parchment: "bg-parchment text-ink",
  "parchment-soft": "bg-parchment-soft text-ink",
  ink: "bg-ink text-parchment",
};

export function Section({ children, className, tone = "parchment", id }: SectionProps) {
  return (
    <section id={id} className={cn("section-pad", toneMap[tone], className)}>
      <div className="container-dossier">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? (
        <EyebrowLabel tone={isDark ? "parchment" : "brass"}>{eyebrow}</EyebrowLabel>
      ) : null}
      <h2
        className={cn(
          "mt-4 font-display text-h2 font-normal",
          isDark ? "text-parchment" : "text-ink"
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            isDark ? "text-parchment/70" : "text-ink-soft"
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
