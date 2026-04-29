import { Platform } from "@/types";
import { ElementType } from "react";
import {
    FacebookIcon,
    GithubIcon,
    GlobeIcon,
    Instagram,
    LinkedinIcon,
} from "lucide-react";

type TSocialMedias = {
    platformName: Platform;
    url: string;
    icon: ElementType;
};

export const socialMedias: TSocialMedias[] = [
    {
        platformName: "GitHub",
        url: "https://github.com/MehediMehad",
        icon: GithubIcon,
    },
    {
        platformName: "LinkedIn",
        url: "https://www.linkedin.com/in/mehedimehad",
        icon: LinkedinIcon,
    },
    {
        platformName: "Facebook",
        url: "https://www.facebook.com/mehedimehad",
        icon: FacebookIcon,
    },
    {
        platformName: "Instagram",
        url: "https://www.instagram.com/mehedimehad",
        icon: Instagram,
    },
    {
        platformName: "Portfolio",
        url: "https://mehedihasanmehad.vercel.app",
        icon: GlobeIcon,
    },
] as const;