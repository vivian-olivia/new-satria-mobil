"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Clock,
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils/format";
import { buildMapsLink, siteConfig } from "@/lib/config/site";

/**
 * Clicking a branch address only swaps the embedded map (no navigation);
 * clicking the map itself opens that branch in Google Maps in a new tab.
 */
export function ContactInfo() {
  const [selectedBranch, setSelectedBranch] = useState<string>(
    siteConfig.branches[0]
  );
  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    selectedBranch
  )}&output=embed`;

  return (
    <>
      <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-ink">
          Informasi Showroom
        </h2>
        <ul className="mt-6 space-y-5 text-sm text-ink/70">
          <li className="flex items-start gap-3">
            <MapPin size={20} className="mt-0.5 shrink-0 text-brand-red" />
            <span className="space-y-1">
              {siteConfig.branches.map((branch) => (
                <button
                  key={branch}
                  type="button"
                  onClick={() => setSelectedBranch(branch)}
                  className={cn(
                    "block text-left transition-colors hover:text-brand-red",
                    branch === selectedBranch && "font-semibold text-ink"
                  )}
                >
                  {branch}
                </button>
              ))}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <Phone size={20} className="shrink-0 text-brand-red" />
            <a href={siteConfig.phone.telHref} className="hover:text-ink">
              {siteConfig.phone.displayNumber}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <EnvelopeSimple size={20} className="shrink-0 text-brand-red" />
            <a href={`mailto:${siteConfig.email}`} className="hover:text-ink">
              {siteConfig.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <Clock size={20} className="mt-0.5 shrink-0 text-brand-red" />
            <span className="space-y-0.5">
              {siteConfig.hours.map((h) => (
                <span key={h.day} className="block">
                  {h.day}: {h.time}
                </span>
              ))}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <FacebookLogo size={20} className="shrink-0 text-brand-red" />
            <a
              href={siteConfig.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              {siteConfig.facebook.handle}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <InstagramLogo size={20} className="shrink-0 text-brand-red" />
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              {siteConfig.instagram.handle}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <TiktokLogo size={20} className="shrink-0 text-brand-red" />
            <a
              href={siteConfig.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              {siteConfig.tiktok.handle}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <YoutubeLogo size={20} className="shrink-0 text-brand-red" />
            <a
              href={siteConfig.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              {siteConfig.youtube.handle}
            </a>
          </li>
        </ul>

        <div className="mt-8">
          <WhatsAppButton
            message="Halo New Satria Mobil, saya ingin bertanya."
            className="w-full"
            size="lg"
          />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-ink/10">
        <iframe
          key={selectedBranch}
          src={mapEmbedSrc}
          title={`Lokasi ${selectedBranch}`}
          className="h-full min-h-[320px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={buildMapsLink(selectedBranch)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buka lokasi ${selectedBranch} di Google Maps`}
          className="absolute inset-0"
        />
      </div>
    </>
  );
}
