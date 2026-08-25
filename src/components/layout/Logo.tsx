import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 shrink-0"
      aria-label="New Satria Mobil — Beranda"
    >
      <span className="relative h-9 w-[54px] shrink-0 overflow-hidden rounded-lg">
        <Image
          src="/logo.png"
          alt="New Satria Mobil"
          fill
          sizes="54px"
          className="object-cover"
          priority
        />
      </span>
      <span className="font-logo text-[15px] italic font-black leading-tight tracking-tight sm:text-base">
        <span className="text-brand-red-light">NEW SATRIA</span>
        <span className={dark ? "text-white" : "text-ink"}> MOBIL</span>
      </span>
    </Link>
  );
}
