const EnglishMedium = require('../models/EnglishMedium');
const ErrorHandler = require('../utils/errorHandler');
const AsyncErrorHandler = require('../Middlewares/catchAsyncError'); 


const englishMedium ={
    getAll: AsyncErrorHandler(async (req, res,next) => {
          const books = await EnglishMedium.find();

          res.status(200).json({ success: true, books });
          return next(new ErrorHandler("Items not found",404));
      }),
      getOne: AsyncErrorHandler(async (req, res, next) => {
          const book = await EnglishMedium.findById(req.params.id);
    
          res.status(200).json({success: true, book});
          return next(new ErrorHandler("Item not found",404));
      }),
      create: AsyncErrorHandler(async (req, res) => {
          if(!req.body){
            return next(new ErrorHandler("Item Creation Failed",404));
          }
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
            no_commision
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
            no_commision
          });
    
          const book_details = await book.save();
          res
            .status(201)
            .json({ book_details, message: 'Item created successfully' });
      }),
      update: AsyncErrorHandler(async (req, res) => {
        if(!req.body){
          return next(new ErrorHandler("Item Creation Failed",404));
        }
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
              .json({ book_details, message: 'Item updated successfully' });
          }


      }),
      delete: AsyncErrorHandler(async (req, res) => {
        if(!req.params.id){
          return next(new ErrorHandler("Item not found",404));
        }
          const book = await EnglishMedium.findById(req.params.id);
          if (book) {
            await book.remove();
            res.status(200).json({ success:true, message: 'Item deleted successfully'});
          }
        
          res.status(404).json({ message: 'Item not found!' });
        
      }),
      review: AsyncErrorHandler(async (req, res) => {

          const { rating, comment } = req.body;
          const book = await EnglishMedium.findById(req.params.id);
          if (book) {
            const alreadyReview = book.reviews.find(
              (r) => r.user.toString() === req.user._id.toString(),
            );
            if (alreadyReview) {
              res.status(400).json({ msg: 'Item already reviewed' });
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
            res.status(201).json({ message: 'review added' });
          }
          return next(new ErrorHandler("Item not found",404))
      }),
}
module.exports = englishMedium