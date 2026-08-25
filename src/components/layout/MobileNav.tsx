"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { navItems } from "@/components/layout/nav-items";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { generalWhatsAppMessage, siteConfig } from "@/lib/config/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
      >
        <List size={26} weight="bold" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-ink text-white">
          <div className="flex h-16 items-center justify-between px-4">
            <span className="font-display text-base font-extrabold">MENU</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg"
            >
              <X size={26} weight="bold" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-2xl font-bold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3 p-6">
            <WhatsAppButton
              message={generalWhatsAppMessage}
              size="lg"
              className="w-full"
            />
            <a
              href={siteConfig.phone.telHref}
              className="text-center text-sm text-white/70"
            >
              atau telepon {siteConfig.phone.displayNumber}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
