-- New Satria Mobil — inventory schema
-- Run this in the Supabase SQL editor once you've created a project.
-- After running it, set NEXT_PUBLIC_SUPABASE_URL and
-- NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local to switch the site from
-- local sample data to this table.

create table if not exists vehicles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  brand text not null,
  model text not null,
  variant text not null,
  year integer not null,
  price bigint not null,
  mileage_km integer not null,
  transmission text not null check (transmission in ('Automatic', 'Manual')),
  fuel_type text not null check (fuel_type in ('Bensin', 'Diesel', 'Hybrid')),
  color text not null,
  category_tags text[] not null default '{}',
  status text not null default 'Tersedia' check (status in ('Tersedia', 'Terjual', 'Booking')),
  featured boolean not null default false,
  images text[] not null default '{}',
  description text not null default '',
  highlights text[] not null default '{}',
  location text not null default 'Showroom Surabaya',
  seats integer not null default 5,
  use_case_tags text[] not null default '{}',
  video_url text,
  tiktok_url text,
  instagram_url text,
  condition_points jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists vehicles_category_tags_idx on vehicles using gin (category_tags);
create index if not exists vehicles_status_idx on vehicles (status);
create index if not exists vehicles_featured_idx on vehicles (featured);

alter table vehicles enable row level security;

-- Public read access (inventory is public marketing data).
create policy "Public can read vehicles"
  on vehicles for select
  using (true);

-- Any authenticated Supabase user can manage inventory. This is the admin
-- dashboard's authorization model: there's no separate roles table, so
-- creating a login (Authentication -> Users -> Add User, in the Supabase
-- dashboard) is what grants admin access at /admin.
create policy "Authenticated users can insert vehicles"
  on vehicles for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update vehicles"
  on vehicles for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete vehicles"
  on vehicles for delete
  to authenticated
  using (true);

-- New Satria Mobil — educational content ("Tips & Kredit") schema

create table if not exists articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  cover_image text not null default '',
  youtube_url text,
  category text not null check (
    category in ('Kredit & Pembiayaan', 'Tips Membeli', 'Tips Menjual', 'Perawatan')
  ),
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_category_idx on articles (category);
create index if not exists articles_published_idx on articles (published);
create index if not exists articles_featured_idx on articles (featured);

alter table articles enable row level security;

-- Public (anon) visitors only ever see published content.
create policy "Public can read published articles"
  on articles for select
  to public
  using (published = true);

-- Any authenticated Supabase user (= admin, same model as vehicles) can
-- see everything, including drafts, for the admin list/edit screens.
create policy "Authenticated users can read all articles"
  on articles for select
  to authenticated
  using (true);

create policy "Authenticated users can insert articles"
  on articles for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update articles"
  on articles for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete articles"
  on articles for delete
  to authenticated
  using (true);

-- New Satria Mobil — customer testimonials schema

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  vehicle_purchased text,
  rating integer not null default 5 check (rating between 1 and 5),
  quote text not null default '',
  photo_url text,
  featured boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonials_published_idx on testimonials (published);
create index if not exists testimonials_featured_idx on testimonials (featured);

alter table testimonials enable row level security;

-- Public (anon) visitors only ever see published testimonials.
create policy "Public can read published testimonials"
  on testimonials for select
  to public
  using (published = true);

-- Any authenticated Supabase user (= admin, same model as vehicles/articles)
-- can see everything, including unpublished, for the admin list/edit screens.
create policy "Authenticated users can read all testimonials"
  on testimonials for select
  to authenticated
  using (true);

create policy "Authenticated users can insert testimonials"
  on testimonials for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update testimonials"
  on testimonials for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete testimonials"
  on testimonials for delete
  to authenticated
  using (true);
