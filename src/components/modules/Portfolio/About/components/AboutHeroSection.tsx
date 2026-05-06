import Image from "next/image";
import Link from "next/link";
import { DownloadIcon, RocketIcon } from "lucide-react";

import profile from "@/assets/images/MehediHasan.png";

type Props = {
  highlightPoints: string[];
};

export function AboutHeroSection({ highlightPoints }: Props) {
  return (
    <section>
      <div className="container mx-auto px-4 py-14 md:py-18">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-4 text-primary">
              <h1 className="text-3xl font-bold md:text-4xl">About Me</h1>
              <div className="h-0.5 w-20 bg-linear-to-r from-primary to-transparent" />
            </div>

            <h2 className="max-w-2xl text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Passionate about building{" "}
              <span className="text-primary">digital solutions</span> that make
              an impact.
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              I&apos;m a full-stack developer with a strong focus on building
              scalable, efficient, and user-friendly web applications. I enjoy
              turning ideas into reality through clean code and modern
              technologies.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlightPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                  {point}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1gMs1zoSVF7rnndJHETWzrtn8ST-3wyfb/view?usp=sharing"
                className="inline-flex items-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-300/60 hover:bg-purple-500/20 hover:shadow-[0_0_28px_rgba(168,85,247,0.45)]"
              >
                <DownloadIcon className="h-4 w-4" />
                Download Resume
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Let&apos;s Talk
                <RocketIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden">
              <div className="relative mx-auto flex min-h-[560px] items-end justify-center rounded-2xl">
                <Image
                  src={profile}
                  alt="Md Mehedi Hasan"
                  width={460}
                  height={620}
                  className="relative z-10 h-auto max-h-[560px] w-auto rounded-2xl object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
