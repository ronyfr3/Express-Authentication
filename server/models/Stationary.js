const mongoose = require('mongoose');

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
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

const stationarySchema = mongoose.Schema(
  {
    title: String,
    brand: String,
    category: String,
    product_type: String,
    image: String,
    description: String,
    bulk_price: {
      type: Number,
      default: 0,
    },
    sell_single: {
      type: Number,
      default: 0,
    },
    buy_single: {
      type: Number,
      default: 0,
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
  },
);

module.exports = mongoose.model('Stationary', stationarySchema);
