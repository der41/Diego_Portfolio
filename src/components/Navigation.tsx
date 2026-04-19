"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Me", href: "/#me" },
  { label: "About", href: "/#about" },
  { label: "Education", href: "/#education" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#project" },
  { label: "Blog", href: "/blog" },
];

const NAV_OFFSET_PX = 140;

function getSectionId(href: string) {
  return href.includes("#") ? href.split("#")[1] : "";
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("me");
  const pathname = usePathname() ?? "/";

  useEffect(() => {
    if (pathname !== "/") return;

    const updateActiveSection = () => {
      const navHeight =
        document.querySelector("nav")?.getBoundingClientRect().height ?? NAV_OFFSET_PX;
      const activationLine = navHeight + 24;
      let nextActiveSection = "me";

      for (const link of navLinks) {
        const section = document.getElementById(getSectionId(link.href));
        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= activationLine && rect.bottom >= activationLine) {
          nextActiveSection = section.id;
          break;
        }

        if (rect.top <= activationLine) {
          nextActiveSection = section.id;
        }
      }

      setActiveSection(nextActiveSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateActiveSection);
    };
  }, [pathname]);

  const getLinkClassName = (href: string) => {
    const isActive =
      href === "/blog"
        ? pathname === "/blog" || pathname.startsWith("/blog/")
        : pathname === "/" && activeSection === getSectionId(href);

    return isActive
      ? "font-['Noto_Serif'] text-lg tracking-tight text-[#003c73] border-b-2 border-[#003c73] pb-1"
      : "font-['Noto_Serif'] text-lg tracking-tight text-[#191b21]/60 hover:text-[#003c73] transition-colors duration-300 ease-in-out hover:opacity-80";
  };

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
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={getLinkClassName(link.href)}
              onClick={() => {
                if (link.href !== "/blog") setActiveSection(getSectionId(link.href));
              }}
            >
              {link.label}
            </Link>
          ))}
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
              className={getLinkClassName(link.href)}
              onClick={() => {
                if (link.href !== "/blog") setActiveSection(getSectionId(link.href));
                setMenuOpen(false);
              }}
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
