import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { createArticleAction } from "@/lib/actions/articles";

export const metadata: Metadata = {
  title: "Tambah Artikel",
};

export default function NewArticlePage() {
  return (
    <div>
      <Link
        href="/admin/articles"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/50 hover:text-ink"
      >
        <ArrowLeft size={16} />
        Kembali ke Tips & Artikel
      </Link>

      <h1 className="mt-3 font-display text-2xl font-extrabold text-ink">Tambah Artikel</h1>

      <div className="mt-6 max-w-3xl">
        <ArticleForm action={createArticleAction} />
      </div>
    </div>
  );
}
