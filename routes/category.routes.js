const router = require('express').Router();
const catController = require('../controllers/category.controller');

router.get('/:id', catController.getProOfCat);

module.exports = router;