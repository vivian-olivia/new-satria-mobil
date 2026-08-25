import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { ArticleCard } from "@/components/tips/ArticleCard";
import { CalculatorCTABanner } from "@/components/tips/CalculatorCTABanner";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { formatDateID, splitParagraphs } from "@/lib/utils/format";
import { articleWhatsAppMessage } from "@/lib/config/site";
import { getArticleBySlug, getRelatedArticles, getAllArticles } from "@/lib/supabase/queries";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article, 3);
  const paragraphs = splitParagraphs(article.body);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <nav className="mb-5 text-sm text-ink/50">
        <Link href="/tips" className="hover:text-ink">
          Tips &amp; Kredit
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink/70">{article.title}</span>
      </nav>

      <span className="inline-block rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
        {article.category}
      </span>
      <p className="mt-3 text-sm text-ink/40">{formatDateID(article.createdAt)}</p>

      <h1 className="mt-2 font-display text-2xl font-extrabold leading-tight text-ink sm:text-4xl">
        {article.title}
      </h1>

      {article.youtubeUrl && (
        <div className="mt-6">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink/50">
            <YoutubeLogo size={16} weight="fill" className="text-brand-red" />
            Video Pilihan
          </p>
          <YouTubeEmbed url={article.youtubeUrl} title={article.title} />
          <p className="mt-2 text-xs text-ink/40">
            Video eksternal, dikurasi oleh tim New Satria Mobil — bukan produksi kami sendiri.
          </p>
        </div>
      )}

      <div className="mt-6 space-y-4 leading-relaxed text-ink/75">
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <div className="mt-10">
        {article.category === "Kredit & Pembiayaan" ? (
          <CalculatorCTABanner />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-ink/10 bg-white p-6 text-center">
            <p className="text-sm text-ink/60">
              Ada pertanyaan seputar artikel ini? Tim kami siap membantu.
            </p>
            <WhatsAppButton message={articleWhatsAppMessage(article.title)} label="Tanya via WhatsApp" />
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="font-display text-xl font-extrabold text-ink">Artikel Terkait</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
