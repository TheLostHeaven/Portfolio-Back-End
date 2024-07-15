import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxLenth: 24
  },
  content: {
    type: String,
    maxLenth: 24
  },
  tech: {
    type: String,
    maxLenth: 24
  },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'imgfile'
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
