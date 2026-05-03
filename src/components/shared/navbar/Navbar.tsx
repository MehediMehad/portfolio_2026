"use client";
import { useState } from "react";
import Link from "next/link";
import { DownloadIcon, MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import profile from "@/assets/images/MehediHasan.png";
import Image from "next/image";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/40 backdrop-blur supports-backdrop-filter:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left */}
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
          <div className="hidden sm:flex flex-col leading-none">
            <span className="text-sm font-semibold text-foreground">
              Md Mehedi Hasan
            </span>
            <span className="text-xs text-muted-foreground">
              FULL STACK DEVELOPER
            </span>
          </div>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center">
          <div className="rounded-full bg-[#0b1726]/80 px-3 py-1 flex items-center">
            <ul className="flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActiveLink(link.href)
                        ? "bg-[#07112a] text-primary shadow-[0_6px_18px_rgba(0,0,0,0.6)]"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT: NEW RESUME BUTTON */}
        <div className="hidden md:flex items-center">
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1gMs1zoSVF7rnndJHETWzrtn8ST-3wyfb/view?usp=sharing"
            className="group inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-300/60 hover:bg-purple-500/20 hover:shadow-[0_0_28px_rgba(168,85,247,0.45)] focus:outline-none focus:ring-2 focus:ring-purple-400/60"
          >
            <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute w-full">
          <ul className="flex flex-col px-4 py-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block text-lg font-medium ${
                    isActiveLink(link.href)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* MOBILE RESUME BUTTON */}
            <li className="pt-4">
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1zJx7UiMsPUJArwD0J3dtdy1fZCXDKDZ1/view?usp=sharing"
                className="group flex items-center justify-center gap-2 w-full rounded-full border border-purple-400/30 bg-purple-500/10 px-6 py-3 text-white font-semibold shadow-[0_0_18px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-500/20 hover:shadow-[0_0_28px_rgba(168,85,247,0.45)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <DownloadIcon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Resume</span>
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
