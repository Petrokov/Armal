-- Run this in Supabase SQL Editor for an existing project.
-- It prevents future-scheduled published content from being publicly readable before published_at.

drop policy if exists "Public can read published blog posts" on public.blog_posts;
create policy "Public can read published blog posts"
  on public.blog_posts for select
  to anon, authenticated
  using (status = 'published' and (published_at is null or published_at <= now()));

drop policy if exists "Public can read published catalogs" on public.catalogs;
create policy "Public can read published catalogs"
  on public.catalogs for select
  to anon, authenticated
  using (status = 'published' and (published_at is null or published_at <= now()));

notify pgrst, 'reload schema';
