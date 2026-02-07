"use server";

import cloudinary from "cloudinary";
import Image from "@/models/Image";
import { conn } from "@/config/dbConfig";
import { revalidatePath } from "next/cache";

export async function deleteGroupImage(
  imageId: string,
  publicId: string,
  groupId: string
) {
  await conn();

  // 1. Delete from Cloudinary
  await cloudinary.v2.uploader.destroy(publicId);

  // 2. Delete from DB
  await Image.findByIdAndDelete(imageId);

  // 3. Revalidate group page
  revalidatePath(`/groups/${groupId}`);
}
