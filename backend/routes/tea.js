import express from 'express';
const router = express.Router();
import catchAsync from '../utilities/catchAsync';
import { isLoggedIn, isAuthor, validateTea } from '../middleware';
import multer from 'multer';
import { storage }  from '../cloudinary';
const upload = multer({ storage });
const tea = require("../controllers/tea");
const { hasNoSpecialSymbols } = require("../middleware");

router
  .route("/newVendor")
  .get(catchAsync(tea.newVendor))
  .post(hasNoSpecialSymbols, catchAsync(tea.postVendor));

router.get("/collection/:id", catchAsync(tea.collection));

router.get("/browse", catchAsync(tea.browse));

router
  .route("/")
  .get(catchAsync(tea.index))
  .post(
    isLoggedIn,
    hasNoSpecialSymbols,
    upload.array("image"),
    validateTea,
    catchAsync(tea.new)
  );

router.get("/new", isLoggedIn, catchAsync(tea.newForm));
router
  .route("/newVendor")
  .get(isLoggedIn, tea.newVendor)
  .post(isLoggedIn, hasNoSpecialSymbols, catchAsync(tea.postVendor));

router
  .route("/newProducer")
  .get(isLoggedIn, tea.newProducer)
  .post(isLoggedIn, hasNoSpecialSymbols, catchAsync(tea.postProducer));

router
  .route("/:id")
  .get(catchAsync(tea.show))
  .put(
    isLoggedIn,
    hasNoSpecialSymbols,
    isAuthor,
    upload.array("image"),
    validateTea,
    catchAsync(tea.update)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(tea.delete));

router
  .route("/:id/add")
  .post(isLoggedIn, catchAsync(tea.addToCollection))
  .delete(isLoggedIn, catchAsync(tea.removeFromCollection));

module.exports = router;
