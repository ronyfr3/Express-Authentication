const EnglishMedium = require('../models/EnglishMedium')


const englishMedium ={
    getAll: async (req, res) => {
        try {
          const englishbooks = await EnglishMedium.find();
          res.json(englishbooks);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      getOne: async (req, res) => {
        try {
          const englishbooks = await EnglishMedium.findById(req.params.id);
    
          res.json(englishbooks);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      create: async (req, res) => {
        try {
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
          const englishbooks = new EnglishMedium({
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
    
          const createdEnglishbooks= await englishbooks.save();
          res
            .status(201)
            .json({ createdEnglishbooks, message: 'Item created successfully' });
        } catch (error) {
          res.status(400).json({ message: 'Item not created' });
        }
      },
      update: async (req, res) => {
        try {
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
          const englishbooks = await EnglishMedium.findById(req.params.id);
          if (englishbooks) {
            englishbooks.title = title;
            englishbooks.image = image;
            englishbooks.category = category;
            englishbooks.description = description;
            englishbooks.brand = brand;
            englishbooks.product_type = product_type;
            englishbooks.mrp = mrp;
            englishbooks.buying_price = buying_price;
            englishbooks.no_commision = no_commision;
            englishbooks.countInStock = countInStock;
    
            const updatedEnglishbooks = await EnglishMedium.save();
            res
              .status(200)
              .json({ updatedEnglishbooks, message: 'Item updated successfully' });
          }
        } catch (error) {
          res.status(404).json({ message: 'Item Not Found!' });
        }
      },
      delete: async (req, res) => {
        try {
          const englishbooks = await EnglishMedium.findById(req.params.id);
          if (englishbooks) {
            await englishbooks.remove();
            res.status(200).json({ message: 'item removed' });
          }
        } catch (error) {
          res.status(404).json({ message: 'Item not found!' });
        }
      },
      review: async (req, res) => {
        try {
          const { rating, comment } = req.body;
          const englishbooks = await EnglishMedium.findById(req.params.id);
          if (englishbooks) {
            const alreadyReview = englishbooks.reviews.find(
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
            englishbooks.reviews.push(review);
            englishbooks.numReviews = englishbooks.reviews.length;
            englishbooks.rating =
              englishbooks.reviews.reduce((acc, item) => item.rating + acc, 0) /
              englishbooks.reviews.length;
            await englishbooks.save();
            res.status(201).json({ message: 'review added' });
          }
        } catch (error) {
          res.status(404).json({ message: 'Product not found!' });
        }
      },
}
module.exports = englishMedium