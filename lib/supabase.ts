import { createBrowserClient } from "@supabase/ssr";

// .env.local 에 아래 두 값을 설정하세요.
// NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
