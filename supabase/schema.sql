-- ============================================
-- 낚행(Nakhaeng) DB 스키마
-- Supabase 프로젝트의 SQL Editor에 그대로 붙여넣어 실행하세요.
-- ============================================

-- 프로필 (Supabase Auth의 auth.users 와 1:1 연결)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nickname text not null,
  created_at timestamptz not null default now()
);

-- 회원가입 시 자동으로 프로필 생성
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, nickname)
  values (new.id, coalesce(new.raw_user_meta_data->>'nickname', '조행러'));
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 게시글 (조행기)
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references profiles(id) on delete cascade,
  category text not null check (category in ('fish','travel')),
  title text not null,
  content text not null,
  region text,
  created_at timestamptz not null default now()
);

-- 정보공유방 실시간 채팅
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references profiles(id) on delete set null,
  nickname text not null,
  text text not null,
  created_at timestamptz not null default now()
);

-- 낚시 포인트 (지도 좌표)
create table if not exists points (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  lat double precision,
  lng double precision,
  related_mountain text,
  created_at timestamptz not null default now()
);

-- ===== RLS (Row Level Security) =====
alter table profiles enable row level security;
alter table posts enable row level security;
alter table chat_messages enable row level security;
alter table points enable row level security;

-- 프로필: 누구나 조회 가능, 본인만 수정
create policy "profiles are viewable by everyone" on profiles for select using (true);
create policy "users can update own profile" on profiles for update using (auth.uid() = id);

-- 게시글: 누구나 조회, 로그인한 사용자만 작성, 작성자만 수정/삭제
create policy "posts are viewable by everyone" on posts for select using (true);
create policy "authenticated users can insert posts" on posts for insert with check (auth.uid() = author_id);
create policy "authors can update own posts" on posts for update using (auth.uid() = author_id);
create policy "authors can delete own posts" on posts for delete using (auth.uid() = author_id);

-- 채팅: 누구나 조회, 로그인한 사용자만 작성
create policy "chat is viewable by everyone" on chat_messages for select using (true);
create policy "authenticated users can send chat" on chat_messages for insert with check (auth.uid() = author_id);

-- 포인트: 누구나 조회
create policy "points are viewable by everyone" on points for select using (true);

-- 실시간(realtime) 기능 활성화
alter publication supabase_realtime add table chat_messages;
