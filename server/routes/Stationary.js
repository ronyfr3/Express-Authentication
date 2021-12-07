const express = require('express');
const router = express.Router();
const stationary = require('../controllers/Stationary')

router.get('/', stationary.getAll)
router.get('/:id', stationary.getOne)
router.patch('/', stationary.update)
router.delete('/:id', stationary.delete)
router.post('/', stationary.create)
router.post("/:id/reviews", stationary.review);

module.exports = router