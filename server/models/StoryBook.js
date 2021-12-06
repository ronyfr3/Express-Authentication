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

const storyBookSchema = mongoose.Schema(
  {
    writer_name:String,
    title: String,
    brand: String,
    category: String,
    image: String,
    description: String,
    main: String,
    sell: String,
    buy: String,
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

module.exports = mongoose.model('StoryBook', storyBookSchema);
