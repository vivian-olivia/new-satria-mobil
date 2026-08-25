import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { MobileNav } from "@/components/layout/MobileNav";
import { navItems } from "@/components/layout/nav-items";

export function Header() {
  return (
    <header className="sticky top-0 z-40 h-16 border-b border-white/10 bg-ink/95 shadow-[0_1px_0_rgba(0,0,0,0.2)] backdrop-blur-md">
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6">
        <Logo dark />

        <nav className="hidden items-center gap-7 justify-self-center lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-white/75 transition-colors hover:text-brand-red-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="justify-self-end">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
