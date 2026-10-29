-- Запустите один раз в Supabase Dashboard → SQL Editor.
-- Список хранится в аккаунте и синхронизируется между устройствами.

create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  item_type text not null check (item_type in ('film', 'series', 'anime')),
  item_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, item_type, item_id)
);

create index if not exists favorites_user_created_idx
  on public.favorites (user_id, created_at desc);

alter table public.favorites enable row level security;
revoke all on table public.favorites from anon, authenticated;
grant select, insert, delete on table public.favorites to authenticated;

drop policy if exists "Users can read their favorites" on public.favorites;
create policy "Users can read their favorites"
  on public.favorites for select
  to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Users can add their favorites" on public.favorites;
create policy "Users can add their favorites"
  on public.favorites for insert
  to authenticated
  with check (user_id = (select auth.uid()));

drop policy if exists "Users can remove their favorites" on public.favorites;
create policy "Users can remove their favorites"
  on public.favorites for delete
  to authenticated
  using (user_id = (select auth.uid()));
