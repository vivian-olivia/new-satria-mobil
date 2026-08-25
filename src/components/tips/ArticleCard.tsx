import Link from "next/link";
import { YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import type { Article } from "@/lib/types";
import { formatDateID } from "@/lib/utils/format";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-10px_rgba(11,14,20,0.18)]">
      <Link
        href={`/tips/${article.slug}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-paper-dim"
      >
        <ImagePlaceholder
          seed={article.id}
          label={article.category}
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-ink/75 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-md">
          {article.category}
        </span>
        {article.youtubeUrl && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <YoutubeLogo size={14} weight="fill" />
            Video
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/tips/${article.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-brand-red">
            {article.title}
          </h3>
        </Link>

        <p className="mt-1.5 line-clamp-2 text-sm text-ink/60">{article.excerpt}</p>

        <p className="mt-3 text-xs text-ink/40">{formatDateID(article.createdAt)}</p>

        <Link
          href={`/tips/${article.slug}`}
          className="mt-4 flex h-10 items-center justify-center rounded-full border border-ink/15 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}
