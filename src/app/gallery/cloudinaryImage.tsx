"use client";

import { CldImage } from "next-cloudinary";
import { Heart } from "lucide-react";
import { SetAsFavourite } from "./actions"; //server action
import { useTransition, useState } from "react"; //allow bg server action w/o blocking UI ; keeping UI responsive
import { SearchResults } from "./page";

export function CloudinaryImage(
  props: any & { imagedata: SearchResults; path: string }
) {
  const [transition, startTransition] = useTransition();
  const { imagedata } = props; //cloudinary img info
  const [isFav, setIsFav] = useState(imagedata.tags.includes("favourite")); //heart icon initial state matched reality

  const toggleFav = () => {
    const newValue = !isFav;
    // update UI immediately
    setIsFav(newValue);
    // call server action
    startTransition(() => {
      SetAsFavourite(imagedata.public_id, newValue, props.path);
    });
  };
  return (
    <div className="relative">
      <CldImage {...props} src={imagedata.public_id} />
      <Heart
        className={`absolute top-1 right-1 cursor-pointer ${
          isFav ? "fill-red-600" : ""
        }`}
        onClick={toggleFav}
      />
    </div>
  );
}
