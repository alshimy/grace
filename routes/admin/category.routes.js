const router = require('express').Router();
const categoryController = require('./../../controllers/category.controller');
const bodyParser = require('body-parser');
const isAdminRoute = require('../guards/auth.guards');

router.get('/categories', isAdminRoute.isAdmin, categoryController.getAllCategory);
router.post('/addCategory', isAdminRoute.isAdmin, bodyParser.urlencoded({extended: false}), categoryController.addNewCategory);
router.get('/category/:id', isAdminRoute.isAdmin, categoryController.getProductsOfCategory);
module.exports = router;