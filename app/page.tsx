"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import PostCard, { Post } from "@/components/PostCard";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState<"all" | "fish" | "travel">("all");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("id, title, content, category, region, created_at, profiles(nickname)")
        .order("created_at", { ascending: false })
        .limit(30);

      const mapped: Post[] = (data ?? []).map((row: any) => ({
        id: row.id,
        title: row.title,
        content: row.content,
        category: row.category,
        region: row.region,
        created_at: row.created_at,
        nickname: row.profiles?.nickname ?? "조행러",
      }));
      setPosts(mapped);
      setLoading(false);
    }
    loadPosts();
  }, [supabase]);

  const filtered =
    filter === "all" ? posts : posts.filter((p) => p.category === filter);

  return (
    <div>
      {/* 히어로 */}
      <section className="border-b border-line py-16 md:py-20">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="font-mono text-xs text-brass tracking-widest uppercase mb-5">
            Nakhaeng · 조행 커뮤니티
          </div>
          <h1 className="font-display font-semibold text-4xl md:text-6xl leading-[1.06] tracking-tight mb-6">
            떠난 길과 낚은 순간을,
            <br />
            <em className="italic font-medium text-navy">같은 지도에</em> 남기다
          </h1>
          <p className="text-inkSoft max-w-[480px] mb-8">
            낚행은 낚시와 여행을 하나의 기록으로 잇는 커뮤니티예요. 오늘의
            조행기를 써보세요.
          </p>
          <Link
            href="/write"
            className="inline-block font-mono text-sm bg-navy text-paper px-6 py-3.5 rounded hover:bg-navySoft transition"
          >
            조행기 시작하기
          </Link>
        </div>
      </section>

      {/* 피드 */}
      <section className="py-16">
        <div className="max-w-[1180px] mx-auto px-8">
          <div className="flex justify-between items-end mb-8 flex-wrap gap-6">
            <div>
              <div className="font-mono text-xs text-brass tracking-widest uppercase mb-2.5">
                Field Log
              </div>
              <h2 className="font-display text-[34px] font-semibold">
                최근 조행기
              </h2>
            </div>
            <div className="flex gap-1 bg-paper p-1 rounded-full border border-lineStrong">
              {(["all", "fish", "travel"] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`font-mono text-[12.5px] px-4.5 py-2 rounded-full transition ${
                    filter === c
                      ? "bg-navy text-paper"
                      : "text-inkSoft hover:text-ink"
                  }`}
                >
                  {c === "all" ? "전체" : c === "fish" ? "낚시" : "여행"}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <p className="text-inkSoft text-sm">불러오는 중...</p>
          ) : filtered.length === 0 ? (
            <p className="text-inkSoft text-sm">
              아직 게시글이 없어요. 첫 조행기를 남겨보세요!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <PostCard key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
