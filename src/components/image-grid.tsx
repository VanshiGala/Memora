// "use client"

// import { CloudinaryImage } from "@/components/cloudinaryImage";
// import { SearchResults } from "@/app/gallery/page";
// import { useState } from "react";

// export function ImageGrid({ images }: { images: SearchResults[] }) {
//   const MAX_COL = 4;
//   const [activeImage, setActiveImage] = useState<string | null>(null)

//   //to display in 4-column grid
//   function getColumns(colIndex: number) {
//     return images.filter((resource, idx) => idx % MAX_COL === colIndex);
//   }
//   return (
//     <>
//     <div className="grid grid-cols-4 gap-4 mt-4 ">
//       {[getColumns(0), getColumns(1), getColumns(2), getColumns(3)].map(
//         (columns,idx) => (
//           <div key={idx} className="flex flex-col gap-2">
//             {columns.map((result: { public_id: any }) => (
//               <CloudinaryImage
//                 path="/gallery"
//                 src={result.public_id}
//                 imagedata={result}
//                 key={result.public_id}
//                 public_id={result.public_id}
//                 alt="Image of something"
//                 width={300}
//                 height={300}
//                 className="rounded-2xl border"
//               />
//             ))}
//           </div>
//         )
//       )}
//     </div>
//     {activeImage && (
//         <div
//           className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
//           onClick={() => setActiveImage(null)}
//         >
//           <div
//             className="relative max-w-6xl max-h-[90vh]"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <CloudinaryImage
//               path="/gallery"
//               src={activeImage}
//               public_id={activeImage}
//               alt="Enlarged image"
//               width={1200}
//               height={900}
//               className="rounded-xl object-contain"
//             />

//             {/* Close button */}
//             <button
//               className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded"
//               onClick={() => setActiveImage(null)}
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
  
"use client";

import { CloudinaryImage } from "@/components/cloudinaryImage";
import { SearchResults } from "@/app/gallery/page";
import { useState , useEffect} from "react";

export function ImageGrid({ images }: { images: SearchResults[] }) {
  const MAX_COL = 4;
  // const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function getColumns(colIndex: number) {
    return images.filter((_, idx) => idx % MAX_COL === colIndex);
  }

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);

      if (e.key === "ArrowRight" && activeIndex < images.length - 1) {
        setActiveIndex((prev) => (prev === null ? prev : prev + 1));
      }

      if (e.key === "ArrowLeft" && activeIndex > 0) {
        setActiveIndex((prev) => (prev === null ? prev : prev - 1));
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, images.length]);
  return (
    <>
      <>
      {/* Image Grid */}
      <div className="grid grid-cols-4 gap-4 mt-4">
        {[0, 1, 2, 3].map((colIndex) => (
          <div key={colIndex} className="flex flex-col gap-2">
            {getColumns(colIndex).map((result) => {
              const index = images.findIndex(
                (img) => img.public_id === result.public_id
              );

              return (
                <div
                  key={result.public_id}
                  className="cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                >
                  <CloudinaryImage
                    path="/gallery"
                    src={result.public_id}
                    public_id={result.public_id}
                    imagedata={result}
                    alt="Gallery image"
                    width={300}
                    height={300}
                    className="rounded-2xl border"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Enlarge Modal */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-6xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <CloudinaryImage
              path="/gallery"
              src={images[activeIndex].public_id}
              public_id={images[activeIndex].public_id}
              alt="Enlarged image"
              width={1200}
              height={900}
              className="rounded-xl object-contain"
            />

            {/* Close */}
            <button
              className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded"
              onClick={() => setActiveIndex(null)}
            >
              ✕
            </button>
          </div>
        </div>
        )}
      </>
      </>
    );
  }