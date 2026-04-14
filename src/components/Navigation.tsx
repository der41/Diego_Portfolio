"use client";

import { useState } from "react";

const navLinks = [
  { label: "Me", href: "#hero-section", active: true },
  { label: "About", href: "#about-section" },
  { label: "Education", href: "#education-section" },
  { label: "Experience", href: "#experience-section" },
  { label: "Projects", href: "#projects-section" },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#faf8ff] shadow-[0px_20px_40px_rgba(25,27,33,0.04)]">
      <div className="flex justify-between items-center px-12 py-6 max-w-[1920px] mx-auto">
        {/* Wordmark */}
        <div className="font-['Noto_Serif'] font-bold text-2xl tracking-tighter text-[#191b21]">
          Diego Rodriguez
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-12 items-center">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.active
                  ? "font-['Noto_Serif'] text-lg tracking-tight text-[#003c73] border-b-2 border-[#003c73] pb-1"
                  : "font-['Noto_Serif'] text-lg tracking-tight text-[#191b21]/60 hover:text-[#003c73] transition-colors duration-300 ease-in-out hover:opacity-80"
              }
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Connect CTA */}
        <a
          href="#contact-section"
          className="hidden md:inline-block bg-[#003c73] text-white px-8 py-2 text-sm font-medium tracking-wide transition-all hover:bg-[#00539c] rounded-lg"
        >
          Connect
        </a>

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
            <a
              key={link.label}
              href={link.href}
              className="font-['Noto_Serif'] text-lg text-[#191b21]/60 hover:text-[#003c73]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact-section"
            className="bg-[#003c73] text-white px-6 py-2 text-sm font-medium text-center rounded-lg"
            onClick={() => setMenuOpen(false)}
          >
            Connect
          </a>
        </div>
      )}
    </nav>
  );
}
