"use client";

import { useState } from "react";
import { MapPin, X } from "@phosphor-icons/react/dist/ssr";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import {
  buildMapsLink,
  buildWhatsAppLink,
  generalWhatsAppMessage,
  siteConfig,
} from "@/lib/config/site";

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[92px] right-4 z-50 flex flex-col items-end gap-3 lg:bottom-6 lg:right-6">
      {open && (
        <div className="w-72 overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-xl sm:w-80">
          <div className="flex items-center justify-between bg-whatsapp px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <WhatsAppIcon size={22} />
              <span className="font-semibold">New Satria Mobil</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup"
              className="flex h-7 w-7 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          <div className="space-y-3 px-4 py-4 text-sm text-ink">
            <p className="font-semibold">Buy / Sell / Trade in (Cash & Credit)</p>
            <p>📩 Price by WA/Call 📲</p>

            <div className="flex gap-2 border-t border-ink/10 pt-3 text-ink/70">
              <MapPin weight="fill" size={18} className="mt-0.5 shrink-0 text-whatsapp-dark" />
              <ul className="space-y-1">
                {siteConfig.branches.map((address) => (
                  <li key={address}>
                    <a
                      href={buildMapsLink(address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ink hover:underline"
                    >
                      {address}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <a
            href={buildWhatsAppLink(generalWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-whatsapp px-4 py-3 font-semibold text-white transition-colors hover:bg-whatsapp-dark"
          >
            <WhatsAppIcon size={18} />
            Chat via WhatsApp
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup info WhatsApp" : "Buka info WhatsApp"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:bg-whatsapp-dark active:scale-95"
      >
        {open ? <X size={26} weight="bold" /> : <WhatsAppIcon size={30} />}
      </button>
    </div>
  );
}
