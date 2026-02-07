// import { NextResponse } from "next/server";
// import { conn } from "@/config/dbConfig";
// import Image from "@/models/Image";
// import mongoose from "mongoose";

// export async function POST(req: Request) {
//   const body = await req.json();
//   await conn();

// const image = await Image.create({
//   groupId: new mongoose.Types.ObjectId(body.groupId),
//   publicId: body.publicId,
//   secureUrl: body.secureUrl,
// });

// //console.log("Saved image:", image);


//   return NextResponse.json(image);
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Image from "@/models/Image";
import mongoose from "mongoose";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");

  const body = await req.json();

  await Image.create({
    groupId: body.groupId
      ? new mongoose.Types.ObjectId(body.groupId)
      : null,

    uploadedBy: new mongoose.Types.ObjectId(session.user.id),

    publicId: body.publicId,
    secureUrl: body.secureUrl,
  });

  return NextResponse.json({ success: true });
}
