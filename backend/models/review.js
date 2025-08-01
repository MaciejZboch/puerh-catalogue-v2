const { number } = require("joi");
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  body: String,
  rating: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tea: {
    type: Schema.Types.ObjectId,
    ref: "Tea",
  },
});

module.exports = mongoose.model("Review", reviewSchema);
