const express = require('express');
const router = express.Router();
const englishMedium = require('../controllers/EnglishMedium')

router.get('/',englishMedium.getAll)
router.get('/:id',englishMedium.getOne)
router.patch('/',englishMedium.update)
router.delete('/',englishMedium.delete)
router.post('/',englishMedium.create)

module.exports = router