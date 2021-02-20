const router = require('express').Router();
const multer = require('multer');
const productController = require('../../controllers/products.controller');
const isAdminRoute = require('../guards/auth.guards');


router.get('/products', isAdminRoute.isAdmin, productController.toAddProduct);
router.post('/addproduct', multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file ,cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    })
}).single('image'),isAdminRoute.isAdmin,  productController.addNewProduct);

router.get('/deleteProduct/:id',isAdminRoute.isAdmin, productController.deleteProductPost);
router.get('/updateProduct/:id',isAdminRoute.isAdmin, productController.updateProductPost);

module.exports = router;