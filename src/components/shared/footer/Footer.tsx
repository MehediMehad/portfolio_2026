import { getMyInfo } from "@/services/auth/getUserInfo";
import { Platform } from "@/types";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  MailIcon,
  MapPinIcon,
  GlobeIcon,
  Facebook,
  Instagram,
  Youtube,
  LucideIcon,
} from "lucide-react";
export const Footer = async () => {
  const myInfo = await getMyInfo();

  if (!myInfo) {
    return null;
  }

  // ✅ Better: use LucideIcon instead of JSX.Element
  const socialIcons: Record<Platform, LucideIcon> = {
    GitHub: GithubIcon,
    LinkedIn: LinkedinIcon,
    Facebook: Facebook,
    Instagram: Instagram,
    YouTube: Youtube,
    Twitter: TwitterIcon,
    Portfolio: GlobeIcon,
  };

  const portfolioUrl = myInfo.socialMedias?.find(
    (sm) => sm.platformName === "Portfolio",
  )?.url;

  return (
    <footer className="border-t-2 border-border pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border-2 border-primary flex items-center justify-center">
                <span className="text-2xl font-extrabold text-primary">
                  {myInfo.name[0] || "M"}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {myInfo.name}
                </h3>
                <p className="text-sm font-semibold text-primary">
                  {myInfo?.designation}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {myInfo.shortBio ||
                "Creating dynamic and responsive web experiences with modern technologies and a focus on user experience."}
            </p>
            {/* Dynamic Social Media Icons */}
            <div className="flex gap-3">
              {myInfo?.socialMedias?.map((social, index: number) => {
                if (!social?.url) return null;

                const Icon = socialIcons[social.platformName as Platform];

                if (!Icon) return null;

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-md bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4">
              {["Home", "About", "Projects", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-bold text-foreground mb-6">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-md bg-background border border-border text-primary">
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${myInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {myInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-md bg-background border border-border text-primary">
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Location
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {myInfo.address}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="p-2.5 rounded-md bg-background border border-border text-primary">
                  <GlobeIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Website
                  </p>
                  <a
                    href={portfolioUrl}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {portfolioUrl?.split("/")[2]}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">{myInfo.name}</span>.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Projects
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
