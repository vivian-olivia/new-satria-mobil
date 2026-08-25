import Link from "next/link";
import {
  FacebookLogo,
  InstagramLogo,
  TiktokLogo,
  YoutubeLogo,
  MapPin,
  Phone,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { Logo } from "@/components/layout/Logo";
import { navItems } from "@/components/layout/nav-items";
import { categories } from "@/lib/data/categories";
import {
  siteConfig,
  buildWhatsAppLink,
  buildMapsLink,
  generalWhatsAppMessage,
} from "@/lib/config/site";

const socials = [
  { name: "Facebook", url: siteConfig.facebook.url, icon: FacebookLogo },
  { name: "Instagram", url: siteConfig.instagram.url, icon: InstagramLogo },
  { name: "TikTok", url: siteConfig.tiktok.url, icon: TiktokLogo },
  { name: "YouTube", url: siteConfig.youtube.url, icon: YoutubeLogo },
];

export function Footer() {
  return (
    <footer className="texture-grain relative overflow-hidden border-t border-white/10 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Showroom mobil dan truk bekas terpercaya di Surabaya sejak{" "}
              {siteConfig.foundedYear}. Jual, beli, dan tukar tambah mobil
              dan truk berkualitas dengan proses cepat.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  <social.icon weight="fill" size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white/50">
              Navigasi
            </h3>
            <ul className="mt-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-white/50">
              Kontak
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-red" />
                <span className="space-y-0.5">
                  {siteConfig.branches.map((branch) => (
                    <a
                      key={branch}
                      href={buildMapsLink(branch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:text-white hover:underline"
                    >
                      {branch}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon size={18} className="shrink-0 text-brand-red" />
                <a
                  href={buildWhatsAppLink(generalWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline"
                >
                  {siteConfig.whatsapp.displayNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={18} className="shrink-0 text-brand-red" />
                <a href={siteConfig.phone.telHref} className="hover:text-white hover:underline">
                  {siteConfig.phone.displayNumber}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={18} className="mt-0.5 shrink-0 text-brand-red" />
                <span className="space-y-0.5">
                  {siteConfig.hours.map((h) => (
                    <span key={h.day} className="block">
                      {h.day}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/katalog?kategori=${cat.slug}`}
              className="text-xs font-medium text-white/45 hover:text-white/80"
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-col-reverse items-center gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Melayani
            Surabaya sejak {siteConfig.foundedYear}.
          </p>
          <p>Semua harga dapat berubah sewaktu-waktu, hubungi kami untuk info terbaru.</p>
        </div>
      </div>
    </footer>
  );
}
