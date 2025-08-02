import express from 'express';
import { isReviewAuthor, isLoggedIn, validateReview } from '../middleware';
const router = express.Router();
import catchAsync  from '../utilities/catchAsync';("../utilities/catchAsync");
import review from '../controllers/review';

router.post("/:id/review", isLoggedIn, validateReview, catchAsync(review.new));

router.delete(
  "/:id/review/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(review.delete)
);
module.exports = router;
