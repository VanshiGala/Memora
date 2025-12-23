"use client";

import { useSearchParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function EditPage() {
  const searchParams = useSearchParams();
  const publicId = searchParams.get("publicId");

  if (!publicId) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">No image selected</p>
      </div>
    );
  }
  const [transformation, setTransformation] = useState<
    undefined | "generative-fill" | "blurr" | "remove-background"
  >();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">Edit {publicId}</h1>
      </div>
      <div className="flex gap-4">
        <Button variant="ghost" onClick={() => setTransformation(undefined)}>
          Clear All
        </Button>
        <Button
          variant="default"
          onClick={() => setTransformation("generative-fill")}
        >
          Generative fill
        </Button>
        <Button variant="default" onClick={() => setTransformation("blurr")}>
          Blur
        </Button>
        <Button variant="default" onClick={() => setTransformation("remove-background")}>
          Remove Background
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-12">
        <CldImage
          src={publicId}
          alt="Selected image"
          width={300}
          height={200}
          className="rounded-xl shadow-lg"
        />
        {transformation === "blurr" && (
          <CldImage
            src={publicId}
            alt="Selected image"
            width={300}
            height={200}
            blur="800"
          />
        )}
        {transformation === "generative-fill" && (
          <CldImage
            src={publicId}
            alt="Selected image"
            width={1200}
            height={800}
            crop="fill"
            gravity="center"
            fillBackground={{ prompt: "christmas tree" }}
          />
        )}
            {transformation === "remove-background" && (
          <CldImage
            src={publicId}
            alt="Selected image"
            width={300}
            height={200}
            removeBackground
          />
        )}
      </div>
    </div>
  );
}
