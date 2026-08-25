"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { List, X, ArrowUpRight } from "@phosphor-icons/react";
import { navItems } from "@/components/layout/nav-items";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { generalWhatsAppMessage, siteConfig } from "@/lib/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buka menu"
        className="flex h-11 w-11 items-center justify-center rounded-lg text-white"
      >
        <List size={26} weight="bold" />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.button
                  type="button"
                  aria-label="Tutup menu"
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: EASE }}
                />

                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu navigasi"
                  className="texture-grain fixed inset-y-0 right-0 z-50 flex w-[min(86vw,380px)] flex-col overflow-hidden bg-ink text-white shadow-2xl"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-brand-red-light via-brand-red to-transparent"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand-red/10 blur-3xl"
                  />

                  <div className="relative flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
                    <span className="font-logo text-xs italic font-black uppercase tracking-[0.2em] text-white/50">
                      Menu
                    </span>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Tutup menu"
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                    >
                      <X size={22} weight="bold" />
                    </button>
                  </div>

                  <nav className="relative flex flex-1 flex-col justify-center gap-1 px-5">
                    {navItems.map((item, i) => {
                      const active =
                        item.href === "/"
                          ? pathname === "/"
                          : pathname?.startsWith(item.href);
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.4,
                            delay: 0.15 + i * 0.05,
                            ease: EASE,
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={`group flex items-center justify-between border-b border-white/10 py-4 font-display text-2xl font-extrabold transition-colors ${
                              active ? "text-brand-red-light" : "text-white"
                            }`}
                          >
                            {item.label}
                            <ArrowUpRight
                              size={20}
                              weight="bold"
                              className="text-white/25 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-red-light"
                            />
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.35, ease: EASE }}
                    className="relative flex flex-col gap-3 border-t border-white/10 p-5"
                  >
                    <WhatsAppButton
                      message={generalWhatsAppMessage}
                      size="lg"
                      className="w-full"
                    />
                    <a
                      href={siteConfig.phone.telHref}
                      className="text-center text-sm text-white/60 transition-colors hover:text-white"
                    >
                      atau telepon {siteConfig.phone.displayNumber}
                    </a>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
