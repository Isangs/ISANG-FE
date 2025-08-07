'use client';

import { X, Search as SearchIcon } from 'lucide-react';

type Props = {
  keyword: string;
  onChange: (text: string) => void;
  onClose: () => void;
};

export default function SearchBar({ keyword, onChange, onClose }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      <SearchIcon size={18} className="text-gray-400" />
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 rounded-xl bg-gray-100 px-4 py-2 text-sm"
      />
      <button onClick={onClose}>
        <X size={18} className="text-gray-400" />
      </button>
    </div>
  );
}
