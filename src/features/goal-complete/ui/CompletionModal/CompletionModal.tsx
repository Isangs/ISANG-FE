import { X } from 'lucide-react';
import { CompletionHeader } from './CompletionHeader';
import CompletionProofForm from './CompletionProofForm';
type CompletionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export default function CompletionModal({
  isOpen,
  onClose,
  onSubmit,
}: CompletionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#3E0063] to-[#002E73]">
      <div className="relative h-full w-full max-w-sm p-4">
        <button
          onClick={onClose}
          className="absolute top-8 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center gap-6 rounded-3xl p-4">
          <CompletionHeader />
          <CompletionProofForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
