"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { navItems } from "@/components/layout/nav-items";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 h-16 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/95 shadow-[0_1px_0_rgba(0,0,0,0.2)] backdrop-blur-md"
          : "border-b border-transparent bg-[#0a0e13]"
      }`}
    >
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo dark />

        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/75 transition-colors hover:text-brand-red-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
