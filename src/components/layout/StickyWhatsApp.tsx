import { Phone } from "@phosphor-icons/react/dist/ssr";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink, generalWhatsAppMessage, siteConfig } from "@/lib/config/site";

export function StickyWhatsApp() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ink/10 bg-paper/95 p-3 backdrop-blur lg:hidden">
      <a
        href={siteConfig.phone.telHref}
        aria-label="Telepon showroom"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink"
      >
        <Phone weight="fill" size={20} />
      </a>
      <a
        href={buildWhatsAppLink(generalWhatsAppMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp font-semibold text-white active:scale-[0.98]"
      >
        <WhatsAppIcon size={20} />
        Chat WhatsApp Sekarang
      </a>
    </div>
  );
}
