const router = require('express').Router();
const productController = require('../../controllers/products.controller');
const adminController = require('../../controllers/admin.controller');
const bodyParser = require('body-parser');
const check = require('express-validator').check;
const isAdminRoute = require('../guards/auth.guards');

router.get('/',isAdminRoute.isNotAdmin, productController.getAllProductsToAdmin);

router.get('/login', isAdminRoute.isNotAuthAdmin, (req, res, next) => {
    res.render('admin/loginAdmin', {
        isAdmin: req.session.adminID
    });
});
router.post('/login',
    bodyParser.urlencoded({ extended: false }),
    check('password').notEmpty().withMessage('Password field is required').isLength({ min: 6, max: 12 }).withMessage('Password Length from 6 to 12!'),
    adminController.postLoginUser);

module.exports = router;