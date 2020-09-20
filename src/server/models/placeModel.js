import mongoose from "mongoose";

const { Schema } = mongoose;

const placeModel = new Schema({
  id: { type: String },
  name: { type: String },
  cityId: { type: String },
  location: { type: String },
  description: { type: String },
  total_guide: { type: Number },
  price: { type: String },
});

module.exports = mongoose.model("Place", placeModel);
