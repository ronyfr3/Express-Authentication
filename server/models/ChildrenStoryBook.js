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

const childrenStoryBookSchema = mongoose.Schema(
  {
    title: String,
    brand: String,
    category: String,
    image: String,
    description: String,
    sell: String,
    buy: String,
    shishuShahitto: {
      title: String,
      sell: {
        best: String,
        medium: String,
        average: String,
      },
      buy: {
        best: String,
        medium: String,
        average: String,
      },
    },
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

module.exports = mongoose.model(
  "childrenStoryBookSchema",
  childrenStoryBookSchema
);
