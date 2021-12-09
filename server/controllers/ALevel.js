const ALevel = require("../models/ALevel");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrorHandler = require("../Middlewares/catchAsyncError");
const APIfeatures = require("../utils/Queries");

const aLevel = {
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const apiFeature = new APIfeatures(ALevel.find(), req.query)
      .search()
      .sorting()
      .filtering()
      .paginating(15);
    const totalCount = await ALevel.countDocuments();
    const books = await apiFeature.query;
    if (books.length === 0) {
      return next(new ErrorHandler("Empty Items list", 400));
    } else {
      res.status(200).json({ totalItems: totalCount, success: true, books });
    }
  }),
  getOne: AsyncErrorHandler(async (req, res, next) => {
    const book = await ALevel.findById(req.params.id);
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
      !req.body.category ||
      !req.body.brand ||
      !req.body.image ||
      !req.body.description ||
      !req.body.seriesEditor ||
      !req.body.publisher ||
      !req.body.isbn ||
      !req.body.buy ||
      !req.body.sell
    ) {
      return next(new ErrorHandler("please fill in all fields", 404));
    } else {
      const {
        title,
        brand,
        category,
        description,
        seriesEditor,
        publisher,
        isbn,
        buy,
        sell,
      } = req.body;
      const book = new ALevel({
        title,
        brand,
        category,
        description,
        seriesEditor,
        publisher,
        isbn,
        buy,
        sell,
      });

      const book_details = await book.save();
      res
        .status(201)
        .json({ book_details, message: "Item created successfully" });
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
        seriesEditor,
        publisher,
        isbn,
        buy,
        sell,
      } = req.body;
      const book = await ALevel.findById(req.params.id);
      if (book) {
        book.title = title;
        book.image = image;
        book.category = category;
        book.description = description;
        book.brand = brand;
        book.seriesEditor = seriesEditor;
        book.publisher = publisher;
        book.isbn = isbn;
        book.buy = buy;
        book.sell = sell;

        const book_details = await ALevel.save();
        res
          .status(200)
          .json({ book_details, message: "Item updated successfully" });
      } else {
        return next(new ErrorHandler("Item not found", 404));
      }
    }
  }),
  delete: AsyncErrorHandler(async (req, res, next) => {
    const book = await ALevel.findById(req.params.id);
    if (book) {
      await book.remove();
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
      const book = await ALevel.findById(req.params.id);
      if (book) {
        const alreadyReview = book.reviews.find(
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
        book.reviews.push(review);
        book.numReviews = book.reviews.length;
        book.rating =
          book.reviews.reduce((acc, item) => item.rating + acc, 0) /
          book.reviews.length;
        await book.save();
        res.status(201).json({ message: "review added" });
      } else {
        return next(new ErrorHandler("Item not found", 404));
      }
    }
  }),
};
module.exports = aLevel;
