const express = require('express');
const router = express.Router();
const englishMedium = require('../controllers/EnglishMedium')

router.get('/lastweek', englishMedium.getByLastWeek)
router.get('/lastmonth', englishMedium.getByLastMonth)
router.get('/last6month', englishMedium.getByLast6Month)
router.get('/lastyear', englishMedium.getByLastYear)
router.get('/', englishMedium.getAll)
router.get('/:id', englishMedium.getOne)
router.patch('/', englishMedium.update)
router.delete('/:id', englishMedium.delete)
router.post('/', englishMedium.create)
router.post("/:id/reviews", englishMedium.review);

module.exports = router