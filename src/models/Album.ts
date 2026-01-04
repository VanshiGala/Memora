import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true 
    },
    groupId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Group" 
    },
    cloudinaryPath: { 
        type: String, 
        required: true 
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Album || mongoose.model("Album", AlbumSchema);
