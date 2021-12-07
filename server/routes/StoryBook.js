const express = require('express');
const router = express.Router();
const storyBook = require('../controllers/StoryBook')

router.get('/', storyBook.getAll)
router.get('/:id', storyBook.getOne)
router.patch('/', storyBook.update)
router.delete('/:id', storyBook.delete)
router.post('/', storyBook.create)
router.post("/:id/reviews", storyBook.review);

module.exports = router