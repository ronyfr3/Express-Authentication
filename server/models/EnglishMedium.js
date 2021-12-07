const mongoose = require('mongoose')
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
  
const EnMedium = mongoose.Schema({
title:String,
product_type:String,
category:String,
brand:String,
image:String,
description:String,
books:[],
mrp:String,
buying_price:String,
no_commision:String,
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
},{
    timestamps:true,
})

module.exports = mongoose.model("EnglishMedium",EnMedium)