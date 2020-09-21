import mongoose from "mongoose";

const { Schema } = mongoose;

const imageModel = new Schema({
  placeId: { type: String },
  header: { type: String },
  all: [String],
});

module.exports = mongoose.model("Image", imageModel);
