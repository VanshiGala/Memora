// import { conn } from "@/config/dbConfig";
// import GroupChatMessage from "@/models/GroupMessage";
// import mongoose from "mongoose";

// export async function GET(
//   req: Request,
//   { params }: {  params: { groupId: string } }
// ) {
//   const { groupId } = await params;

//   if (!mongoose.Types.ObjectId.isValid(groupId)) {
//     return Response.json({ error: "Invalid group ID" }, { status: 400 });
//   }

//   await conn();

//   const messages = await GroupChatMessage.find({ groupId })
//     .sort({ createdAt: 1 })
//     .limit(100)
//     .lean();

//  return Response.json(
//   Array.isArray(messages)
//     ? messages.map((m) => ({
//         _id: m._id.toString(),
//         text: m.text,
//         username: m.username,
//         time: new Date(m.createdAt).toLocaleTimeString(),
//       }))
//     : []
// );

// }

import { NextRequest, NextResponse } from "next/server";
import { conn } from "@/config/dbConfig";
import GroupChatMessage from "@/models/GroupMessage";
import mongoose from "mongoose";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await context.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return NextResponse.json(
      { error: "Invalid group ID" },
      { status: 400 }
    );
  }

  await conn();

  const messages = await GroupChatMessage.find({ groupId })
    .sort({ createdAt: 1 })
    .limit(100)
    .lean();

  return NextResponse.json(
    Array.isArray(messages)
      ? messages.map((m) => ({
          _id: m._id.toString(),
          text: m.text,
          username: m.username,
          time: new Date(m.createdAt).toLocaleTimeString(),
        }))
      : []
  );
}
