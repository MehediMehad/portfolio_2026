import type { LucideIcon } from "lucide-react";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type Props = {
  services: Service[];
};

export function AboutServicesCard({ services }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-4 text-2xl font-bold text-primary">
        What I Do
        <div className="h-0.5 flex-1 bg-linear-to-r from-primary/60 to-transparent" />
      </h3>

      <div className="space-y-5">
        {services.map((service) => {
          const Icon = service.icon;

          return (
            <div
              key={service.title}
              className="flex items-center gap-4 rounded-2xl border border-border bg-background/70 p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  {service.title}
                </h4>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
