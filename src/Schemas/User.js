import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name : {
      type: String,
      require: true,
    },

    username : {
      type: String,
      require: true,
      unique: true,
      maxLenth: 100
    },

    userimg : {
      type : String,
    },

    email : {
      type: String,
      unique: true,
      require: true,
      validate: {
        validator: function (email) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
        },
        message: props => `${props.value} is not a valid email`},
        required: [true, 'user email required']
    },

    password: {
      type: String,
      require: true,
    },

    roles : {
      ref: "Role",
      type: mongoose.Schema.Types.ObjectId
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);


userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
})


export default mongoose.model("User", userSchema);
