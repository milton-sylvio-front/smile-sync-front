import type { HomeContent } from "@/types/home";

type StatsProps = {
  solutions: HomeContent["solutions"];
};

export function Stats({ solutions }: StatsProps) {
  return (
    <section id={solutions.id} className="bg-primary text-white">
      <dl className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-12">
        {solutions.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <dd className="text-3xl font-bold tracking-tight sm:text-4xl">{stat.value}</dd>
            <dt className="mt-1 text-sm text-white/75">{stat.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
