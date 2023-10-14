import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  imgSkill: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
}
)

export default mongoose.model("Skill", skillSchema)

