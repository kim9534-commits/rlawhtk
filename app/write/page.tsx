"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function WritePage() {
  const [category, setCategory] = useState<"fish" | "travel">("fish");
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      setCheckingAuth(false);
    });
  }, [router, supabase]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("posts").insert({
      author_id: userData.user.id,
      category,
      title,
      content,
      region: region || null,
    });

    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  if (checkingAuth) return null;

  return (
    <div className="max-w-[640px] mx-auto px-6 py-16">
      <div className="font-mono text-xs text-brass tracking-widest uppercase mb-3">
        New Log
      </div>
      <h1 className="font-display text-3xl font-semibold mb-8">
        조행기 쓰기
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-2">
          {(["fish", "travel"] as const).map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setCategory(c)}
              className={`font-mono text-[13px] px-4 py-2.5 rounded-full border transition ${
                category === c
                  ? "bg-navy text-paper border-navy"
                  : "border-lineStrong text-inkSoft"
              }`}
            >
              {c === "fish" ? "낚시" : "여행"}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="제목"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-lineStrong rounded px-4 py-3 bg-paper focus:outline-none focus:border-navy font-display text-lg"
        />
        <input
          type="text"
          placeholder="지역 (예: 통영, 경남)"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-lineStrong rounded px-4 py-3 bg-paper focus:outline-none focus:border-navy"
        />
        <textarea
          placeholder="오늘의 조행 이야기를 남겨보세요"
          required
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-lineStrong rounded px-4 py-3 bg-paper focus:outline-none focus:border-navy resize-none"
        />
        {error && <p className="text-rust text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="font-mono text-sm bg-navy text-paper rounded px-4 py-3.5 hover:bg-navySoft transition disabled:opacity-50"
        >
          {loading ? "게시 중..." : "게시하기"}
        </button>
      </form>
    </div>
  );
}
