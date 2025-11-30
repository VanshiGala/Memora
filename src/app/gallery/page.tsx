"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";

export default function Gallery() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 mt-4 ml-4">
      {images.map((img: any) => (
        <CldImage
          key={img.public_id}
          width="400"
          height="300"
          src={img.public_id}
          sizes="100vw"
          alt=""
        />
      ))}
    </div>
  );
}
