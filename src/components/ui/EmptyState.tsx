import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { generalWhatsAppMessage } from "@/lib/config/site";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-ink/10 bg-white px-6 py-16 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-paper-dim text-ink/35">
        <MagnifyingGlass size={24} weight="light" />
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-ink">
        Belum ada unit yang cocok
      </h3>
      <p className="mt-1.5 max-w-sm text-sm text-ink/60">
        Coba ubah filter pencarian Anda, atau hubungi kami langsung, unit baru
        sering masuk setiap minggu.
      </p>
      <WhatsAppButton
        message={generalWhatsAppMessage}
        label="Tanya Unit ke Kami"
        className="mt-5"
      />
    </div>
  );
}
