const gradients = [
  "from-[#4A7C68] to-[#1B3A4B]",
  "from-[#C79A5F] to-[#8A5A2B]",
  "from-[#3F6B7A] to-[#16302C]",
  "from-[#B84632] to-[#5C2A22]",
  "from-[#6C8A5E] to-[#233A2C]",
  "from-[#24444F] to-[#0F2229]",
  "from-[#2C5A6E] to-[#0D2530]",
  "from-[#6B3F3A] to-[#241412]",
];

export type Post = {
  id: string;
  title: string;
  content: string;
  category: "fish" | "travel";
  region: string | null;
  created_at: string;
  nickname: string;
};

export default function PostCard({ post, index }: { post: Post; index: number }) {
  const gradient = gradients[index % gradients.length];
  const date = new Date(post.created_at);
  const dateLabel = `${String(date.getMonth() + 1).padStart(2, "0")}.${String(
    date.getDate()
  ).padStart(2, "0")}`;

  return (
    <article className="bg-paper border border-line rounded overflow-hidden hover:-translate-y-1 hover:shadow-xl transition">
      <div className={`h-[170px] relative bg-gradient-to-br ${gradient}`}>
        <span className="absolute top-3 left-3 w-[9px] h-[9px] rounded-full bg-rust shadow" />
        <span
          className={`absolute top-3 right-3 font-mono text-[10.5px] text-white px-2.5 py-1 rounded-full ${
            post.category === "fish" ? "bg-rust" : "bg-brass"
          }`}
        >
          {post.category === "fish" ? "낚시" : "여행"}
        </span>
      </div>
      <div className="p-[18px_18px_20px]">
        <div className="flex justify-between font-mono text-[11px] text-inkSoft mb-2.5">
          <span>{post.region || "전국"}</span>
          <span>{dateLabel}</span>
        </div>
        <h3 className="font-display font-semibold text-[19px] mb-2 leading-snug">
          {post.title}
        </h3>
        <p className="text-[13.5px] text-inkSoft mb-3.5 line-clamp-2">
          {post.content}
        </p>
        <div className="flex justify-between items-center pt-3 border-t border-line text-[12.5px] text-inkSoft">
          <div className="flex items-center gap-2">
            <span className="w-[22px] h-[22px] rounded-full bg-brassSoft inline-block" />
            {post.nickname}
          </div>
        </div>
      </div>
    </article>
  );
}
