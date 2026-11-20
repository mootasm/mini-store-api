const categoryService = require('../services/categoryService');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json({ status: 'success', data: categories });
  } catch (err) {
    next(err);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({ status: 'success', data: category });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllCategories, createCategory };