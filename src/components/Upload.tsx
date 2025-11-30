"use client";

import { CldUploadButton } from "next-cloudinary"; //cloudinary upload dialog
import { CldImage } from 'next-cloudinary'; //strictly client component
import { useRouter } from "next/navigation";
import { useState } from "react";

// type UploadResult={
//   info:{
//     public_id:string,
//     asset_id:string
//   };
//   event:"success"
// }
export default function Upload() {
  const [imageId, setImageId] = useState("")
  const router = useRouter();
  return (
<div className="relative w-full h-0 mt-4 ml-4 mr-4">
  <CldUploadButton //cloudinary widget
    className="border p-1 w-24 rounded-lg hover:bg-blue-600 absolute top-0 right-0"
    onSuccess={(event) => { //in-built event
      if (event.event === "success" && typeof event.info === "object") { //event.info -> meta data as object
        setImageId(event.info.public_id);
      }
    router.refresh(); //to make new img show on page
}}
    uploadPreset="photo-album"
  />

<div>
    {imageId && (<CldImage
  width="400"
  height="300"
  src={imageId}
  sizes="100vw"
  alt="Description of my image"
/>)}
    </div>
</div>

  );
}




//An upload preset is like a saved configuration ; Think of it as a rulebook for every upload -> controls upload folder, allowed formats, upload permissions
//1. Unsigned Upload Preset -> Best for client-side upload (browser, React, mobile app) ; NO API key or secret needed.
//2. Signed Upload Preset -> Requires the server to sign every upload request for authenticated users; (Uses API Key + API Secret on backend)
//signed upload is secure but does not support CldUploadButton which provides various features