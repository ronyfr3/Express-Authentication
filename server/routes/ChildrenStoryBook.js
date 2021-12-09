const express = require('express');
const router = express.Router();
const childrenStoryBook = require('../controllers/ChildrenStoryBook')

router.get('/', childrenStoryBook.getAll)
router.get('/:id', childrenStoryBook.getOne)
router.patch('/', childrenStoryBook.update)
router.delete('/:id', childrenStoryBook.delete)
router.post('/', childrenStoryBook.create)
router.post("/:id/reviews", childrenStoryBook.review);

module.exports = router