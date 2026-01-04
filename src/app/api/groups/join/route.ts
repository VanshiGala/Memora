//route handler for joining group
import { NextResponse } from "next/server";
import Group from "@/models/Group";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { conn } from "@/config/dbConfig";

export async function POST(req: Request) {
  await conn();
  const session = await getServerSession(authOptions);
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { inviteCode } = await req.json();
  const group = await Group.findOne({ inviteCode }); //find group by invite code
  if (!group)
    return NextResponse.json({ error: "Invalid invite code" }, { status: 404 });

  if (!group.members.includes(session.user.id)) {
    group.members.push(session.user.id);
    await group.save();
  }

  return NextResponse.json(group, { status: 200 });
}
