const router = require('express').Router();
const brandController = require('../controllers/brand.controller');

router.get('/:id', brandController.getProOfbrand);

module.exports = router;