import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  cite?: string;
  className?: string;
  tone?: "ink" | "parchment";
};

export default function PullQuote({ children, cite, className, tone = "ink" }: Props) {
  const isDark = tone === "parchment";
  return (
    <figure className={cn("my-2", className)}>
      <blockquote
        className={cn(
          "border-l-2 border-brass pl-6 font-display text-2xl font-normal italic leading-snug md:text-[1.75rem]",
          isDark ? "text-parchment" : "text-ink"
        )}
      >
        {children}
      </blockquote>
      {cite ? (
        <figcaption
          className={cn(
            "eyebrow mt-4 pl-6",
            isDark ? "text-parchment/60" : "text-ink-soft"
          )}
        >
          {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}
