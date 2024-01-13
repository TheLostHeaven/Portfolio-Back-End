import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({
  cvFile: {
    type: String
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
  versionKey: false
});

export default mongoose.model("CVFile", imgSchema)

