import { number } from "joi";
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

const Review = mongoose.model("Review", reviewSchema);
export default Review;