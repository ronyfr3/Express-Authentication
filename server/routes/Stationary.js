const express = require('express');
const router = express.Router();
const stationary = require('../controllers/Stationary')

router.get('/',stationary.getAll)
router.get('/',stationary.getOne)
router.patch('/',stationary.update)
router.delete('/',stationary.delete)
router.post('/',stationary.create)

module.exports = router