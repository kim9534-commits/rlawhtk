"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError("이메일 또는 비밀번호가 올바르지 않아요.");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-[420px] mx-auto px-6 py-20">
      <div className="text-[11px] font-mono text-brass tracking-widest uppercase mb-3">
        Log in
      </div>
      <h1 className="font-display text-3xl font-semibold mb-8">
        다시 만나서 반가워요
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-lineStrong rounded px-4 py-3 bg-paper focus:outline-none focus:border-navy"
        />
        <input
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-lineStrong rounded px-4 py-3 bg-paper focus:outline-none focus:border-navy"
        />
        {error && <p className="text-rust text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="font-mono text-sm bg-navy text-paper rounded px-4 py-3.5 hover:bg-navySoft transition disabled:opacity-50"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </form>
      <p className="text-sm text-inkSoft mt-6">
        아직 계정이 없으신가요?{" "}
        <a href="/signup" className="text-navy underline">
          회원가입
        </a>
      </p>
    </div>
  );
}
