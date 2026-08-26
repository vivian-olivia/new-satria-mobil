"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  ArrowRight,
  Car,
  ShieldCheck,
  SteeringWheel,
  Tag,
} from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/config/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const copyContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const featuresContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
  },
};

const featureItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function Hero() {
  const [yearsStat, soldStat] = siteConfig.stats;

  const highlights = [
    { icon: Car, title: yearsStat.value, description: yearsStat.label },
    { icon: SteeringWheel, title: soldStat.value, description: soldStat.label },
    {
      icon: ShieldCheck,
      title: "Kualitas Terjamin",
      description: "Mobil & Truk terbaik",
    },
    {
      icon: Tag,
      title: "Harga Kompetitif",
      description: "Terbaik di kelasnya",
    },
  ];

  return (
    <section className="texture-grain relative overflow-hidden bg-ink text-white">
      <div className="relative flex min-h-[calc(100dvh-4rem)] flex-col">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Showroom New Satria Mobil"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Overlays: darken the whole frame for AA text contrast, with an
            extra left-side wash so the copy block always sits on a dark
            base regardless of what's behind it in the photo. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-ink/55"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,14,20,0.95)_0%,rgba(11,14,20,0.75)_28%,rgba(11,14,20,0.25)_58%,rgba(11,14,20,0.15)_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(11,14,20,0.35)_0%,rgba(11,14,20,0)_18%,rgba(11,14,20,0.2)_65%,rgba(11,14,20,0.95)_100%)]"
        />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 py-14 sm:px-6 sm:py-20">
          <motion.div
            className="max-w-2xl"
            variants={copyContainer}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={copyItem}
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-red-soft"
            >
              Showroom Mobil Bekas &middot; Sejak{" "}
              {siteConfig.foundedYear}
            </motion.p>

            <motion.h1
              variants={copyItem}
              className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl"
            >
              Mobil Bekas
              <br />
              <span className="text-white">
                Terpercaya
                <br />
                di <span className="text-brand-red-soft">Surabaya</span>
              </span>
            </motion.h1>

            <motion.p
              variants={copyItem}
              className="mt-4 max-w-md text-base leading-relaxed text-white/80 sm:text-lg"
            >
              Beli, jual, atau tukar tambah mobil dan truk bekas berkualitas
              dengan proses cepat, transparan, dan terpercaya di showroom
              kami.
            </motion.p>

            <motion.div
              variants={copyItem}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/katalog"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-red px-7 font-semibold text-white transition-colors hover:bg-brand-red-dark"
                >
                  Lihat Katalog
                  <ArrowRight size={18} weight="bold" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/jual-tukar-tambah"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-7 font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/10"
                >
                  Jual Mobil Anda
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-6 border-t border-white/15 pt-8 sm:mt-12 lg:grid-cols-4 lg:gap-6"
            variants={featuresContainer}
            initial="hidden"
            animate="show"
          >
            {highlights.map((item) => (
              <motion.div
                key={item.title}
                variants={featureItem}
                className="flex items-center gap-4"
              >
                <item.icon
                  size={30}
                  weight="regular"
                  className="shrink-0 text-white/70"
                />
                <div>
                  <p className="text-base font-semibold text-white sm:text-lg">
                    {item.title}
                  </p>
                  <p className="text-sm text-white/55">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
