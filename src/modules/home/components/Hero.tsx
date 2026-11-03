import { DashboardPreview } from "@/components/home/DashboardPreview";
import type { HomeContent } from "@/types/home";

type HeroProps = {
  hero: HomeContent["hero"];
  dashboard: HomeContent["dashboard"];
};

const avatarTones = ["bg-primary", "bg-[#1a6b74]", "bg-[#3d8b78]"];

export function Hero({ hero, dashboard }: HeroProps) {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
      <div>
        <h1 className="max-w-xl text-4xl font-bold leading-[1.12] tracking-tight text-primary sm:text-5xl">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg">
          {hero.description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={hero.primaryAction.href}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          >
            {hero.primaryAction.label}
          </a>
          <a
            href={hero.secondaryAction.href}
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
          >
            {hero.secondaryAction.label}
          </a>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <ul className="flex -space-x-2" aria-label="Clínicas parceiras">
            {hero.clinics.map((clinic, index) => (
              <li
                key={clinic.name}
                title={clinic.name}
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-semibold text-white ${avatarTones[index % avatarTones.length]}`}
              >
                <span className="sr-only">{clinic.name}</span>
                <span aria-hidden="true">{clinic.initials}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted">{hero.trustLabel}</p>
        </div>
      </div>
      <DashboardPreview dashboard={dashboard} />
    </section>
  );
}
