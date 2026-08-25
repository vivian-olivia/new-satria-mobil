import type { Metadata } from "next";
import { Manrope, Saira } from "next/font/google";
import { MotionConfig } from "motion/react";
import "./globals.css";
import { siteConfig } from "@/lib/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// FX Neofara Black Italic is a paid font — Saira Black Italic is the closest
// free alternative: a bold, slanted display face with the same aggressive feel.
const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["800", "900"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${manrope.variable} ${saira.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased pb-[76px] lg:pb-0">
        <MotionConfig reducedMotion="user">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyWhatsApp />
          <FloatingWhatsApp />
        </MotionConfig>
      </body>
    </html>
  );
}
