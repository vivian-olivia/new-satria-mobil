import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/tips/ArticleCard";
import { CalculatorCTABanner } from "@/components/tips/CalculatorCTABanner";
import { EmptyState } from "@/components/ui/EmptyState";
import { getAllArticles } from "@/lib/supabase/queries";

export const metadata: Metadata = {
  title: "Tips & Kredit",
  description:
    "Panduan seputar DP, cicilan, dan tips membeli atau menjual mobil bekas dari New Satria Mobil Surabaya.",
};

export default async function TipsPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <PageHero
        title="Tips & Edukasi Beli Mobil Bekas"
        description="Panduan DP, cicilan, dokumen kredit, dan tips membeli maupun menjual mobil bekas dari tim New Satria Mobil."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        <CalculatorCTABanner />

        {articles.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}
