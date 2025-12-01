"use client";

import { useEffect, useState, useTransition } from "react";
import { CloudinaryImage } from "./cloudinary-images";
import { setAsFavourite } from "./actions";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  function handleFav(publicId: string) {
    startTransition(async () => {
      await setAsFavourite(publicId);
    });
  }

  return (
    <div className="grid grid-cols-4 gap-4 mt-4 ml-4">
      {images.map((img: any) => (
        <div key={img.public_id} className="relative">
          <CloudinaryImage
            publicId={img.public_id}
            width="400"
            height="300"
            sizes="100vw"
            alt="Image"
            onFav={handleFav}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
}

