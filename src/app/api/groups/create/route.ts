//route handler for creating new groups
import { NextResponse } from "next/server";
import Group from "@/models/Group";
import { getServerSession } from "next-auth";
import crypto from "crypto";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, description } = await req.json();
  if (!name) {
    return NextResponse.json({ error: "Group name required" }, { status: 400 });
  }

  // Generate unique invite code
  const inviteCode = crypto.randomBytes(4).toString("hex");
  //db creation
  const group = await Group.create({
    name,
    description: description || "",
    admin: session.user.id,//creator is admin
    members: [session.user.id], // only creator initially
    inviteCode,
  });

  return NextResponse.json(group, { status: 201 });
}
