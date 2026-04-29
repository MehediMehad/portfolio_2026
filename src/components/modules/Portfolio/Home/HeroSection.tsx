"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Image from "next/image";
import {
  GithubIcon,
  LinkedinIcon,
  Facebook,
  Instagram,
  Youtube,
  TwitterIcon, // TwitterIcon
  GlobeIcon, // PortfolioIcon
  CodeIcon,
  LayoutIcon,
} from "lucide-react";
import { JSX } from "react";
import { Platform, TUser } from "@/types";

type Props = {
  myInfo: TUser | null;
};

export function HeroSection({ myInfo }: Props) {
  const { ref, isVisible } = useScrollAnimation();

  // Fallback skills if no data (optional)
  const fallbackSkills = [
    {
      name: "Tailwind CSS",
      icon: <LayoutIcon className="w-5 h-5 text-cyan-400" />,
    },
    {
      name: "Javascript",
      icon: <CodeIcon className="w-5 h-5 text-yellow-400" />,
    },
    { name: "React Js", icon: <CodeIcon className="w-5 h-5 text-blue-400" /> },
    { name: "Next JS", icon: <LayoutIcon className="w-5 h-5 text-white" /> },
  ];

  const skills =
    myInfo?.skills && myInfo.skills.length > 0
      ? myInfo.skills.map((skill) => ({
          name: skill.name,
          icon: skill.icon ? (
            <Image
              src={skill.icon}
              alt={skill.name}
              width={24}
              height={24}
              className="w-5 h-5 object-contain"
            />
          ) : (
            <CodeIcon className="w-5 h-5 text-blue-400" />
          ),
        }))
      : fallbackSkills;

  const socialIcons: Record<Platform, JSX.Element> = {
    GitHub: <GithubIcon className="w-5 h-5" />,
    LinkedIn: <LinkedinIcon className="w-5 h-5" />,
    Facebook: <Facebook className="w-5 h-5" />,
    Instagram: <Instagram className="w-5 h-5" />,
    YouTube: <Youtube className="w-5 h-5" />,
    Twitter: <TwitterIcon className="w-5 h-5" />,
    Portfolio: <GlobeIcon className="w-5 h-5" />,
  };

  if (!myInfo) {
    return <div className="text-center py-20">Loading profile...</div>;
  }

  return (
    <div className="w-full sm:p-8">
      <section id="home" className="py-10 overflow-hidden">
        <div
          ref={ref}
          className={`container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start opacity-0 ${isVisible ? "animate-fade-in-up" : ""}`}
        >
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full  border-2 border-border rounded-xl p-16 flex flex-col items-center text-center hover:border-primary transition-all duration-500 hover:shadow-[0_0_30px_rgba(28,199,105,0.1)] group">
              {/* Dynamic Profile Image */}
              <div className="w-48 h-48 rounded-full bg-linear-to-r from-primary/20 to-primary/5 border-4 border-border group-hover:border-primary transition-all duration-500 flex items-center justify-center mb-6 overflow-hidden relative">
                {myInfo.image ? (
                  <Image
                    src={myInfo.image}
                    alt={myInfo.name || "Profile"}
                    width={96}
                    height={96}
                    priority
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-5xl font-bold text-primary/50">
                    {myInfo.name?.slice(0, 2).toUpperCase() || "MM"}
                  </span>
                )}
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                {myInfo.name}
              </h1>

              <a
                href={`mailto:${myInfo.email}`}
                className="text-base text-muted-foreground hover:text-primary transition-colors mb-4"
              >
                {myInfo.email}
              </a>

              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-semibold mb-8">
                {myInfo.designation || "Full Stack Developer"}
              </div>

              {/* Dynamic Social Media Links */}
              <div className="flex gap-2">
                {myInfo.socialMedias?.map((social) => (
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
          <div className="lg:col-span-8 md:min-h-[550px] md:max-h-[550px] p-8 border-2 border-border border-l-4 border-l-primary rounded-l-xl flex flex-col gap-12">
            {/* About Me */}
            <div
              className={`opacity-0 delay-200 ${isVisible ? "animate-fade-in-up" : ""}`}
            >
              <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-4">
                About Me
                <div className="h-0.5 flex-1 bg-linear-to-r from-primary/50 to-transparent"></div>
              </h2>
              <div className=" border-2 border-border rounded-xl p-8 transition-all duration-300">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {myInfo.aboutMe || "No about information available."}
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className=" border-2 border-border rounded-lg p-4 flex items-center gap-3 hover:border-primary hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_5px_15px_rgba(28,199,105,0.1)] group"
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
