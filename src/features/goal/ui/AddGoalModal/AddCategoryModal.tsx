import { useState } from 'react';
import { cn } from '@/lib/utils';
type AddCategoryModalProps = {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};
export function AddCategoryModal({
  value,
  onChange,
  onClose,
  onSubmit,
}: AddCategoryModalProps) {
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState([
    '운동',
    '학습',
    '업무',
    '건강',
    '개인성장',
  ]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const colorOptions = [
    'from-pink-400 to-red-400',
    'from-orange-400 to-red-400',
    'from-yellow-400 to-orange-400',
    'from-green-400 to-emerald-400',
    'from-teal-400 to-cyan-400',
    'from-blue-400 to-indigo-400',
    'from-indigo-400 to-purple-400',
    'from-purple-400 to-pink-400',
    'from-pink-400 to-red-400',
  ];

  return (
    <div className="absolute inset-0 z-10 flex flex-col rounded-t-[24px] px-6 pt-6 pb-16">
      <div className="mx-auto mb-6 h-1 w-12 rounded-full bg-gray-800" />
      <h2 className="mb-6 text-center text-xl font-bold text-gray-800">
        새로운 목표 추가
      </h2>
      <div className="mt-6 w-full">
        <p className="mb-4 text-sm font-bold text-gray-800">목표 선택</p>

        <div className="mb-4 flex w-full items-center gap-2">
          <input
            className="flex-1 rounded-xl border border-white/20 bg-white px-6 py-4 text-sm text-black backdrop-blur placeholder:text-gray-400"
            placeholder="목표 이름"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            onClick={() => {
              if (newCategory && !categories.includes(newCategory)) {
                setCategories([...categories, newCategory]);
                setNewCategory('');
              }
            }}
            disabled={!value.trim()}
            className="rounded-2xl bg-green-500 px-5 py-3 text-[16px] font-medium text-white"
          >
            추가
          </button>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {colorOptions.map((gradient, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedColor(gradient)}
              className={cn(
                'h-8 w-8 rounded-full bg-gradient-to-r',
                gradient,
                selectedColor === gradient && 'ring-2 ring-black',
              )}
            />
          ))}
        </div>

        <div className="mb-20 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto w-full">
        <button
          onClick={onSubmit}
          disabled={!value.trim()}
          className={cn(
            'w-full rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-4 text-sm font-semibold text-white shadow-lg transition-opacity',
            value.trim() ? 'opacity-100' : 'opacity-50',
          )}
        >
          할 일 추가하기
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  );
}
