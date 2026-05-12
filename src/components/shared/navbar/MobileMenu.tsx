"use client";

import { DownloadIcon } from "lucide-react";
import Link from "next/link";

type NavLink = {
  name: string;
  href: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  navLinks: NavLink[];
  pathname: string;
  onClose: () => void;
};

const MobileMenu = ({
  isOpen,
  navLinks,
  pathname,
  onClose,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  const isActiveLink = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div className="md:hidden border-t border-border bg-[#071120]/95 backdrop-blur-lg px-4 py-6 animate-in slide-in-from-top duration-500">
      <ul className="flex flex-col gap-3">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              onClick={onClose}
              aria-label={`Mobile menu ${link.name}`}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActiveLink(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <Link
        target="_blank"
        rel="noopener noreferrer"
        href="https://drive.google.com/file/d/1gMs1zoSVF7rnndJHETWzrtn8ST-3wyfb/view?usp=sharing"
        aria-label="Open resume in Google Drive"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-purple-400/30 bg-purple-500/10 px-5 py-3 text-sm font-semibold text-white"
      >
        <DownloadIcon className="h-4 w-4" />
        Resume
      </Link>
    </div>
  );
};

export default MobileMenu;
