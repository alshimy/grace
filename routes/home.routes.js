const router = require('express').Router();
const productController = require('../controllers/products.controller');

router.get('/', productController.getAllProducts);

module.exports = router;