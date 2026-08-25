import { Star } from "@phosphor-icons/react/dist/ssr";
import type { Testimonial } from "@/lib/types";

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Kata Pelanggan Kami
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="flex flex-col rounded-2xl border border-ink/10 bg-white p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    weight="fill"
                    size={16}
                    className={i < t.rating ? "text-amber-400" : "text-ink/15"}
                  />
                ))}
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-4 border-t border-ink/10 pt-3">
                <p className="text-sm font-bold text-ink">{t.customerName}</p>
                {t.vehiclePurchased && (
                  <p className="text-xs text-ink/50">{t.vehiclePurchased}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
