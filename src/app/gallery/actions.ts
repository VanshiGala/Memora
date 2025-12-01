"use server";

import cloudinary from "../../config/cloudConfig";

export async function setAsFavourite(publicId: string) {
    // if (isFavourite){
    //     await (cloudinary.uploader as any).remove_tag("favourite", [publicId]);
    // }else{
  await (cloudinary.uploader as any).add_tag("favourite", [publicId]);
    //}
  return { success: true };
}
