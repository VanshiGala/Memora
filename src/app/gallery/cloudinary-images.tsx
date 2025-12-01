"use client";

import { CldImage } from "next-cloudinary";
import { Heart } from "lucide-react";
import { useState } from "react";

interface CloudinaryImageProps {
  publicId: string;
  onFav: (id: string) => void;
  [key: string]: any;
  //tags : string // allows any additional props for CldImage
}

export function CloudinaryImage({
  publicId,
  onFav,
  ...props
}: CloudinaryImageProps) {
  const [liked, setLiked] = useState(false);
  return (
    <div>
      <CldImage {...props} src={publicId} alt=""/>
      <Heart
        onClick={() => {
          setLiked(!liked); // instant UI update
          onFav(publicId); // server update in background
        }}
        className={`absolute top-2 right-2 w-6 h-6 cursor-pointer transition-all
          ${liked ? "fill-red-500 stroke-red-500 scale-110" : "stroke-white"}`}
      />
    </div>
  );
}
