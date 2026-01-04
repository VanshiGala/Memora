//return all group where current user is a member
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import Group from "@/models/Group";
import { conn } from "@/config/dbConfig";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await conn();

  const groups = await Group.find({
    members: session.user.id,
  }).select("_id name members");

  return NextResponse.json(groups);
}
