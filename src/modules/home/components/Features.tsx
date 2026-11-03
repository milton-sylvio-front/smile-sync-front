import { FeatureIcon } from "@/modules/home/components/FeatureIcon";
import type { HomeContent } from "@/modules/home/types/home";

type FeaturesProps = {
  features: HomeContent["features"];
};

export function Features({ features }: FeaturesProps) {
  return (
    <section id={features.id} className="bg-surface py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            {features.title}
          </h2>
          <p className="mt-3 text-base text-muted sm:text-lg">{features.subtitle}</p>
        </div>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.items.map((feature) => (
            <li
              key={feature.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <FeatureIcon name={feature.icon} />
              <h3 className="mt-4 text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
