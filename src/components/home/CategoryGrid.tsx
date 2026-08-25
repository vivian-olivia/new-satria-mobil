import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data/categories";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

const categoryImages: Record<string, string> = {
  suv: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Mitsubishi_Pajero_Sport_%283rd_generation%29_1X7A0409.jpg/330px-Mitsubishi_Pajero_Sport_%283rd_generation%29_1X7A0409.jpg",
  mpv: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2022_Toyota_Avanza_1.5_G_Toyota_Safety_Sense_W101RE_%2820220403%29.jpg/330px-2022_Toyota_Avanza_1.5_G_Toyota_Safety_Sense_W101RE_%2820220403%29.jpg",
  "double-cabin": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg/330px-2016_Toyota_HiLux_Invincible_D-4D_4WD_2.4_Front.jpg",
  truck: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Fuso_Canter_3C13%2C_8th_Generation.jpg/330px-Fuso_Canter_3C13%2C_8th_Generation.jpg",
  hiace: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/2020_Toyota_HiAce_%28front%29.jpg/330px-2020_Toyota_HiAce_%28front%29.jpg",
  fortuner: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/2018_Toyota_Fortuner_2.4_VRZ_4x2_wagon_%28GUN165R%3B_02-18-2019%29%2C_South_Tangerang.jpg/330px-2018_Toyota_Fortuner_2.4_VRZ_4x2_wagon_%28GUN165R%3B_02-18-2019%29%2C_South_Tangerang.jpg",
  vellfire: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/2018-2023_Toyota_Alphard_X.jpg/330px-2018-2023_Toyota_Alphard_X.jpg",
  innova: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Toyota_Innova_Zenix_2.0_V_%28III%29_%E2%80%93_f_22032025.jpg/330px-Toyota_Innova_Zenix_2.0_V_%28III%29_%E2%80%93_f_22032025.jpg",
};

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
              {categoryImages[cat.slug] ? (
                <Image
                  src={categoryImages[cat.slug]}
                  alt={cat.label}
                  fill
                  unoptimized
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <ImagePlaceholder
                  seed={cat.slug}
                  label=""
                  iconSize={30}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
              )}
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
