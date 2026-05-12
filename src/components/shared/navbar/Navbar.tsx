"use client";

import { useState } from "react";
import { DownloadIcon, MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import profile from "@/assets/images/MehediHasan.png";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/40 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
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
        </Link>

        <div className="hidden md:flex items-center">
          <div className="rounded-full bg-[#0b1726]/80 px-3 py-1 flex items-center">
            <ul className="flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    aria-label={`Desktop navigation ${link.name}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActiveLink(link.href)
                        ? "bg-primary text-black shadow-[0_6px_18px_rgba(0,0,0,0.6)]"
                        : "text-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hidden md:flex items-center">
          <Link
            target="_blank"
            href="https://drive.google.com/file/d/1gMs1zoSVF7rnndJHETWzrtn8ST-3wyfb/view?usp=sharing"
            className="group inline-flex items-center gap-2 rounded-full border border-purple-400/60 bg-purple-600 px-5 py-2 text-sm font-semibold text-white"
          >
            <DownloadIcon className="h-4 w-4" />
            <span>Resume</span>
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        navLinks={navLinks}
        pathname={pathname}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
