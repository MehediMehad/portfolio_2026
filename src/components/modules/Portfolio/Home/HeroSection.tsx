"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";

import mehedi from "@/assets/images/MehediHasan.png";
import { skills } from "@/constants/skills";
import { socialIcons, socialMedias } from "@/constants/socialMedias";
import { GlobeIcon } from "lucide-react";

export function HeroSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="w-full sm:p-8">
      <section id="home" className="py-10 overflow-hidden">
        <div
          ref={ref}
          className={`container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
        >
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full h-full md:min-h-[646px] border-2 border-border rounded-xl p-16 flex flex-col items-center text-center hover:border-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(28,199,105,0.1)] group">
              {/* Dynamic Profile Image */}
              <div className="h-72 rounded-full overflow-hidden relative border-4 border-border">
                <Image
                  src={mehedi}
                  alt="Mehedi Hasan"
                  width={288}
                  height={288}
                  className="object-cover rounded-full"
                  priority
                />
              </div>

              <h1 className="text-3xl font-bold text-foreground mt-4">
                Md Mehedi Hasan
              </h1>

              <p className="text-base text-muted-foreground hover:text-primary transition-colors mb-4">
                mdmehedihasanmehad@gmail.com
              </p>

              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold mb-8">
                Full Stack Developer
              </div>

              {/* Static Social Media Links */}
              <div className="flex gap-2">
                {socialMedias.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-background border-2 border-border hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-[0_0_10px_rgba(28,199,105,0.2)]"
                  >
                    {socialIcons[social.platformName] || (
                      <GlobeIcon className="w-4 h-4" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: About & Skills */}
          <div className="lg:col-span-8 h-full md:min-h-[646px] md:max-h-[646px] p-8 border-2 border-border border-l-4 border-l-primary rounded-l-xl flex flex-col gap-12">
            {/* About Me */}
            <div
              className={`opacity-0 delay-200 ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-4">
                About Me
                <div className="h-0.5 flex-1 bg-linear-to-r from-primary/50 to-transparent"></div>
              </h2>
              <div className=" border-2 border-border rounded-xl p-8 transition-all duration-300 min-h-[250px]">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Full-stack developer with 1+ year of production experience
                  building scalable, production-ready web applications using
                  React.js, Next.js, Node.js, and TypeScript. Skilled in SSR/SSG
                  for SEO optimisation, API development, database management
                  (PostgreSQL, MongoDB), and secure authentication (JWT).
                  Passionate about writing clean, maintainable code and
                  delivering efficient end-to-end solutions.
                </p>
              </div>
            </div>

            {/* Static Programming Skills */}
            <div
              className={`opacity-0 delay-300 ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-4">
                Programming Skills
                <div className="h-0.5 flex-1 bg-linear-to-r from-primary/50 to-transparent"></div>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="border-2 border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(28,199,105,0.1)] group"
                  >
                    <div className="p-2 rounded-md bg-amber-50 border border-border group-hover:border-primary/30 transition-colors">
                      <Image
                        src={skill.icon}
                        alt={skill.level}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    </div>

                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {skill.level}
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
