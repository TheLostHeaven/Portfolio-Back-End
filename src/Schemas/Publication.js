import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  content: {
    type: String,
  },
  tech: {
    type: String
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
