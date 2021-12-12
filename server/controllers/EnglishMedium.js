const EnglishMedium = require("../models/EnglishMedium");
const ErrorHandler = require("../utils/errorHandler");
const AsyncErrorHandler = require("../Middlewares/catchAsyncError");
const APIfeatures = require("../utils/Queries");

const englishMedium = {
  getByLastYear: AsyncErrorHandler(async (req, res, next) => {
    const totalCount = await EnglishMedium.countDocuments();
    const lastYearData = await EnglishMedium.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getTime() - 365 * 24 * 60 * 60 * 1000),
          },
        },
      },
    ]);
    if (lastYearData) {
      res
        .status(200)
        .json({
          totalDocument: totalCount,
          returnDocuments: lastYearData.length,
          success: true,
          lastYearData,
        });
    } else {
      return next(new ErrorHandler("Item not found", 404));
    }
  }),
  getByLast6Month: AsyncErrorHandler(async (req, res, next) => {
    const now = new Date();
    const temp = new Date(now).setMonth(now.getMonth() - 6);
    const priorSix = new Date(temp);
    const totalCount = await EnglishMedium.countDocuments();
    const last6MonthData = await EnglishMedium.find({
      createdAt: { $gte: priorSix, $lt: new Date() },
    });
    if (last6MonthData) {
      res
        .status(200)
        .json({
          totalDocument: totalCount,
          returnDocuments: last6MonthData.length,
          success: true,
          last6MonthData,
        });
    } else {
      return next(new ErrorHandler("Item not found", 404));
    }
  }),
  getByLastMonth: AsyncErrorHandler(async (req, res, next) => {
    const totalCount = await EnglishMedium.countDocuments();
    const d = new Date();
    d.setMonth(d.getMonth() - 1); //1 month ago
    const lastMonthData = await EnglishMedium.find({
      createdAt: { $gte: d.toISOString() }, 
    });
    if (lastMonthData) {
      res
        .status(200)
        .json({
          totalDocument: totalCount,
          returnDocuments: lastMonthData.length,
          success: true,
          lastMonthData,
        });
    } else {
      return next(new ErrorHandler("Item not found", 404));
    }
  }),
  getByLastWeek: AsyncErrorHandler(async (req, res, next) => {
    const totalCount = await EnglishMedium.countDocuments();
    const lastWeekData = await EnglishMedium.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
    ]);
    if (lastWeekData) {
      res
        .status(200)
        .json({ totalDocument: totalCount, success: true, lastWeekData });
    } else {
      return next(new ErrorHandler("Item not found", 404));
    }
  }),
  getAll: AsyncErrorHandler(async (req, res, next) => {
    const apiFeature = new APIfeatures(EnglishMedium.find(), req.query)
      .search()
      .sorting()
      .filtering()
      .paginating(15);
    const totalCount = await EnglishMedium.countDocuments();
    const books = await apiFeature.query;
    if (books.length === 0) {
      return next(new ErrorHandler("Empty Items list", 400));
    } else {
      res.status(200).json({ totalItems: totalCount, success: true, books });
    }
  }),
  getOne: AsyncErrorHandler(async (req, res, next) => {
    const book = await EnglishMedium.findById(req.params.id);
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
      !req.body.product_type ||
      !req.body.books ||
      !req.body.buying_price ||
      !req.body.no_commision ||
      !req.body.mrp
    ) {
      return next(new ErrorHandler("please fill in all fields", 404));
    } else {
      const {
        title,
        brand,
        category,
        description,
        product_type,
        books,
        image,
        mrp,
        buying_price,
        no_commision,
      } = req.body;
      const book = new EnglishMedium({
        title,
        brand,
        category,
        product_type,
        books,
        description,
        image,
        mrp,
        buying_price,
        no_commision,
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
        product_type,
        books,
        description,
        image,
        mrp,
        buying_price,
        no_commision,
        countInStock,
      } = req.body;
      const book = await EnglishMedium.findById(req.params.id);
      if (book) {
        book.title = title;
        book.image = image;
        book.category = category;
        book.description = description;
        book.brand = brand;
        book.product_type = product_type;
        book.mrp = mrp;
        book.buying_price = buying_price;
        book.no_commision = no_commision;
        book.countInStock = countInStock;

        const book_details = await EnglishMedium.save();
        res
          .status(200)
          .json({ book_details, message: "Item updated successfully" });
      } else {
        return next(new ErrorHandler("Item not found", 404));
      }
    }
  }),
  delete: AsyncErrorHandler(async (req, res, next) => {
    const book = await EnglishMedium.findById(req.params.id);
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
      const book = await EnglishMedium.findById(req.params.id);
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
module.exports = englishMedium;
