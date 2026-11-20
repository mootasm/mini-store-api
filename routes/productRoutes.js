const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', protect, restrictToAdmin, productController.createProduct);
router.put('/:id', protect, restrictToAdmin, productController.updateProduct);
router.delete('/:id', protect, restrictToAdmin, productController.deleteProduct);

module.exports = router;