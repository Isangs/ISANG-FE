'use client';

import { useState } from 'react';
import { Camera, Mic, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

const options = [
  { label: '텍스트', icon: Pencil, value: 'text' },
  { label: '사진', icon: Camera, value: 'photo' },
  { label: '음성', icon: Mic, value: 'voice' },
];

export default function CompletionProofSelector() {
  const [selected, setSelected] = useState('text');

  return (
    <div className="mb-4 flex w-full justify-center gap-4">
      {options.map(({ label, icon: Icon, value }) => (
        <button
          key={value}
          onClick={() => setSelected(value)}
          className={cn(
            'flex h-20 w-20 flex-col items-center justify-center rounded-2xl transition-all',
            selected === value
              ? 'bg-white text-purple-600'
              : 'bg-white/20 text-white',
          )}
        >
          <Icon
            size={24}
            className={selected === value ? 'text-purple-600' : 'text-white'}
          />
          <span
            className={cn('mt-2 text-sm', selected === value && 'underline')}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
