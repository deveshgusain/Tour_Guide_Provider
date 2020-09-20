import mongoose from "mongoose";

const { Schema } = mongoose;

const cityModel = new Schema({
  id: { type: String },
  name: { type: String },
  stateId: { type: String },
});

module.exports = mongoose.model("City", cityModel);
