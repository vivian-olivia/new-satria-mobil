import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { cn } from "@/lib/utils/format";
import { buildWhatsAppLink } from "@/lib/config/site";

interface WhatsAppButtonProps {
  message: string;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses: Record<NonNullable<WhatsAppButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-14 px-7 text-base gap-2.5",
};

const iconSize: Record<NonNullable<WhatsAppButtonProps["size"]>, number> = {
  sm: 16,
  md: 18,
  lg: 22,
};

export function WhatsAppButton({
  message,
  label = "Chat WhatsApp",
  className,
  size = "md",
}: WhatsAppButtonProps) {
  const href = buildWhatsAppLink(message);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-whatsapp font-semibold text-white transition-transform active:scale-[0.98] hover:bg-whatsapp-dark",
        sizeClasses[size],
        className
      )}
    >
      <WhatsAppIcon size={iconSize[size]} />
      {label}
    </a>
  );
}
