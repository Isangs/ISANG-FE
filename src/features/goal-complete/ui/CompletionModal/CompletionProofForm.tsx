'use client';

import { useState } from 'react';
import CompletionProofSelector from './CompletionProofSelector';
import Image from 'next/image';

export default function CompletionProofForm() {
  const [selectedType, setSelectedType] = useState<'text' | 'photo'>('text');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
    }
  }

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full max-w-[345px] rounded-2xl bg-white/10 p-7 py-8 backdrop-blur">
        <h3 className="mb-4 text-center text-sm font-semibold text-white">
          완료 증명 제출
        </h3>

        <CompletionProofSelector
          selectedType={selectedType}
          onSelect={setSelectedType}
        />

        <div className="h-[116px] w-full rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
          {selectedType === 'text' && (
            <textarea
              className="h-full w-full resize-none bg-transparent text-sm text-white placeholder-white/60 outline-none"
              placeholder="완료 내용을 입력하세요..."
            />
          )}

          {selectedType === 'photo' && (
            <label htmlFor="photo-upload">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full text-sm text-white/60">
                  사진을 선택하세요...
                </div>
              )}

              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
