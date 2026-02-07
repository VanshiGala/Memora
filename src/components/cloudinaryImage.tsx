"use client";

import { CldImage } from "next-cloudinary";
import { Heart } from "lucide-react";
import { SetAsFavourite } from "../app/gallery/actions"; //server action
import { useTransition, useState } from "react"; //allow bg server action w/o blocking UI ; keeping UI responsive
import { SearchResults } from "../app/gallery/page";
import ImageMenu from "./image-menu";



type Props = {
  src: string;
  public_id: string;
  imagedata?: SearchResults;
  alt: string;
  width: number;
  height: number;
  className?: string;
  path?: string;
};


// export function CloudinaryImage(
//   props: any & { imagedata: SearchResults; path: string }
// ) {
//   const [transition, startTransition] = useTransition();
//   const { imagedata } = props; //cloudinary img info
//   const [isFav, setIsFav] = useState(imagedata.tags.includes("favourite")); //heart icon initial state matched reality

//   const toggleFav = () => {
//     const newValue = !isFav;
//     // update UI immediately
//     setIsFav(newValue);
//     // call server action
//     startTransition(() => {
//       SetAsFavourite(imagedata.public_id, newValue, props.path);
//     });
//   };
//   return (
//     <div className="relative overflow-hidden rounded-xl">
//       <CldImage {...props} src={imagedata.public_id} />
//       <Heart
//         className={`absolute top-1 left-0 cursor-pointer ${
//           isFav ? "fill-red-600" : ""
//         }`}
//         onClick={toggleFav}
//       />
// <div className="absolute top-2 right-2 z-20">
//         <ImageMenu image={imagedata} />
//       </div>
//     </div>
//   );
// }
export function CloudinaryImage(props: Props) {
  const [transition, startTransition] = useTransition();
  const { imagedata, path } = props;
  const [isFav, setIsFav] = useState(
    imagedata?.tags?.includes("favourite") ?? false
  );

  const toggleFav = () => {
    if (!imagedata || !path) return;

    const newValue = !isFav;
    setIsFav(newValue);

    startTransition(() => {
      SetAsFavourite(imagedata.public_id, newValue, path);
    });
  };


  return (
    <div className="relative overflow-hidden rounded-xl">
      <CldImage {...props} src={props.public_id} alt={props.alt || "image"}className="max-w-[90vw] max-h-[90vh] object-contain" />

      {/* Render ONLY if metadata exists */}
      {imagedata && (
        <>
          <Heart
            className={`absolute top-1 left-0 cursor-pointer ${
              isFav ? "fill-red-600" : ""
            }`}
            onClick={toggleFav}
          />

          <div className="absolute top-2 right-2 z-20">
            <ImageMenu image={imagedata} />
          </div>
        </>
      )}

    </div>
  );
}
