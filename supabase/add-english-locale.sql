-- Run once in Supabase Dashboard > SQL Editor.

begin;

alter table public.blog_posts
  drop constraint if exists blog_posts_locale_check;

alter table public.blog_posts
  add constraint blog_posts_locale_check
  check (locale in ('hr', 'slo', 'rs', 'eng'));

alter table public.catalogs
  drop constraint if exists catalogs_locale_check;

alter table public.catalogs
  add constraint catalogs_locale_check
  check (locale in ('hr', 'slo', 'rs', 'eng'));

notify pgrst, 'reload schema';

commit;
