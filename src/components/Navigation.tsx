"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Me", href: "/#hero-section" },
  { label: "About", href: "/#about-section" },
  { label: "Education", href: "/#education-section" },
  { label: "Experience", href: "/#experience-section" },
  { label: "Projects", href: "/#projects-section" },
  { label: "Blog", href: "/blog" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/blog") return pathname === "/blog" || pathname.startsWith("/blog/");
  if (href === "/#hero-section") return pathname === "/";
  return false;
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#faf8ff] shadow-[0px_20px_40px_rgba(25,27,33,0.04)]">
      <div className="flex justify-between items-center px-12 py-6 max-w-[1920px] mx-auto">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-['Noto_Serif'] font-bold text-2xl tracking-tighter text-[#191b21]"
        >
          Diego Rodriguez
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => {
            const active = isActive(link.href, pathname);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  active
                    ? "font-['Noto_Serif'] text-lg tracking-tight text-[#003c73] border-b-2 border-[#003c73] pb-1"
                    : "font-['Noto_Serif'] text-lg tracking-tight text-[#191b21]/60 hover:text-[#003c73] transition-colors duration-300 ease-in-out hover:opacity-80"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Connect CTA */}
        <Link
          href="/#contact-section"
          className="hidden md:inline-block bg-[#003c73] text-white px-8 py-2 text-sm font-medium tracking-wide transition-all hover:bg-[#00539c] rounded-lg"
        >
          Connect
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#191b21]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#faf8ff] border-t border-[#c2c6d3]/30 px-12 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-['Noto_Serif'] text-lg text-[#191b21]/60 hover:text-[#003c73]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact-section"
            className="bg-[#003c73] text-white px-6 py-2 text-sm font-medium text-center rounded-lg"
            onClick={() => setMenuOpen(false)}
          >
            Connect
          </Link>
        </div>
      )}
    </nav>
  );
}
