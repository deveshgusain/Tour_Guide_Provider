import mongoose from "mongoose";

const { Schema } = mongoose;

const stateModel = new Schema({
  id: { type: String },
  name: { type: String },
});

module.exports = mongoose.model("State", stateModel);
