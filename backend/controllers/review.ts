import Review from '../models/review';
import Tea from '../models/tea';
import Activity from '../models/activity';
import { Request, Response } from 'express';

module.exports.new = async (req: Request, res: Response) => {
  const tea = await Tea.findById(req.params.id);
  if (!tea) {
    req.flash("error", "Tea not found.");
    return res.redirect("/tea");
  }

  const review = new Review(req.body.review);
  review.author = req.user._id;
  review.tea = tea._id;

  await review.save();

  //logging activity with timestamp
  const activity = new Activity({
    user: req.user._id,
    type: "review",
    refId: review._id,
  });
  await activity.save();
  req.flash("success", "Succesfully made a new review!");
  res.redirect(`/tea/${tea._id}`);
};

module.exports.delete = async (req, res) => {
  await Review.findByIdAndDelete(req.params.reviewId);
  req.flash("success", "Succesfully deleted a review!");
  res.redirect(`/tea/${req.params.id}`);
};
