import mongoose from "mongoose";

const imgSchema = new mongoose.Schema({

  imgId: {
    type: String
  },

  imgfile: {
    type: String
  },
  
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
},
{
  _id: false,
  timestamps: true,
  versionKey: false
});

export default mongoose.model("ImgFile", imgSchema)

