import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { conn } from "@/config/dbConfig";
import GroupChatMessage from "@/models/GroupMessage";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (res.socket && !((res.socket as any).server.io)) {
    console.log("🔥 Initializing Socket.IO server");

    const io = new Server((res.socket as any).server, {
      path: "/api/socket",
      cors: { origin: "*" },
    });

    (res.socket as any).server.io = io;

    io.on("connection", (socket) => {
      console.log("✅ Socket connected:", socket.id);

      socket.on("join-group", (groupId: string) => {
        socket.join(`group:${groupId}`);
        console.log("👥 Joined group:", groupId);
      });

      socket.on("send-group-message", async ({ groupId, text, userId, username }) => {
        if (!mongoose.Types.ObjectId.isValid(groupId) || !mongoose.Types.ObjectId.isValid(userId)) return;

        await conn();

        const saved = await GroupChatMessage.create({ groupId, text, userId, username });

        io.to(`group:${groupId}`).emit("receive-group-message", {
          _id: saved._id.toString(),
          text: saved.text,
          username: saved.username,
          time: new Date(saved.createdAt).toLocaleTimeString(),
        });
      });
    });
  }

  res.end();
}
