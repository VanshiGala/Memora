import { conn } from "@/config/dbConfig";
import Group from "@/models/Group";
import Image from "@/models/Image";
import mongoose from "mongoose";
import GroupUpload from "@/components/upload/GroupUpload";
import GroupImageMenu from "@/components/GroupImageMenu";
import GroupImageGrid from "@/components/GroupImageGrid";
import GroupChat from "@/components/GroupChat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import GroupChatWrapper from "@/components/GroupChatWrapper";

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    return <div>Invalid group ID</div>;
  }

  await conn();

  const group = await Group.findById(groupId).lean();
  if (!group) return <div>Group not found</div>;

  // Fetch the current session
  const session = await getServerSession(authOptions);

  //fetch images for this group
 const images = (
  await Image.find({ groupId: new mongoose.Types.ObjectId(groupId) })
    .sort({ createdAt: -1 })
    .lean()
).map((img) => ({
  _id: img._id.toString(),
  groupId: img.groupId.toString(),
  uploadedBy: img.uploadedBy?.toString(),
  publicId: img.publicId,
  secureUrl: img.secureUrl,
  createdAt: img.createdAt.toISOString(),
}));


  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-zinc-100">
    <div className="max-w-6xl mx-auto px-6 pt-14 pb-24">

      {/* GROUP HEADER */}
      <div className="rounded-3xl bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 shadow-[0_0_60px_rgba(139,92,246,0.15)] p-8 mb-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-6">

          {/* LEFT */}
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2">
              {group.name}
            </h1>
            <p className="text-zinc-400 max-w-2xl">
              {group.description || "No description yet."}
            </p>
          </div>

          {/* INVITE CODE */}
          <div className="md:text-right">
            <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">
              Invite Code
            </p>
            <code className="inline-block rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-2 text-purple-400 font-mono text-sm">
              {group.inviteCode || "—"}
            </code>
          </div>
        </div>

        {/* MEMBERS */}
        <div className="mt-8">
          <h3 className="text-sm uppercase tracking-wide text-zinc-500 mb-3">
            Members ({group.members.length})
          </h3>

          <div className="flex flex-wrap gap-3 items-center">
            {group.members.map((member: any) => (
              <div
                key={member._id}
                className="flex items-center gap-3 rounded-full bg-zinc-800/80 border border-zinc-700 px-4 py-2"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden flex items-center justify-center">
                  {member.profilePic ? (
                    <img
                      src={member.profilePic}
                      alt={member.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-white">
                      {member.username?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-sm text-zinc-200">
                  {member.username}
                </span>
              </div>
            ))}

            {/* CHAT */}
            
          </div>
        </div>
      </div>

      {/* UPLOAD */}
      <div className="mb-12">
        <GroupUpload groupId={groupId} />
      </div>

      {/* PHOTOS */}
      {images.length === 0 ? (
        <div className="rounded-3xl bg-zinc-900/70 border border-zinc-800 p-20 text-center">
          <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-zinc-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7h18M3 12h18M3 17h18"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-300 mb-2">
            No memories yet
          </h3>
          <p className="text-zinc-500">
            Upload your first photo to start this story.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-6 text-white">
            Shared Memories ({images.length})
          </h2>

          <GroupImageGrid images={images} />
        </>
      )}
    </div>
    <GroupChatWrapper
              groupId={groupId}
              userId={session?.user?.id || ""}
              username={session?.user?.name || "Unknown User"}
            />
  </div>
);

}

