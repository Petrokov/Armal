-- Per-breakpoint image framing for team members
-- Run once in Supabase SQL Editor.
--
-- Shape:
-- {
--   "phone":      {"x": 50, "y": 25, "zoom": 100},
--   "tablet":     {"x": 50, "y": 50, "zoom": 100},
--   "laptop":     {"x": 50, "y": 50, "zoom": 100},
--   "monitor":    {"x": 50, "y": 50, "zoom": 100},
--   "widescreen": {"x": 50, "y": 50, "zoom": 100}
-- }
-- x / y = object-position in percent, zoom = scale in percent (100 = no zoom).

alter table public.team_members
add column if not exists image_settings jsonb;

comment on column public.team_members.image_settings is
  'Per-breakpoint image framing (phone/tablet/laptop/monitor/widescreen): x,y = object-position %, zoom = scale %.';

notify pgrst, 'reload schema';
