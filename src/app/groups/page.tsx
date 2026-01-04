"use client";

import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

type Group = {
  _id: string;
  name: string;
  membersCount: number;
};
type CreatedGroup = {
  _id: string;
  name: string;
  inviteCode: string;
  description?: string;
};

export default function GroupsPage() {
  const router = useRouter();

  const [groups, setGroups] = useState<Group[]>([]); //user's group
  const [groupName, setGroupName] = useState("");//new group
  const [description, setDescription] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [createdGroup, setCreatedGroup] = useState<CreatedGroup | null>(null);

  // CREATE GROUP
  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;

    try {
      const res = await fetch("/api/groups/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: groupName, description }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);

      setCreatedGroup(data);
      setGroupName("");
      setDescription("");
      // add to "groups" state
      setGroups((prev) => [...prev, { _id: data._id, name: data.name, membersCount: 1 }]);
    } catch {
      alert("Cannot create group");
    }
  };

  // JOIN GROUP
  const handleJoinGroup = async () => {
    if (!inviteCode.trim()) return;

    try {
      const res = await fetch("/api/groups/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ inviteCode }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.error);

      // update groups state
      const exists = groups.find((g) => g._id === data._id);
      if (!exists) {
        setGroups((prev) => [...prev, { _id: data._id, name: data.name, membersCount: data.members.length }]);
      }

      router.push(`/groups/${data._id}`);
    } catch {
      alert("Failed to join group");
    }
  };
  useEffect(() => { //GET /api/groups/my -> load all groups user belongs to
  const loadGroups = async () => {
    try {
      const res = await fetch("/api/groups/my", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) return;

      setGroups(
        data.map((g: any) => ({
          _id: g._id,
          name: g.name,
          membersCount: g.members.length,
        }))
      );
    } catch {
      console.error("Failed to load groups");
    }
  };

  loadGroups();
}, []); //run once on component mount

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Groups</h1>
      <p className="text-gray-500">Create or join shared albums with friends</p>

      {/* CREATE GROUP */}
      <div className="bg-white rounded-xl shadow p-5 space-y-4">
        <h2 className="text-lg font-medium">Create Group</h2>
        <input
          type="text"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          placeholder="Group description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleCreateGroup}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Create Group
        </button>

        {createdGroup && (
          <div className="bg-green-50 border rounded-xl p-5 space-y-3">
            <h3 className="font-medium text-green-700">Group Created Successfully 🎉</h3>
            <p className="text-sm">Share this invite code with your friends:</p>
            <div className="flex items-center gap-3">
              <code className="px-3 py-2 bg-white border rounded font-mono">
                {createdGroup.inviteCode}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(createdGroup.inviteCode)}
                className="text-sm px-3 py-2 border rounded"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow p-5 space-y-4">
        <h2 className="text-lg font-medium">Join Group</h2>
        <input
          type="text"
          placeholder="Enter invite code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleJoinGroup}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Join Group
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-medium">My Groups</h2>
        {groups.length === 0 ? (
          <p className="text-gray-500">You are not part of any groups yet.</p>
        ) : (
          groups.map((group) => (
            <div
              key={group._id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
            >
              <div>
                <p className="font-medium">{group.name}</p>
                <p className="text-sm text-gray-500">{group.membersCount} members</p>
              </div>
              <button
                onClick={() => router.push(`/groups/${group._id}`)}
                className="text-sm px-3 py-1 border rounded"
              >
                Open
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
