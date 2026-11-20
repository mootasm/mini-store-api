const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { protect, restrictToAdmin } = require('../middlewares/authMiddleware');

router.get('/', categoryController.getAllCategories);
router.post('/', protect, restrictToAdmin, categoryController.createCategory);

module.exports = router;