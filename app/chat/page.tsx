import ChatRoom from "@/components/ChatRoom";

export default function ChatPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-8 py-16">
      <div className="font-mono text-xs text-brass tracking-widest uppercase mb-2.5">
        Live · 실시간
      </div>
      <h1 className="font-display text-[34px] font-semibold mb-2">
        낚행 정보공유방
      </h1>
      <p className="text-inkSoft mb-8">
        지금 접속한 조행러들과 실시간으로 정보를 나눠보세요.
      </p>
      <ChatRoom />
    </div>
  );
}
