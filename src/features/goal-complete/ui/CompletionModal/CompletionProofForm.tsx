'use client';

import { useState } from 'react';
import CompletionProofSelector from './CompletionProofSelector';
import CompletionFooter from './CompletionFooter';
import Image from 'next/image';
import { FeedType } from '@/shared/store/post';
import type { CompletionSubmitPayload } from './CompletionModal';
import api from '@/shared/api/axios';

type CompletionProofFormProps = {
  // before: onSubmit: (feedType: FeedType) => void;
  onSubmit: (data: CompletionSubmitPayload) => void;
};

export default function CompletionProofForm({
  onSubmit,
}: CompletionProofFormProps) {
  const [selectedType, setSelectedType] = useState<FeedType>(FeedType.TEXT);
  const [textValue, setTextValue] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null); // <- 미리보기(Blob URL)

  const isValid =
    (selectedType === FeedType.TEXT && textValue.trim() !== '') ||
    (selectedType === FeedType.IMAGE && photoPreview !== null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const { data } = await api.postForm(`/s3`, {
        file,
      });

      setPhotoPreview(data.result);
    }
  }

  const onClick = () => {
    if (selectedType === FeedType.TEXT) {
      onSubmit({ type: FeedType.TEXT, content: textValue.trim() });
    } else {
      onSubmit({ type: FeedType.IMAGE, imageUrl: photoPreview ?? '' });
    }
  };

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
          {selectedType === FeedType.TEXT && (
            <textarea
              className="h-full w-full resize-none bg-transparent text-sm text-white placeholder-white/60 outline-none"
              placeholder="완료 내용을 입력하세요..."
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          )}

          {selectedType === FeedType.IMAGE && (
            <label
              htmlFor="photo-upload"
              className="flex h-full w-full cursor-pointer rounded-2xl"
            >
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="preview"
                  fill
                  className="rounded-2xl object-cover"
                />
              ) : (
                <div className="text-sm text-white/60">
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

      <div className="mt-6">
        <CompletionFooter isActive={isValid} onClick={onClick} />
      </div>
    </div>
  );
}
