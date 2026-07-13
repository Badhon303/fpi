import ConveningDiagram from "@/components/ConveningDiagram";
import { cn } from "@/lib/utils";

type Props = {
  withMark?: boolean;
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionDivider({
  withMark = false,
  tone = "light",
  className,
}: Props) {
  const lineColor = tone === "dark" ? "border-line-dark" : "border-line";
  if (!withMark) {
    return <hr className={cn("border-t", lineColor, className)} />;
  }
  return (
    <div className={cn("flex items-center gap-6", className)} role="presentation">
      <span className={cn("h-px flex-1 border-t", lineColor)} />
      <ConveningDiagram variant="divider" className="h-6 w-36 shrink-0" />
      <span className={cn("h-px flex-1 border-t", lineColor)} />
    </div>
  );
}
