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
      router.refresh()
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
  <div className="max-w-5xl mx-auto p-6 pt-12">
    {/* Header */}
    <div className="text-center mb-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">My Photo Groups</h1>
      <p className="text-lg text-gray-600">Create or join shared albums with friends & family</p>
    </div>

    <div className="grid lg:grid-cols-3 gap-4">
      {/* Left Column: Create & Join */}
      <div className="lg:col-span-1 space-y-6">
        {/* Create Group Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Create New Group</h2>
          </div>

          <input
            type="text"
            value={groupName}
            placeholder="Group Name"
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 mb-3"
          />
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
          />

          <button
            onClick={handleCreateGroup}
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition shadow-md"
          >
            Create Group
          </button>

          {createdGroup && (
            <div className="mt-5 p-4 bg-teal-50 border border-teal-200 rounded-xl">
              <p className="text-teal-800 font-medium mb-2">Group created! 🎉</p>
              <p className="text-sm text-teal-700 mb-3">Share this code:</p>
              <div className="flex gap-2">
                <code className="flex-1 px-4 py-2 bg-white rounded-lg font-mono text-teal-800 border">
                  {createdGroup.inviteCode}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(createdGroup.inviteCode)}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Join Group Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center mb-5">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v-2.257L6.743 12.486A6 6 0 113 12v5h2v2h2v2h4v-2h2v-2h2l3.257-3.257A6 6 0 0121 9a6 6 0 00-6-6z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold">Join with Code</h2>
          </div>

          <input
            type="text"
            placeholder="Enter invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />
          <button
            onClick={handleJoinGroup}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition"
          >
            Join Group
          </button>
        </div>
      </div>

      {/* Right Column: My Groups List */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <span className="mr-3">My Groups</span>
          <span className="text-sm font-normal text-gray-500">({groups.length})</span>
        </h2>

        {groups.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <p className="text-gray-600 text-lg">You haven't joined any groups yet.</p>
            <p className="text-gray-500 mt-2">Create one above or ask a friend for an invite code!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {groups.map((group) => (
              <div
                key={group._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 flex items-center justify-between border border-gray-100"
              >
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-indigo-500 rounded-xl mr-5 flex items-center justify-center text-white font-bold text-xl">
                    {group.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{group.name}</h3>
                    <p className="text-gray-600">{group.membersCount} member{group.membersCount !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/groups/${group._id}`)}
                  className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium transition"
                >
                  Open →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
)}