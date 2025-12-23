
"use client";

import { ImageGrid } from "@/components/image-grid";
import { SearchResults } from "@/app/gallery/page";
import { ImageIcon, Sparkles } from "lucide-react";

export default function AlbumGrid({
  images,
}: {
  images: SearchResults[];
}) {
  const imageCount = images.length;

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-md">
            <ImageIcon className="w-6 h-6 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {imageCount === 0
                ? "No photos yet"
                : `${imageCount} ${
                    imageCount === 1 ? "Photo" : "Photos"
                  }`}
            </h2>
            <p className="text-sm text-gray-500">
              {imageCount === 0
                ? "Start adding memories to this album."
                : "Moments captured and preserved."}
            </p>
          </div>
        </div>

        {imageCount > 0 && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-purple-600 font-medium">
            <Sparkles className="w-4 h-4" />
            Curated Memories
          </div>
        )}
      </div>

      {/* Content */}
      {imageCount > 0 ? (
        <ImageGrid images={images} />
      ) : (
        <div className="flex flex-col items-center justify-center py-28 text-center rounded-3xl border-2 border-dashed border-gray-300 bg-white/60 backdrop-blur">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
            <ImageIcon className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            This album is empty
          </h3>
          <p className="text-gray-500 max-w-md">
            Add photos from your gallery to begin building this collection of
            memories.
          </p>
        </div>
      )}
    </section>
  );
}
