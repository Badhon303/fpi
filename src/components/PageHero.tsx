import EyebrowLabel from "@/components/EyebrowLabel";

export default function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="bg-ink pb-16 pt-32 text-parchment md:pb-24 md:pt-40">
      <div className="container-dossier">
        <EyebrowLabel tone="brass">{eyebrow}</EyebrowLabel>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-parchment">
          {title}
        </h1>
        {intro ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-parchment/75">
            {intro}
          </p>
        ) : null}
      </div>
    </section>
  );
}
