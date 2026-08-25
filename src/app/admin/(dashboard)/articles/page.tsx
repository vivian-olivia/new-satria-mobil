import type { Metadata } from "next";
import Link from "next/link";
import { Plus, PencilSimple, Star } from "@phosphor-icons/react/dist/ssr";
import { getAllArticlesAdmin } from "@/lib/supabase/queries";
import { formatDateID } from "@/lib/utils/format";
import { DeleteArticleButton } from "@/components/admin/DeleteArticleButton";

export const metadata: Metadata = {
  title: "Tips & Artikel",
};

export default async function AdminArticlesPage() {
  const articles = await getAllArticlesAdmin();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink">Tips & Artikel</h1>
          <p className="mt-1 text-sm text-ink/60">{articles.length} artikel di database.</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex h-10 items-center gap-2 rounded-xl bg-brand-red px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark"
        >
          <Plus size={16} weight="bold" />
          Tambah Artikel
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs font-semibold uppercase tracking-wide text-ink/40">
              <th className="px-5 py-3">Judul</th>
              <th className="px-5 py-3">Kategori</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Tanggal</th>
              <th className="px-5 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/8">
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-ink/50">
                  Belum ada artikel. Klik &quot;Tambah Artikel&quot; untuk mulai.
                </td>
              </tr>
            )}
            {articles.map((article) => (
              <tr key={article.id} className="align-middle">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2 font-medium text-ink">
                    {article.featured && (
                      <Star size={14} weight="fill" className="shrink-0 text-brand-red" />
                    )}
                    <span className="line-clamp-1">{article.title}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-ink/70">{article.category}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      article.published
                        ? "bg-brand-blue-soft text-brand-blue"
                        : "bg-paper-dim text-ink/50"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3 text-ink/70">{formatDateID(article.createdAt)}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/admin/articles/${article.id}/edit`}
                      aria-label={`Edit ${article.title}`}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-ink/40 transition-colors hover:bg-paper-dim hover:text-ink"
                    >
                      <PencilSimple size={16} />
                    </Link>
                    <DeleteArticleButton id={article.id} title={article.title} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
