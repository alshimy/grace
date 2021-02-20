const router = require('express').Router();
const isAdminRoute = require('../guards/auth.guards');

const brandController = require('./../../controllers/brand.controller');
const bodyParser = require('body-parser');

router.get('/brands', isAdminRoute.isAdmin, brandController.getAllBrands);
router.post('/addBrand',isAdminRoute.isAdmin, bodyParser.urlencoded({extended: false}), brandController.addNewBrand);
router.get('/brand/:id', isAdminRoute.isAdmin, brandController.getProductsOfBrand);

module.exports = router;