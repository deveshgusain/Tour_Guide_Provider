import mongoose from "mongoose";

const { Schema } = mongoose;

const ratingModel = new Schema({
  id: { type: String },
  visitId: { type: String },
  guideId: { type: String },
  score: { type: String },
  isSubmit: { type: Boolean },
});

module.exports = mongoose.model("Rating", ratingModel);
