import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlenght: 21,
    trim: true,
  },
  lastName: {
    type: String,
    maxlenght: 21,
    trim: true,
    default: "lastName",
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid Email",
    },
    required: [true, "Please provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 8,
    select: false,
  },
  location: {
    type: String,
    maxlenght: 21,
    trim: true,
    default: "my city",
  },
});

UserSchema.pre("save", async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified("name"));
  if (!this.isModified("password")) {
    return;
  }

  // console.log(this.password);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
    // expiresIn: "100",
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
export default mongoose.model("User", UserSchema);
