export default function CompletionInput() {
  return (
    <div className="w-[327px] rounded-2xl bg-white/20 p-4 text-white backdrop-blur-sm">
      <textarea
        className="h-[116px] w-full resize-none bg-transparent text-sm placeholder-white/60 focus:outline-none"
        placeholder="완료 내용을 입력하세요..."
      />
    </div>
  );
}
