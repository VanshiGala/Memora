"use client";

import { CldUploadButton } from "next-cloudinary";

export default function Upload() {
  return (
    <CldUploadButton
      uploadPreset="your_preset_name"
      options={{ folder: "Photo-Album" 
      }}
    />
  );
}
