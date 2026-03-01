"use client";
import {
  GithubIcon,
  LinkedinIcon,
  CodeIcon,
  DatabaseIcon,
  ServerIcon,
  LayoutIcon,
  SmartphoneIcon,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();
  const skills = [
    {
      name: "Tailwind CSS",
      icon: <LayoutIcon className="w-5 h-5 text-cyan-400" />,
    },
    {
      name: "Javascript",
      icon: <CodeIcon className="w-5 h-5 text-yellow-400" />,
    },
    {
      name: "React Js",
      icon: <CodeIcon className="w-5 h-5 text-blue-400" />,
    },
    {
      name: "Express Js",
      icon: <ServerIcon className="w-5 h-5 text-gray-400" />,
    },
    {
      name: "Node.js",
      icon: <ServerIcon className="w-5 h-5 text-green-500" />,
    },
    {
      name: "Mongo DB",
      icon: <DatabaseIcon className="w-5 h-5 text-green-600" />,
    },
    {
      name: "Next JS",
      icon: <LayoutIcon className="w-5 h-5 text-white" />,
    },
    {
      name: "Firebase",
      icon: <SmartphoneIcon className="w-5 h-5 text-yellow-500" />,
    },
  ];
  return (
    <div className="w-full bg-card p-8">
      <section id="home" className="py-10 overflow-hidden">
        <div
          ref={ref}
          className={`container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
        >
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full bg-card border-2 border-border rounded-xl p-16 flex flex-col items-center text-center hover:border-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(28,199,105,0.1)] group">
              <div className="w-48 h-48 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border-4 border-border group-hover:border-primary transition-all duration-500 flex items-center justify-center mb-6 overflow-hidden relative">
                <span className="text-5xl font-bold text-primary/50">MM</span>
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                Mehedi Mehad
              </h1>
              <a
                href="mailto:mdmehedhasanmehad@gmail.com"
                className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
              >
                mdmehedhasanmehad@gmail.com
              </a>

              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold mb-8">
                Full Stack Developer
              </div>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 rounded-full bg-background border-2 border-border hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_10px_rgba(28,199,105,0.2)]"
                >
                  <GithubIcon className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-3 rounded-full bg-background border-2 border-border hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_10px_rgba(28,199,105,0.2)]"
                >
                  <LinkedinIcon className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: About & Skills */}
          <div className="lg:col-span-8 bg-card p-8 border-2 border-border border-l-4 border-l-primary rounded-l-xl flex flex-col gap-12">
            {/* About Me */}
            <div
              className={`opacity-0 delay-200 ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-4">
                About Me
                <div className="h-0.5 flex-1 bg-linear-to-r from-primary/50 to-transparent"></div>
              </h2>
              <div className="bg-card border-2 border-border rounded-xl p-8 transition-all duration-300">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a full-stack JavaScript developer. I work with React.js,
                  Next.js, Node.js, Express.js, and databases like MongoDB,
                  MySQL, and PostgreSQL. I'm also experienced with Mongoose and
                  Prisma as ORMs. I enjoy building scalable web applications
                  with clean architecture and efficient API integrations.
                </p>
              </div>
            </div>

            {/* Programming Skills */}
            <div
              className={`opacity-0 delay-300 ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-4">
                Programming Skills
                <div className="h-0.5 flex-1 bg-linear-to-r from-primary/50 to-transparent"></div>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="bg-card border-2 border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(28,199,105,0.1)] group"
                  >
                    <div className="p-2 rounded-md bg-background border border-border group-hover:border-primary/30 transition-colors">
                      {skill.icon}
                    </div>
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
