"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";

export default function Header() {
  const [nickname, setNickname] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function loadUser() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        if (mounted) setNickname(null);
        return;
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("nickname")
        .eq("id", userData.user.id)
        .single();
      if (mounted) setNickname(profile?.nickname ?? "조행러");
    }

    loadUser();
    const { data: sub } = supabase.auth.onAuthStateChange(() => loadUser());
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setNickname(null);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-b border-line">
      <div className="max-w-[1180px] mx-auto px-8 h-[78px] flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="font-display font-bold text-2xl tracking-tight">
            낚행
          </span>
          <span className="text-[11px] text-inkSoft tracking-widest uppercase">
            Nakhaeng · 조행 커뮤니티
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[14.5px] font-medium">
          <Link href="/" className="text-inkSoft hover:text-ink">
            피드
          </Link>
          <Link href="/mountains" className="text-inkSoft hover:text-ink">
            명산 50선
          </Link>
          <Link href="/chat" className="text-inkSoft hover:text-ink">
            정보공유방
          </Link>
        </nav>

        {nickname ? (
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-inkSoft">
              {nickname}님
            </span>
            <Link
              href="/write"
              className="font-mono text-[13px] px-4 py-2.5 rounded-sm bg-navy text-paper hover:bg-navySoft transition"
            >
              조행기 쓰기
            </Link>
            <button
              onClick={handleLogout}
              className="font-mono text-[13px] px-4 py-2.5 rounded-sm border border-ink hover:bg-ink hover:text-paper transition"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="font-mono text-[13px] px-4 py-2.5 rounded-sm border border-ink hover:bg-ink hover:text-paper transition"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="font-mono text-[13px] px-4 py-2.5 rounded-sm bg-navy text-paper hover:bg-navySoft transition"
            >
              회원가입
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
