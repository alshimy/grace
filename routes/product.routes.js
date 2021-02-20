const router = require("express").Router();
const productsConroller = require("../controllers/products.controller");

router.get("/:id", productsConroller.getProduct);

module.exports = router;
