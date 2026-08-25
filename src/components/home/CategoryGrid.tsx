import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function CategoryGrid() {
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Cari Berdasarkan Kategori
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/katalog?kategori=${cat.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink"
            >
              <ImagePlaceholder
                seed={cat.slug}
                label=""
                iconSize={30}
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/15 sm:inset-x-4 sm:bottom-4 sm:p-3.5">
                <p className="font-display text-lg font-extrabold text-white sm:text-xl">
                  {cat.label}
                </p>
                <p className="mt-0.5 text-xs text-white/70">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
