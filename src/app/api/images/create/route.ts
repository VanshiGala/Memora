import { NextResponse } from "next/server";
import { conn } from "@/config/dbConfig";
import Image from "@/models/Image";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const body = await req.json();
  await conn();

const image = await Image.create({
  groupId: new mongoose.Types.ObjectId(body.groupId),
  publicId: body.publicId,
  secureUrl: body.secureUrl,
});

//console.log("Saved image:", image);


  return NextResponse.json(image);
}
