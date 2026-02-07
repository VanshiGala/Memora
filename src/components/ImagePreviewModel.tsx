"use client";

import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";

export default function ImagePreviewModal({
  src,
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  src: string;
  images: any[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white"
        >
          <X size={32} />
        </button>

        {/* Left */}
        {index > 0 && (
          <button
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white"
          >
            <ChevronLeft size={40} />
          </button>
        )}

        {/* Right */}
        {index < images.length - 1 && (
          <button
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white"
          >
            <ChevronRight size={40} />
          </button>
        )}

        <img
          src={src}
          alt="Preview"
          className="w-full max-h-[85vh] object-contain rounded-2xl"
        />
      </div>
    </div>
  );
}
