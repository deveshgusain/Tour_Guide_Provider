import mongoose from "mongoose";

const { Schema } = mongoose;

const guideModel = new Schema({
  id: { type: String },
  languageIds: [String],
  placeId: { type: String },
  location: { type: String },
});

module.exports = mongoose.model("Guide", guideModel);
