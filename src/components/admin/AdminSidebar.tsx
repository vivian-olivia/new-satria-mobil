"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquaresFour, Car, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils/format";

const links = [
  { href: "/admin", label: "Dashboard", icon: SquaresFour, exact: true },
  { href: "/admin/vehicles", label: "Kendaraan", icon: Car, exact: false },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon size={18} weight={active ? "fill" : "regular"} />
            {label}
          </Link>
        );
      })}

      <Link
        href="/"
        target="_blank"
        className="mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
      >
        <ArrowSquareOut size={18} />
        Lihat Situs
      </Link>
    </nav>
  );
}
