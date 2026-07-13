import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  tone?: "ink" | "parchment" | "brass" | "rust";
  as?: "span" | "p" | "div";
};

const toneMap = {
  ink: "text-ink-soft",
  parchment: "text-parchment/70",
  brass: "text-brass",
  rust: "text-rust",
};

export default function EyebrowLabel({
  children,
  className,
  tone = "brass",
  as: Tag = "span",
}: Props) {
  return (
    <Tag className={cn("eyebrow inline-flex items-center gap-2", toneMap[tone], className)}>
      <span aria-hidden className="h-px w-6 bg-current opacity-60" />
      {children}
    </Tag>
  );
}
