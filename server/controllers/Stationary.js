const Stationary = require('../models/Stationary');

const stationary = {
  getAll: async (req, res) => {
    try {
      const stationaries = await Stationary.find();
      res.json(stationaries);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const stationary = await Stationary.findById(req.params.id);

      res.json(stationary);
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
        bulk_price,
        sell_single,
        buy_single,
        image,
      } = req.body;
      const stationary = new Stationary({
        title,
        brand,
        category,
        description,
        product_type,
        bulk_price,
        sell_single,
        buy_single,
        image,
      });

      const createdStationary = await stationary.save();
      res
        .status(201)
        .json({ createdStationary, message: 'Item created successfully' });
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
        description,
        product_type,
        bulk_price,
        sell_single,
        buy_single,
        image,
        countInStock,
      } = req.body;
      const stationary = await Stationary.findById(req.params.id);
      if (stationary) {
        stationary.title = title;
        stationary.image = image;
        stationary.category = category;
        stationary.description = description;
        stationary.brand = brand;
        stationary.product_type = product_type;
        stationary.bulk_price = bulk_price;
        stationary.sell_single = sell_single;
        stationary.buy_single = buy_single;
        stationary.countInStock = countInStock;

        const updatedStationary = await stationary.save();
        res
          .status(200)
          .json({ updatedStationary, message: 'Item updated successfully' });
      }
    } catch (error) {
      res.status(404).json({ message: 'Item Not Found!' });
    }
  },
  delete: async (req, res) => {
    try {
      const stationary = await Stationary.findById(req.params.id);
      if (stationary) {
        await stationary.remove();
        res.status(200).json({ message: 'item removed' });
      }
    } catch (error) {
      res.status(404).json({ message: 'Item not found!' });
    }
  },
  review: async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const stationary = await Stationary.findById(req.params.id);
      if (stationary) {
        const alreadyReview = stationary.reviews.find(
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
        stationary.reviews.push(review);
        stationary.numReviews = stationary.reviews.length;
        stationary.rating =
          stationary.reviews.reduce((acc, item) => item.rating + acc, 0) /
          stationary.reviews.length;
        await stationary.save();
        res.status(201).json({ message: 'review added' });
      }
    } catch (error) {
      res.status(404).json({ message: 'Product not found!' });
    }
  },
};
module.exports = stationary;
