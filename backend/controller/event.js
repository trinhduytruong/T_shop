const express = require("express");
const router = express.Router();
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const Event = require("../model/event");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// create event
router.post(
  "/create-event",
  upload.array("images"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findById(shopId);

      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid", 400));
      } else {
        const files = req.files;
        // console.log(files);
        const imageUrls = files.map((file) => `${file.filename}`);

        const eventData = req.body;
        eventData.images = imageUrls;
        eventData.shop = shop;

        const event = await Event.create(eventData);
        res.status(201).json({
          success: true,
          event,
        });
      }
    } catch (error) {
      return next(ErrorHandler(error, 400));
    }
  })
);

module.exports = router;
