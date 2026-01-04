import mongoose, { Schema, Types } from "mongoose";

const GroupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    admin: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],

    inviteCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.models.Group ||
  mongoose.model("Group", GroupSchema);
