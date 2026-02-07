"use client";

import { useState } from "react";
import ImagePreviewModal from "./ImagePreviewModel";

export default function GroupImageGrid({ images }: { images: any[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const close = () => setCurrentIndex(null);
  const prev = () =>
    setCurrentIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  const next = () =>
    setCurrentIndex((i) =>
      i !== null && i < images.length - 1 ? i + 1 : i
    );

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((img, idx) => (
          <div
            key={img._id}
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl cursor-pointer"
            onClick={() => setCurrentIndex(idx)}
          >
            <img
              src={img.secureUrl}
              alt="Group photo"
              className="w-full h-64 object-cover group-hover:scale-110 transition"
            />
          </div>
        ))}
      </div>

      {currentIndex !== null && (
        <ImagePreviewModal
          src={images[currentIndex].secureUrl}
          images={images}
          index={currentIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}
