const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const ALevel = mongoose.Schema(
  {
    title: String,
    category: String,
    brand: String,
    image: String,
    description: String,
    seriesEditor: String,
    publisher: String,
    isbn: String,
    buy: String,
    sell: String,
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    countInStock: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ALevel", ALevel);
