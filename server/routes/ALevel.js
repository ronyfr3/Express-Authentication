const express = require('express');
const router = express.Router();
const aLevel = require('../controllers/ALevel')

router.get('/', aLevel.getAll)
router.get('/:id', aLevel.getOne)
router.patch('/', aLevel.update)
router.delete('/:id', aLevel.delete)
router.post('/', aLevel.create)
router.post("/:id/reviews", aLevel.review);

module.exports = router