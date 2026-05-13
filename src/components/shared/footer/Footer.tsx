import { socialIcons, socialMedias } from "@/constants/socialMedias";
import { Platform } from "@/types";
import { MailIcon, MapPinIcon, GlobeIcon } from "lucide-react";
import profile from "@/assets/images/MehediHasan.png";
import Image from "next/image";
import Link from "next/link";
export const Footer = async () => {
  return (
    <footer className="border-t-2 border-border pt-16 pb-8 mt-20 bg-background ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10">
                <Image
                  src={profile}
                  alt="Md Mehedi Hasan"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold text-foreground">
                  Md Mehedi Hasan
                </span>
                <span className="text-xs text-muted-foreground">
                  FULL STACK DEVELOPER
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Creating dynamic and responsive web experiences with modern
              technologies and a focus on user experience.
            </p>
            {/* Dynamic Social Media Icons */}
            <div className="flex gap-3">
              {socialMedias?.map((social, index: number) => {
                if (!social?.url) return null;

                const Icon = socialIcons[social.platformName as Platform];

                if (!Icon) return null;

                return (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${social.platformName} profile`}
                    className="p-2.5 rounded-md bg-background border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    {socialIcons[social.platformName] || (
                      <GlobeIcon className="w-4 h-4" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3
              id="footer-nav-heading"
              className="text-lg font-bold text-foreground mb-6"
            >
              Quick Links
            </h3>
            <nav aria-labelledby="footer-nav-heading">
              <ul className="flex flex-col gap-4">
                {["Home", "About", "Projects", "Blog", "Contact"].map(
                  (link) => (
                    <li key={link}>
                      <Link
                        href={`#${link.toLowerCase()}`}
                        aria-label={`Go to ${link} section`}
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-3 group"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"
                          aria-hidden="true"
                        ></span>
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3
              id="contact-heading"
              className="text-lg font-bold text-foreground mb-6"
            >
              Get In Touch
            </h3>
            <ul
              aria-labelledby="contact-heading"
              className="flex flex-col gap-6"
            >
              {/* Email Item */}
              <li className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-md bg-background border border-border text-primary"
                  aria-hidden="true"
                >
                  <MailIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Email
                  </p>
                  <Link
                    href="mailto:mdmehedihasanmehad@gmail.com" // Added .com
                    aria-label="Send an email to Mehedi Hasan"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    mdmehedihasanmehad@gmail.com
                  </Link>
                </div>
              </li>

              {/* Location Item */}
              <li className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-md bg-background border border-border text-primary"
                  aria-hidden="true"
                >
                  <MapPinIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Location
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </li>

              {/* Website Item */}
              <li className="flex items-start gap-4">
                <div
                  className="p-2.5 rounded-md bg-background border border-border text-primary"
                  aria-hidden="true"
                >
                  <GlobeIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Website
                  </p>
                  <Link
                    href="https://mehedihasanmehad.vercel.app"
                    aria-label="Visit portfolio website"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    mehedihasanmehad.vercel.app
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-2 border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground font-semibold">
              Md Mehedi Hasan
            </span>
            . All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link
              href="/about"
              aria-label="Footer navigation about"
              className="hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              aria-label="Footer navigation contact"
              className="hover:text-primary transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/projects"
              aria-label="Footer navigation project"
              className="hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              aria-label="Footer navigation blog"
              className="hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
