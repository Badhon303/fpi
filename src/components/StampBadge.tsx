import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "brass" | "forest" | "rust" | "parchment";
};

const toneMap = {
  brass: "border-brass/60 text-brass",
  forest: "border-forest/40 text-forest",
  rust: "border-rust/50 text-rust",
  parchment: "border-parchment/40 text-parchment/80",
};

export default function StampBadge({ children, className, tone = "brass" }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-eyebrow",
        toneMap[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
