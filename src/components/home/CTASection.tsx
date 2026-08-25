"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { generalWhatsAppMessage } from "@/lib/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-ink pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="texture-grain relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-red via-brand-red-dark to-ink px-6 py-14 text-center sm:px-12 sm:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_55%)]"
          />

          <div className="relative">
            <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-4xl">
              Siap Dapatkan Mobil Impian Anda?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Tim kami siap membantu Anda menemukan unit yang tepat, hari ini
              juga.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WhatsAppButton
                message={generalWhatsAppMessage}
                label="Chat via WhatsApp"
                size="lg"
              />
              <Link
                href="/katalog"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-white/40 px-7 text-base font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/10"
              >
                Lihat Katalog
                <ArrowRight size={18} weight="bold" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
