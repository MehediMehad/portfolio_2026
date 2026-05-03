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
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Left: Avatar + Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center  ring-1 ring-white/10">
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

        {/* Center: pill nav on desktop */}
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
                        : "text-muted-foreground hover:text-primary hover:bg-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Resume button (desktop) - restored original style */}
        <div className="hidden md:flex items-center">
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1gMs1zoSVF7rnndJHETWzrtn8ST-3wyfb/view?usp=sharing"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-[0_0_15px_rgba(28,199,105,0.3)]"
          >
            Resume
            <DownloadIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <XIcon className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t-2 border-border bg-background absolute w-full">
          <ul className="flex flex-col px-4 py-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block text-lg font-medium transition-colors duration-300 ${
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
            <li className="pt-4">
              <a
                target="_blank"
                href="https://drive.google.com/file/d/1zJx7UiMsPUJArwD0J3dtdy1fZCXDKDZ1/view?usp=sharing"
                className="block text-center w-full px-6 py-3 rounded-md border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
