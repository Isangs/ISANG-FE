type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function GoalInputSection({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="할 일을 입력하세요"
      className="mb-6 w-full rounded-xl border border-white/30 bg-white/70 px-4 py-3 text-[16px] backdrop-blur-sm placeholder:text-gray-400"
    />
  );
}
