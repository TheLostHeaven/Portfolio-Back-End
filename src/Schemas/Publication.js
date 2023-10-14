import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String,
  },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ImgFile'
  },
  date: {
    type: Date,
    default: Date.now,
  },

},
{
  timestamps: true,
  versionKey: false
}
);

export default mongoose.model("Publication", publicationSchema);
