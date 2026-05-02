"use client";
import { useState } from "react";
import Link from "next/link";
import { DownloadIcon, MenuIcon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Projects",
      href: "/projects",
    },
    {
      name: "Blogs",
      href: "/blogs",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-3xl font-extrabold text-primary drop-shadow-[0_0_12px_rgba(28,199,105,0.6)] group-hover:drop-shadow-[0_0_16px_rgba(28,199,105,0.9)] transition-all duration-300">
            M
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`border-b-2 pb-2 text-sm font-medium transition-colors duration-300 ${
                    isActiveLink(link.href)
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
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
