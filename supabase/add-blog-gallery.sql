alter table public.blog_posts
add column if not exists gallery_image_urls jsonb not null default '[]'::jsonb;

notify pgrst, 'reload schema';
