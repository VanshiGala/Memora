// "use server"

// import { SearchResults } from "@/app/gallery/page";
// import cloudinary from "cloudinary"

// export async function addImageToAlbum(image:SearchResults,album:string){
//     await cloudinary.v2.api.create_folder(album);
//     await cloudinary.v2.uploader.rename(image.public_id, `${album}/${image.public_id}`)
// }



"use server";

import { revalidatePath } from "next/cache"; //clear cache and re-render automatically
import { redirect } from "next/navigation";
import cloudinary from "cloudinary";
import { SearchResults } from "@/app/gallery/page";

export async function addImageToAlbum(image: SearchResults, album: string) {
  if (!album || album.trim() === "") {
    throw new Error("Album name is required");
  }

  const albumName = album.trim(); //remove leading or trailing whitespaces

  try {
    
    await cloudinary.v2.uploader.explicit(image.public_id, { //explicit() -> update an asset
      type: "upload", 
      resource_type: "image",
      asset_folder: albumName, 
    });

    console.log(`Successfully moved image ${image.public_id} to album folder: ${albumName}`);
  } catch (error: any) {
    console.error("Failed to move image to album:", error);
    throw new Error(error.message || "Failed to add image to album");
  }

 
  revalidatePath("/gallery");
  revalidatePath("/albums");
  revalidatePath(`/albums/${albumName}`);
}