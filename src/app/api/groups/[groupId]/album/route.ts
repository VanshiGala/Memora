import { NextResponse } from "next/server";
import { conn } from "@/config/dbConfig";
import Album from "@/models/Album";

export async function GET(
  req: Request,
  { params }: { params: { groupId: string } }
) {
  await conn();

  let album = await Album.findOne({
    groupId: params.groupId,
    name: "General",
  });

  if (!album) {
    album = await Album.create({
      name: "General",
      groupId: params.groupId,
      cloudinaryPath: `groups/${params.groupId}/general`,
    });
  }

  return NextResponse.json(album);
}
