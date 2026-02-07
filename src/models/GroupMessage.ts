import mongoose, { Schema, models } from "mongoose";

const GroupChatMessageSchema = new Schema(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.GroupChatMessage ||
  mongoose.model("GroupChatMessage", GroupChatMessageSchema);
