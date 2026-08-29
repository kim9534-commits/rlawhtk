"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function SignupPage() {
  const [nickname, setNickname] = useState("");
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
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nickname } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-[420px] mx-auto px-6 py-20">
      <div className="text-[11px] font-mono text-brass tracking-widest uppercase mb-3">
        Join
      </div>
      <h1 className="font-display text-3xl font-semibold mb-8">
        낚행에 가입하기
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="닉네임"
          required
          maxLength={12}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border border-lineStrong rounded px-4 py-3 bg-paper focus:outline-none focus:border-navy"
        />
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
          placeholder="비밀번호 (6자 이상)"
          required
          minLength={6}
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
          {loading ? "가입 중..." : "가입하기"}
        </button>
      </form>
      <p className="text-sm text-inkSoft mt-6">
        이미 계정이 있으신가요?{" "}
        <a href="/login" className="text-navy underline">
          로그인
        </a>
      </p>
    </div>
  );
}
