import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col pb-[76px] lg:pb-0">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyWhatsApp />
      <FloatingWhatsApp />
    </div>
  );
}
