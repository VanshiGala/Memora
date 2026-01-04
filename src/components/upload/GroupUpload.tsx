"use client";

import { CldUploadButton } from "next-cloudinary";
import { CloudUpload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GroupUpload({ groupId }: { groupId: string }) {
  const router = useRouter();

  const folderPath = `groups/${groupId}/general`;

  return (
    <CldUploadButton
      uploadPreset="photo-album"
      options={{ folder: folderPath }}
      className="px-4 py-2 border rounded-lg hover:bg-blue-600"
      onSuccess={async (event: any) => {
        if (event.event !== "success") return;

        const info = event.info;

        await fetch("/api/images/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupId,
            publicId: info.public_id,
            secureUrl: info.secure_url,
          }),
        });

        router.refresh();
      }}
    >
      <CloudUpload className="w-4 h-4 mr-1" />
      Upload to Group
    </CldUploadButton>
  );
}
