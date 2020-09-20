import mongoose from "mongoose";

const { Schema } = mongoose;

const userModel = new Schema({
  name: { type: String },
  username: { type: String },
  passwordHash: { type: String },
  email: { type: String },
  phoneNo: { type: String },
  role: { type: String },
});

module.exports = mongoose.model("User", userModel);
