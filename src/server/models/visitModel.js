import mongoose from "mongoose";

const { Schema } = mongoose;

const visitModel = new Schema({
  id: { type: String },
  user: { type: String },
  placeId: { type: String },
  date: { type: String },
  amount: { type: String },
  members: { type: Number },
  guideIds: [String],
});

module.exports = mongoose.model("Visit", visitModel);
