import mongoose from "mongoose";

const { Schema } = mongoose;

const bookedModel = new Schema({
  id: { type: String },
  user: { type: String },
  placeId: { type: String },
  date: { type: String },
  amount: { type: String },
  members: { type: Number },
  guideIds: [String],
  otp: { type: String },
  progress: { type: String },
});

module.exports = mongoose.model("Booked", bookedModel);
