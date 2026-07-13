import Card from "@/components/Card";
import { type LucideIcon } from "lucide-react";

/* PrincipleCard — numbered, hairline, mono index */
export function PrincipleCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <Card>
      <span className="font-mono text-xs tracking-eyebrow text-brass">
        {String(index).padStart(2, "0")}
      </span>
      <h3 className="mt-4 font-display text-xl font-medium leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
      <span className="mt-6 block h-px w-8 bg-line transition-all duration-300 group-hover:w-16 group-hover:bg-brass" />
    </Card>
  );
}

/* FunctionAreaCard — icon + title + body */
export function FunctionAreaCard({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <Card>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest transition-colors duration-300 group-hover:border-brass group-hover:text-brass">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <h3 className="mt-5 font-display text-xl font-medium leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
    </Card>
  );
}

/* MembershipCard — category label + description */
export function MembershipCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <Card>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-eyebrow text-ink-soft">
          Category {String(index).padStart(2, "0")}
        </span>
        <span aria-hidden className="h-2 w-2 rounded-full bg-brass" />
      </div>
      <h3 className="mt-4 font-display text-2xl font-medium leading-tight text-ink">
        {title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
    </Card>
  );
}
