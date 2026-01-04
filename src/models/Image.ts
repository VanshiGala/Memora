import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    groupId: { //IMPORTANT
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    secureUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Image ||
  mongoose.model("Image", ImageSchema);
