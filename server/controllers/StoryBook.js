const StoryBook = require('../models/StoryBook')


const storyBook ={
    getAll: async (req, res) => {
        try {
          const storybook = await StoryBook.find();
          res.json(storybook);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      getOne: async (req, res) => {
        try {
          const storybook = await Stationary.findById(req.params.id);
    
          res.json(storybook);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },
      create: async (req, res) => {
        try {
          const {
            writer_name,
            title,
            brand,
            category,
            image,
            description,
            main,
            sell,
            buy
          } = req.body;
          const stationary = new Stationary({
            writer_name,
            title,
            brand,
            category,
            image,
            description,
            main,
            sell,
            buy
          });
    
          const createdStoryBook= await StoryBook.save();
          res
            .status(201)
            .json({ createdStoryBook, message: 'Item created successfully' });
        } catch (error) {
          res.status(400).json({ message: 'Item not created' });
        }
      },
      update: async (req, res) => {
        try {
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
              .json({ updatedStoryBook, message: 'Item updated successfully' });
          }
        } catch (error) {
          res.status(404).json({ message: 'Item Not Found!' });
        }
      },
      delete: async (req, res) => {
        try {
          const storybook = await StoryBook.findById(req.params.id);
          if (storybook) {
            await storybook.remove();
            res.status(200).json({ message: 'item removed' });
          }
        } catch (error) {
          res.status(404).json({ message: 'Item not found!' });
        }
      },
      review: async (req, res) => {
        try {
          const { rating, comment } = req.body;
          const storybook = await StoryBook.findById(req.params.id);
          if (storybook) {
            const alreadyReview = storybook.reviews.find(
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
            storybook.reviews.push(review);
            storybook.numReviews = storybook.reviews.length;
            storybook.rating =
              storybook.reviews.reduce((acc, item) => item.rating + acc, 0) /
              storybook.reviews.length;
            await storybook.save();
            res.status(201).json({ message: 'review added' });
          }
        } catch (error) {
          res.status(404).json({ message: 'Product not found!' });
        }
      },
}
module.exports = storyBook