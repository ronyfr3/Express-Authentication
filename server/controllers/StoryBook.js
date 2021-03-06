const StoryBook = require("../models/WriterStoryBook");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrorHandler = require("../Middlewares/catchAsyncError");
const APIfeatures = require("../utils/Queries");

const storyBook = {
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const apiFeature = new APIfeatures(StoryBook.find(), req.query)
      .search()
      .sorting()
      .filtering()
      .paginating(15);
    const totalCount = await StoryBook.countDocuments();
    const book = await apiFeature.query;
    if (book.length === 0) {
      return next(new ErrorHandler("Empty Items list", 400));
    } else {
      res.status(200).json({ totalItems: totalCount, success: true, book });
    }
  }),
  getOne: AsyncErrorHandler(async (req, res, next) => {
    const book = await Stationary.findById(req.params.id);
    if (book) {
      res.status(200).json({ success: true, book });
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
      !req.body.image ||
      !req.body.description ||
      !req.body.writer_name ||
      !req.body.main ||
      !req.body.sell ||
      !req.body.buy
    ) {
      return next(new ErrorHandler("please fill in all fields", 404));
    } else {
      const {
        writer_name,
        title,
        brand,
        category,
        image,
        description,
        main,
        sell,
        buy,
      } = req.body;
      const book = new Stationary({
        writer_name,
        title,
        brand,
        category,
        image,
        description,
        main,
        sell,
        buy,
      });

      const createdStoryBook = await book.save();
      res
        .status(201)
        .json({ createdStoryBook, message: "Item created successfully" });
    }
  }),
  update: AsyncErrorHandler(async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new ErrorHandler("please fill at least one field", 404));
    } else {
      const {
        writer_name,
        title,
        brand,
        category,
        image,
        description,
        main,
        sell,
        buy,
        countInStock,
      } = req.body;
      const storybook = await StoryBook.findById(req.params.id);
      if (stationary) {
        storybook.writer_name = writer_name;
        storybook.title = title;
        storybook.image = image;
        storybook.category = category;
        storybook.description = description;
        storybook.brand = brand;
        storybook.main = main;
        storybook.sell = sell;
        storybook.buy = buy;
        storybook.countInStock = countInStock;

        const updatedStoryBook = await StoryBook.save();
        res
          .status(200)
          .json({ updatedStoryBook, message: "Item updated successfully" });
      } else {
        return next(new ErrorHandler("Item not found", 404));
      }
    }
  }),
  delete: AsyncErrorHandler(async (req, res, next) => {
    const storybook = await StoryBook.findById(req.params.id);
    if (storybook) {
      await storybook.remove();
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
      const storybook = await StoryBook.findById(req.params.id);
      if (storybook) {
        const alreadyReview = storybook.reviews.find(
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
        storybook.reviews.push(review);
        storybook.numReviews = storybook.reviews.length;
        storybook.rating =
          storybook.reviews.reduce((acc, item) => item.rating + acc, 0) /
          storybook.reviews.length;
        await storybook.save();
        res.status(201).json({ message: "review added" });
      } else {
        return next(new ErrorHandler("Item not found", 404));
      }
    }
  }),
};
module.exports = storyBook;
