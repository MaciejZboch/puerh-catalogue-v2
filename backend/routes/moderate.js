import express from 'express';
import mongoose from 'mongoose';
import Vendor from '../models/vendor';
import Producer from '../models/producer';
import catchAsync from '../utilities/catchAsync';
const router = express.Router();
import { isMod } from '../middleware';

router.get(
  "/",
  isMod,
  catchAsync(async (req, res) => {
    const vendors = await Vendor.find({ status: "pending" });
    const producers = await Producer.find({ status: "pending" });
    res.render("moderate/dashboard", { vendors, producers });
  })
);

router.put(
  "/vendor/:id",
  isMod,
  catchAsync(async (req, res) => {
    if (req.query.status == "approved") {
      await Vendor.findByIdAndUpdate(req.params.id, {
        status: "approved",
      });
    } else if (req.query.status == "rejected") {
      await Vendor.findByIdAndUpdate(req.params.id, {
        status: "rejected",
      });
    }
    req.flash("Success", "Successfully changed status!");
    res.redirect("/moderate");
  })
);

router.put(
  "/producer/:id",
  isMod,
  catchAsync(async (req, res) => {
    if (req.query.status == "approved") {
      await Producer.findByIdAndUpdate(req.params.id, {
        status: "approved",
      });
    } else if (req.query.status == "rejected") {
      await Producer.findByIdAndUpdate(req.params.id, {
        status: "rejected",
      });
    }
    req.flash("Success", "Successfully changed status!");
    res.redirect("/moderate");
  })
);

module.exports = router;
