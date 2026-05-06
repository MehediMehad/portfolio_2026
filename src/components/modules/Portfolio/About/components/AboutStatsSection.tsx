import type { LucideIcon } from "lucide-react";

type Stat = {
  value: string;
  label: string;
  icon: LucideIcon;
};

type Props = {
  stats: Stat[];
};

export function AboutStatsSection({ stats }: Props) {
  return (
    <section className="container mx-auto px-4 pb-16">
      <div className="grid gap-4 rounded-2xl border border-border bg-[linear-gradient(90deg,rgba(20,16,57,0.55),rgba(7,13,26,0.9))] p-6 md:grid-cols-4 md:gap-0 md:p-8">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-3 border-border text-center md:px-6 md:not-last:border-r"
            >
              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-4xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
