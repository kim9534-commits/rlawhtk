"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase";

type ChatMessage = {
  id: string;
  nickname: string;
  text: string;
  created_at: string;
  author_id: string | null;
};

export default function ChatRoom() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [nickname, setNickname] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function init() {
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        setUserId(userData.user.id);
        const { data: profile } = await supabase
          .from("profiles")
          .select("nickname")
          .eq("id", userData.user.id)
          .single();
        setNickname(profile?.nickname ?? "조행러");
      }

      const { data } = await supabase
        .from("chat_messages")
        .select("id, nickname, text, created_at, author_id")
        .order("created_at", { ascending: true })
        .limit(50);
      setMessages(data ?? []);
      setLoading(false);
    }
    init();

    const channel = supabase
      .channel("chatroom")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as ChatMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    if (!userId) {
      alert("로그인 후 메시지를 보낼 수 있어요.");
      return;
    }
    const { error } = await supabase.from("chat_messages").insert({
      author_id: userId,
      nickname: nickname || "조행러",
      text: text.trim(),
    });
    if (!error) setText("");
  }

  return (
    <div className="bg-paper border border-lineStrong rounded-md shadow-xl overflow-hidden">
      <div
        ref={scrollRef}
        className="h-[420px] overflow-y-auto p-5 flex flex-col gap-3"
      >
        {loading ? (
          <p className="m-auto text-sm text-inkSoft">불러오는 중...</p>
        ) : messages.length === 0 ? (
          <p className="m-auto text-sm text-inkSoft">
            아직 메시지가 없어요. 첫 소식을 남겨보세요!
          </p>
        ) : (
          messages.map((m) => {
            const self = m.author_id === userId;
            const time = new Date(m.created_at);
            const label = `${String(time.getHours()).padStart(2, "0")}:${String(
              time.getMinutes()
            ).padStart(2, "0")}`;
            return (
              <div
                key={m.id}
                className={`max-w-[80%] ${self ? "self-end" : "self-start"}`}
              >
                <div
                  className={`flex gap-2 items-baseline mb-1 ${
                    self ? "justify-end" : ""
                  }`}
                >
                  <span className="font-display font-semibold text-[13px] text-navy">
                    {m.nickname}
                  </span>
                  <span className="font-mono text-[10.5px] text-inkSoft">
                    {label}
                  </span>
                </div>
                <div
                  className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed rounded-[10px] ${
                    self
                      ? "bg-navy text-paper rounded-br-[2px]"
                      : "bg-bgDeep border border-line rounded-bl-[2px]"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })
        )}
      </div>
      <form
        onSubmit={handleSend}
        className="flex gap-2 p-3.5 border-t border-line bg-bgDeep"
      >
        <input
          type="text"
          maxLength={200}
          placeholder={userId ? "메시지를 입력하세요" : "로그인 후 이용할 수 있어요"}
          value={text}
          disabled={!userId}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-lineStrong rounded px-3 py-2.5 bg-paper text-[13.5px] focus:outline-none focus:border-navy disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!userId}
          className="font-mono text-[13px] bg-navy text-paper px-4.5 py-2.5 rounded hover:bg-navySoft transition disabled:opacity-50"
        >
          보내기
        </button>
      </form>
      <div className="px-4 py-2.5 border-t border-line font-mono text-[10.5px] text-inkSoft">
        이 정보공유방의 메시지는 이 페이지를 보는 모든 사람에게 공개돼요.
      </div>
    </div>
  );
}
