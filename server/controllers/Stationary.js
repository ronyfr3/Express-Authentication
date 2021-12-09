const Stationary = require("../models/Stationary");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrorHandler = require("../Middlewares/catchAsyncError");
const APIfeatures = require("../utils/Queries");

const stationary = {
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const apiFeature = new APIfeatures(Stationary.find(), req.query)
      .search()
      .sorting()
      .filtering()
      .paginating(15);
    const totalCount = await Stationary.countDocuments();
    const stationaries = await apiFeature.query;
    if (stationaries.length === 0) {
      return next(new ErrorHandler("Empty Items list", 400));
    } else {
      res
        .status(200)
        .json({ totalItems: totalCount, success: true, stationaries });
    }
  }),
  getOne: AsyncErrorHandler(async (req, res, next) => {
    const stationary = await Stationary.findById(req.params.id);

    if (stationary) {
      res.status(200).json({ success: true, stationary });
    } else {
      return next(new ErrorHandler("Item not found", 404));
    }
  }),
  create: AsyncErrorHandler(async (req, res, next) => {
    if (
      Object.keys(req.body).length === 0 ||
      !req.body.title ||
      !req.body.brand ||
      !req.body.category ||
      !req.body.description ||
      !req.body.product_type ||
      !req.body.image ||
      !req.body.bulk_price ||
      !req.body.sell_single ||
      !req.body.buy_single
    ) {
      return next(new ErrorHandler("please fill in all fields", 404));
    } else {
      const {
        title,
        brand,
        category,
        description,
        product_type,
        image,
        bulk_price,
        sell_single,
        buy_single,
      } = req.body;
      const stationary = new Stationary({
        title,
        brand,
        category,
        description,
        product_type,
        image,
        bulk_price,
        sell_single,
        buy_single,
      });

      const createdStationary = await stationary.save();
      res
        .status(201)
        .json({ createdStationary, message: "Item created successfully" });
    }
  }),
  update: AsyncErrorHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ErrorHandler("please fill at least one field", 404));
    } else {
      const {
        title,
        brand,
        category,
        description,
        product_type,
        bulk_price,
        sell_single,
        buy_single,
        image,
        countInStock,
      } = req.body;
      const stationary = await Stationary.findById(req.params.id);
      if (stationary) {
        stationary.title = title;
        stationary.image = image;
        stationary.category = category;
        stationary.description = description;
        stationary.brand = brand;
        stationary.product_type = product_type;
        stationary.bulk_price = bulk_price;
        stationary.sell_single = sell_single;
        stationary.buy_single = buy_single;
        stationary.countInStock = countInStock;

        const updatedStationary = await stationary.save();
        res
          .status(200)
          .json({ updatedStationary, message: "Item updated successfully" });
      } else {
        return next(new ErrorHandler("Item not found", 404));
      }
    }
  }),
  delete: AsyncErrorHandler(async (req, res, next) => {
    const stationary = await Stationary.findById(req.params.id);
    if (stationary) {
      await stationary.remove();
      res
        .status(200)
        .json({ success: true, message: "Item deleted successfully" });
    } else {
      return next(new ErrorHandler("Item not found", 404));
    }
  }),
  review: AsyncErrorHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ErrorHandler("please fill at least one field", 404));
    } else {
      const { rating, comment } = req.body;
      const stationary = await Stationary.findById(req.params.id);
      if (stationary) {
        const alreadyReview = stationary.reviews.find(
          (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReview) {
          res.status(400).json({ msg: "Item already reviewed" });
        }
        const review = {
          rating: Number(rating),
          comment,
          name: req.user.name,
          user: req.user._id,
        };
        stationary.reviews.push(review);
        stationary.numReviews = stationary.reviews.length;
        stationary.rating =
          stationary.reviews.reduce((acc, item) => item.rating + acc, 0) /
          stationary.reviews.length;
        await stationary.save();
        res.status(201).json({ message: "review added" });
      } else {
        return next(new ErrorHandler("Item not found", 404));
      }
    }
  }),
};
module.exports = stationary;
