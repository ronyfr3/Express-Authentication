const express = require('express');
const router = express.Router();
const storyBook = require('../controllers/StoryBook')

router.get('/',storyBook.getAll)
router.get('/',storyBook.getOne)
router.patch('/',storyBook.update)
router.delete('/',storyBook.delete)
router.post('/',storyBook.create)

module.exports = router