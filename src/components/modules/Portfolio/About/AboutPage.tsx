import Image from "next/image";
import Link from "next/link";
import {
  BriefcaseBusinessIcon,
  CalendarDaysIcon,
  Code2Icon,
  DatabaseIcon,
  DownloadIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  RocketIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

import profile from "@/assets/images/MehediHasan.png";
import { skills } from "@/constants/skills";
import { socialIcons, socialMedias } from "@/constants/socialMedias";

const journeySteps = [
  {
    year: "2024 - Present",
    title: "Full Stack Developer",
    description:
      "Building scalable web applications with React, Next.js, Node.js, and modern backend tools.",
  },
  {
    year: "2023 - 2024",
    title: "Learning & Building",
    description:
      "Focused on sharpening frontend and backend skills through real projects and continuous practice.",
  },
  {
    year: "2022 - 2023",
    title: "Started My Journey",
    description:
      "Began exploring programming with curiosity, consistency, and a strong interest in problem solving.",
  },
];

const services = [
  {
    title: "Web Development",
    description:
      "Building responsive and performant websites and web applications.",
    icon: Code2Icon,
  },
  {
    title: "API Development",
    description:
      "Creating secure backend APIs and integrating third-party services.",
    icon: RocketIcon,
  },
  {
    title: "Database Management",
    description:
      "Designing and managing data layers for scalable applications.",
    icon: DatabaseIcon,
  },
  {
    title: "Problem Solving",
    description:
      "Turning complex requirements into clean, maintainable product solutions.",
    icon: ShieldCheckIcon,
  },
];

const stats = [
  { value: "10+", label: "Projects Completed", icon: Code2Icon },
  { value: "1+", label: "Years of Experience", icon: CalendarDaysIcon },
  { value: "8+", label: "Core Technologies", icon: SparklesIcon },
  { value: "100%", label: "Commitment", icon: BriefcaseBusinessIcon },
];

const skillGroups = [
  {
    title: "Core Stack",
    items: ["React.js", "Next.js", "TypeScript", "Node.js"],
  },
  {
    title: "Backend",
    items: ["Express.js", "MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Postman"],
  },
];

const highlightPoints = [
  "1+ Years of Experience",
  "10+ Projects Completed",
  "Always Learning New Things",
  "Open to Opportunities",
];

const AboutPage = () => {
  return (
    <div className="bg-background">
      <section className="">
        <div className="container mx-auto px-4 py-14 md:py-18">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="mb-6 flex items-center gap-4 text-primary">
                <h1 className="text-3xl font-bold md:text-4xl">About Me</h1>
                <div className="h-0.5 w-20 bg-linear-to-r from-primary to-transparent" />
              </div>

              <h2 className="max-w-2xl text-4xl font-bold leading-tight text-foreground md:text-5xl">
                Passionate about building{" "}
                <span className="text-primary">digital solutions</span> that
                make an impact.
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
              <div className="relative overflow-hidden ">
                <div className="relative mx-auto flex min-h-[560px] items-end justify-center rounded-2xl">
                  <Image
                    src={profile}
                    alt="Md Mehedi Hasan"
                    width={460}
                    height={620}
                    className="relative rounded-2xl z-10 h-auto max-h-[560px] w-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background/60 p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-4 text-2xl font-bold text-primary">
              My Journey
              <div className="h-0.5 flex-1 bg-linear-to-r from-primary/60 to-transparent" />
            </h3>

            <div className="space-y-8">
              {journeySteps.map((step) => (
                <div key={step.year} className="relative pl-8">
                  <div className="absolute left-0 top-1 h-4 w-4 rounded-full border-2 border-primary bg-background" />
                  <div className="absolute left-[7px] top-5 h-[calc(100%+12px)] w-px bg-border last:hidden" />
                  <p className="text-sm font-semibold text-primary">
                    {step.year}
                  </p>
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
                    className="flex gap-4 rounded-2xl border border-border bg-background/70 p-4 transition-colors hover:border-primary/30"
                  >
                    <div className="rounded-xl border border-primary/20 bg-primary/10 p-3 text-primary">
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

          <div className="rounded-2xl border border-border bg-background/60 p-6 shadow-sm">
            <h3 className="mb-6 flex items-center gap-4 text-2xl font-bold text-primary">
              Skills & Technologies
              <div className="h-0.5 flex-1 bg-linear-to-r from-primary/60 to-transparent" />
            </h3>

            <div className="space-y-6">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
                    {group.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary/80">
                  Toolkit
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {skills.slice(0, 8).map((skill) => (
                    <div
                      key={skill.level}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.level}
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px] object-contain"
                      />
                      <span className="text-sm text-foreground">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                <p className="text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* <section className="pb-8 border-y border-border bg-background/60">
        <div className="container mx-auto grid gap-10  p-6 md:grid-cols-3 md:p-8">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <div className="h-14 w-14 overflow-hidden rounded-xl border-2 border-primary bg-primary/10">
                <Image
                  src={profile}
                  alt="Md Mehedi Hasan"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  Md Mehedi Hasan
                </h3>
                <p className="text-sm font-semibold text-primary">
                  Full Stack Developer
                </p>
              </div>
            </div>

            <p className="max-w-xs text-sm leading-7 text-muted-foreground">
              Creating dynamic and responsive web experiences with modern
              technologies and a strong focus on clean user experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialMedias.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-border bg-background p-2.5 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  {socialIcons[social.platformName]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xl font-bold text-foreground">
              Quick Links
            </h4>
            <div className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Projects", href: "/projects" },
                { label: "Blog", href: "/blogs" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xl font-bold text-foreground">
              Get In Touch
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="rounded-xl border border-border bg-background p-2.5 text-primary">
                  <MailIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Email</p>
                  <a
                    href="mailto:mdmehedihasanmehad@gmail.com"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    mdmehedihasanmehad@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl border border-border bg-background p-2.5 text-primary">
                  <MapPinIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Location
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl border border-border bg-background p-2.5 text-primary">
                  <GlobeIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Website
                  </p>
                  <a
                    href="https://mehedihasanmehad.vercel.app"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    mehedihasanmehad.vercel.app
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default AboutPage;
