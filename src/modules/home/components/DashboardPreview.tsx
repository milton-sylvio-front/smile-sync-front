import type { HomeContent } from "@/modules/home/types/home";

type DashboardPreviewProps = {
  dashboard: HomeContent["dashboard"];
};

export function DashboardPreview({ dashboard }: DashboardPreviewProps) {
  const total = dashboard.segments.reduce((sum, segment) => sum + segment.value, 0);
  const colors = ["#004953", "#F9F07E", "#8fb8bf"];
  const gradient = dashboard.segments
    .reduce<{ parts: string[]; offset: number }>(
      (state, segment, index) => {
        const start = (state.offset / total) * 100;
        const offset = state.offset + segment.value;
        const end = (offset / total) * 100;

        return {
          offset,
          parts: [...state.parts, `${colors[index % colors.length]} ${start}% ${end}%`],
        };
      },
      { parts: [], offset: 0 },
    )
    .parts.join(", ");

  return (
    <div
      id="demonstracao"
      className="relative rounded-[1.75rem] bg-white p-4 shadow-[0_30px_70px_-28px_rgba(0,73,83,0.45)] ring-1 ring-primary/10 sm:p-5"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Dashboard</p>
          <h2 className="text-base font-semibold text-primary">{dashboard.title}</h2>
        </div>
        <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-primary">
          {dashboard.badge}
        </span>
      </div>
      <dl className="grid grid-cols-3 gap-2">
        {dashboard.metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-surface px-3 py-2.5">
            <dt className="text-[11px] text-muted">{metric.label}</dt>
            <dd className="mt-1 text-sm font-bold text-primary sm:text-base">{metric.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 grid gap-4 sm:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-xl border border-slate-100 p-3">
          <p className="mb-3 text-xs font-medium text-muted">Consultas na semana</p>
          <div className="flex h-28 items-end gap-2" aria-hidden="true">
            {dashboard.bars.map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="flex-1 rounded-t-md bg-primary"
                style={{ height: `${height}%`, opacity: 0.45 + (index % 3) * 0.18 }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-slate-100 p-3">
          <p className="mb-3 text-xs font-medium text-muted">Agenda</p>
          <div
            aria-hidden="true"
            className="mx-auto h-20 w-20 rounded-full"
            style={{ background: `conic-gradient(${gradient})` }}
          />
          <ul className="mt-3 space-y-1">
            {dashboard.segments.map((segment) => (
              <li key={segment.label} className="flex items-center justify-between text-[11px] text-muted">
                <span>{segment.label}</span>
                <span className="font-semibold text-primary">{segment.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
