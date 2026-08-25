import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { updateArticleAction } from "@/lib/actions/articles";
import { getArticleById } from "@/lib/supabase/queries";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Artikel",
};

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) notFound();

  const boundAction = updateArticleAction.bind(null, id);

  return (
    <div>
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Kembali ke Tips & Artikel
      </Link>

      <h1 className="mt-3 line-clamp-1 font-display text-2xl font-extrabold text-ink">
        {article.title}
      </h1>

      <div className="mt-6 max-w-3xl">
        <ArticleForm action={boundAction} article={article} />
      </div>
    </div>
  );
}
