import Image from "next/image";

import { skills } from "@/constants/skills";

export function AboutSkillsCard() {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-6 shadow-sm">
      <h3 className="mb-6 flex items-center gap-4 text-2xl font-bold text-primary">
        Skills & Technologies
        <div className="h-0.5 flex-1 bg-linear-to-r from-primary/60 to-transparent" />
      </h3>

      <div>
        {/* <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
          Programming Skills
        </h4> */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.map((skill) => (
            <div
              key={skill.level}
              className="group flex items-center gap-3 rounded-lg border-2 border-border bg-background/70 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_5px_15px_rgba(28,199,105,0.1)]"
            >
              <div className="rounded-md border border-border bg-amber-50 p-2 transition-colors group-hover:border-primary/30">
                <Image
                  src={skill.icon}
                  alt={skill.level}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>

              <span className="font-medium text-foreground transition-colors group-hover:text-primary">
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
