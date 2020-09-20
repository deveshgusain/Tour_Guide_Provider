import mongoose from "mongoose";

const { Schema } = mongoose;

const languageModel = new Schema({
  id: { type: String },
  name: { type: String },
});

module.exports = mongoose.model("Language", languageModel);
