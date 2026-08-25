"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  MapPin,
  ClipboardText,
  CreditCard,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

const reasons = [
  {
    icon: ShieldCheck,
    title: "Legalitas Aman",
    description:
      "BPKB dan STNK asli, setiap unit diverifikasi sebelum sampai ke tangan Anda.",
  },
  {
    icon: MapPin,
    title: `${siteConfig.branches.length} Cabang di Surabaya`,
    description:
      "Showroom tersebar di berbagai lokasi, mudah dijangkau dari mana saja di Surabaya.",
  },
  {
    icon: ClipboardText,
    title: "Riwayat & Kondisi Transparan",
    description:
      "Setiap unit diperiksa menyeluruh dengan riwayat servis yang jelas, tanpa ditutup-tutupi.",
  },
  {
    icon: CreditCard,
    title: "Cash & Kredit Fleksibel",
    description:
      "Bayar tunai atau ajukan kredit dengan simulasi cicilan sesuai kebutuhan Anda.",
  },
];

export function WhyUsSection() {
  return (
    <section className="texture-grain relative overflow-hidden bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Kenapa Pilih New Satria Mobil
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-white/65">
            Sejak {siteConfig.foundedYear}, kami membantu warga Surabaya
            mendapatkan mobil dan truk bekas berkualitas lewat proses jujur
            dan transparan.
          </p>
        </motion.div>

        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={item}
              className="rounded-xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.09]"
            >
              <reason.icon
                size={28}
                weight="regular"
                className="text-brand-red-light"
              />
              <p className="mt-4 font-display text-lg font-bold text-white">
                {reason.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
