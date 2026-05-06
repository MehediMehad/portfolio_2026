type JourneyStep = {
  year: string;
  title: string;
  description: string;
};

type Props = {
  steps: JourneyStep[];
};

export function AboutJourneyCard({ steps }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-4 text-2xl font-bold text-primary">
        My Journey
        <div className="h-0.5 flex-1 bg-linear-to-r from-primary/60 to-transparent" />
      </h3>

      <div className="space-y-8">
        {steps.map((step) => (
          <div key={step.year} className="relative pl-8">
            <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
            <div className="absolute left-[7px] top-5 h-[calc(100%+12px)] w-px bg-border last:hidden" />
            <p className="text-sm font-semibold text-primary">{step.year}</p>
            <h4 className="mt-2 text-xl font-semibold text-foreground">
              {step.title}
            </h4>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
