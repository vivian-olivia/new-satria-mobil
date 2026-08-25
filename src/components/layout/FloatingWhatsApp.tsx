import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppLink, generalWhatsAppMessage } from "@/lib/config/site";

export function FloatingWhatsApp() {
  return (
    <div className="group fixed bottom-[92px] right-4 z-50 lg:bottom-6 lg:right-6">
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-ink px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
        Chat via WhatsApp
      </span>
      <a
        href={buildWhatsAppLink(generalWhatsAppMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat via WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:bg-whatsapp-dark active:scale-95"
      >
        <WhatsAppIcon size={30} />
      </a>
    </div>
  );
}
