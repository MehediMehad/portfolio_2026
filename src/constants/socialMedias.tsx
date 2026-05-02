import { Platform } from "@/types";
import { JSX } from "react";

import {
  GithubIcon,
  LinkedinIcon,
  Facebook,
  Instagram,
  Youtube,
  TwitterIcon,
  GlobeIcon,
} from "lucide-react";

const socialMedias: {
  id: string;
  platformName: Platform;
  url: string;
}[] = [
  {
    id: "github",
    platformName: "GitHub",
    url: "https://github.com/MehediMehad",
  },
  {
    id: "linkedin",
    platformName: "LinkedIn",
    url: "https://www.linkedin.com/in/mehedimehad",
  },
  {
    id: "facebook",
    platformName: "Facebook",
    url: "https://www.facebook.com/mehedimehad",
  },
  {
    id: "instagram",
    platformName: "Instagram",
    url: "https://www.instagram.com/mehedimehad",
  },
  {
    id: "portfolio",
    platformName: "Portfolio",
    url: "https://mehedihasanmehad.vercel.app",
  },
];

const socialIcons: Record<Platform, JSX.Element> = {
  GitHub: <GithubIcon className="w-5 h-5" />,
  LinkedIn: <LinkedinIcon className="w-5 h-5" />,
  Facebook: <Facebook className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
  YouTube: <Youtube className="w-5 h-5" />,
  Twitter: <TwitterIcon className="w-5 h-5" />,
  Portfolio: <GlobeIcon className="w-5 h-5" />,
};

export { socialMedias, socialIcons };
