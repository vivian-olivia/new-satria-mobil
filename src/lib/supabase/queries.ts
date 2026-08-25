import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  vehicles as localVehicles,
  getFeaturedVehicles as getLocalFeatured,
  getVehicleBySlug as getLocalBySlug,
  getRelatedVehicles as getLocalRelated,
} from "@/lib/data/vehicles";
import {
  getPublishedArticles as getLocalPublishedArticles,
  getFeaturedArticles as getLocalFeaturedArticles,
  getArticleBySlug as getLocalArticleBySlug,
  getRelatedArticles as getLocalRelatedArticles,
} from "@/lib/data/articles";
import {
  getPublishedTestimonials as getLocalPublishedTestimonials,
  getFeaturedTestimonials as getLocalFeaturedTestimonials,
} from "@/lib/data/testimonials";
import type { Vehicle, Article, Testimonial } from "@/lib/types";

/**
 * Data access layer for vehicle inventory.
 *
 * When NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set
 * (see supabase/schema.sql for the table definition), these functions read
 * live from Supabase. Otherwise they transparently fall back to the local
 * sample data in src/lib/data/vehicles.ts, so the site works immediately
 * with zero setup.
 */

type VehicleRow = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileage_km: number;
  transmission: Vehicle["transmission"];
  fuel_type: Vehicle["fuelType"];
  color: string;
  category_tags: Vehicle["categoryTags"];
  status: Vehicle["status"];
  featured: boolean;
  images: string[];
  description: string;
  highlights: string[];
  location: string;
  seats: number;
  use_case_tags: Vehicle["useCaseTags"];
  video_url: string | null;
  tiktok_url: string | null;
  instagram_url: string | null;
  condition_points: Vehicle["conditionPoints"];
};

function mapRow(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    brand: row.brand,
    model: row.model,
    variant: row.variant,
    year: row.year,
    price: row.price,
    mileageKm: row.mileage_km,
    transmission: row.transmission,
    fuelType: row.fuel_type,
    color: row.color,
    categoryTags: row.category_tags,
    status: row.status,
    featured: row.featured,
    images: row.images,
    description: row.description,
    highlights: row.highlights,
    location: row.location,
    seats: row.seats,
    useCaseTags: row.use_case_tags,
    videoUrl: row.video_url,
    tiktokUrl: row.tiktok_url,
    instagramUrl: row.instagram_url,
    conditionPoints: row.condition_points,
  };
}

export async function getAllVehicles(): Promise<Vehicle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getAllVehicles error, falling back to local data:", error.message);
      return localVehicles;
    }
    return (data as VehicleRow[]).map(mapRow);
  }
  return localVehicles;
}

export async function getFeaturedVehicles(): Promise<Vehicle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("featured", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getFeaturedVehicles error, falling back to local data:", error.message);
      return getLocalFeatured();
    }
    return (data as VehicleRow[]).map(mapRow);
  }
  return getLocalFeatured();
}

export async function getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) {
      if (error) console.error("Supabase getVehicleBySlug error, falling back to local data:", error.message);
      return getLocalBySlug(slug);
    }
    return mapRow(data as VehicleRow);
  }
  return getLocalBySlug(slug);
}

/**
 * Admin-only lookup (by primary key, not slug). Requires Supabase — there's
 * no local-data fallback since the admin dashboard only makes sense against
 * a real database.
 */
export async function getVehicleById(id: string): Promise<Vehicle | undefined> {
  if (!isSupabaseConfigured || !supabase) return undefined;

  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Supabase getVehicleById error:", error.message);
    return undefined;
  }
  return mapRow(data as VehicleRow);
}

export async function getRelatedVehicles(vehicle: Vehicle, limit = 3): Promise<Vehicle[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .neq("id", vehicle.id)
      .overlaps("category_tags", vehicle.categoryTags)
      .limit(limit);
    if (error) {
      console.error("Supabase getRelatedVehicles error, falling back to local data:", error.message);
      return getLocalRelated(vehicle, limit);
    }
    return (data as VehicleRow[]).map(mapRow);
  }
  return getLocalRelated(vehicle, limit);
}

/**
 * Data access layer for Tips & Kredit articles. Same Supabase-or-local-
 * fallback shape as vehicles above (see src/lib/data/articles.ts).
 */

type ArticleRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_image: string;
  youtube_url: string | null;
  category: Article["category"];
  featured: boolean;
  published: boolean;
  created_at: string;
};

function mapArticleRow(row: ArticleRow): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    coverImage: row.cover_image,
    youtubeUrl: row.youtube_url,
    category: row.category,
    featured: row.featured,
    published: row.published,
    createdAt: row.created_at,
  };
}

// Public: published only, newest first. Powers /tips and generateStaticParams.
export async function getAllArticles(): Promise<Article[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getAllArticles error, falling back to local data:", error.message);
      return getLocalPublishedArticles();
    }
    return (data as ArticleRow[]).map(mapArticleRow);
  }
  return getLocalPublishedArticles();
}

/**
 * Admin-only lookup (all rows, including drafts). Requires Supabase —
 * there's no local-data fallback since the admin dashboard only makes sense
 * against a real database.
 */
export async function getAllArticlesAdmin(): Promise<Article[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase getAllArticlesAdmin error:", error.message);
    return [];
  }
  return (data as ArticleRow[]).map(mapArticleRow);
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) {
      console.error("Supabase getFeaturedArticles error, falling back to local data:", error.message);
      return getLocalFeaturedArticles(limit);
    }
    return (data as ArticleRow[]).map(mapArticleRow);
  }
  return getLocalFeaturedArticles(limit);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (error || !data) {
      if (error) console.error("Supabase getArticleBySlug error, falling back to local data:", error.message);
      return getLocalArticleBySlug(slug);
    }
    return mapArticleRow(data as ArticleRow);
  }
  return getLocalArticleBySlug(slug);
}

// Admin-only lookup by id (for the edit form), any publish status.
export async function getArticleById(id: string): Promise<Article | undefined> {
  if (!isSupabaseConfigured || !supabase) return undefined;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Supabase getArticleById error:", error.message);
    return undefined;
  }
  return mapArticleRow(data as ArticleRow);
}

export async function getRelatedArticles(article: Article, limit = 3): Promise<Article[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("published", true)
      .eq("category", article.category)
      .neq("id", article.id)
      .limit(limit);
    if (error) {
      console.error("Supabase getRelatedArticles error, falling back to local data:", error.message);
      return getLocalRelatedArticles(article, limit);
    }
    return (data as ArticleRow[]).map(mapArticleRow);
  }
  return getLocalRelatedArticles(article, limit);
}

/**
 * Data access layer for customer testimonials. Same Supabase-or-local-
 * fallback shape as vehicles/articles above (see src/lib/data/testimonials.ts).
 */

type TestimonialRow = {
  id: string;
  customer_name: string;
  vehicle_purchased: string | null;
  rating: number;
  quote: string;
  photo_url: string | null;
  featured: boolean;
  published: boolean;
  created_at: string;
};

function mapTestimonialRow(row: TestimonialRow): Testimonial {
  return {
    id: row.id,
    customerName: row.customer_name,
    vehiclePurchased: row.vehicle_purchased,
    rating: row.rating,
    quote: row.quote,
    photoUrl: row.photo_url,
    featured: row.featured,
    published: row.published,
    createdAt: row.created_at,
  };
}

// Public: published only, newest first.
export async function getPublishedTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getPublishedTestimonials error, falling back to local data:", error.message);
      return getLocalPublishedTestimonials();
    }
    return (data as TestimonialRow[]).map(mapTestimonialRow);
  }
  return getLocalPublishedTestimonials();
}

export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) {
      console.error("Supabase getFeaturedTestimonials error, falling back to local data:", error.message);
      return getLocalFeaturedTestimonials(limit);
    }
    return (data as TestimonialRow[]).map(mapTestimonialRow);
  }
  return getLocalFeaturedTestimonials(limit);
}

/**
 * Admin-only lookup (all rows, including unpublished). Requires Supabase —
 * there's no local-data fallback since the admin dashboard only makes sense
 * against a real database.
 */
export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Supabase getAllTestimonialsAdmin error:", error.message);
    return [];
  }
  return (data as TestimonialRow[]).map(mapTestimonialRow);
}

export async function getTestimonialById(id: string): Promise<Testimonial | undefined> {
  if (!isSupabaseConfigured || !supabase) return undefined;

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) {
    if (error) console.error("Supabase getTestimonialById error:", error.message);
    return undefined;
  }
  return mapTestimonialRow(data as TestimonialRow);
}
