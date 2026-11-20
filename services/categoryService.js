const { Category } = require('../models');
const AppError = require('../utils/AppError');

const getAllCategories = async () => {
  return await Category.findAll();
};

const createCategory = async ({ name }) => {
  if (!name || !name.trim()) {
    throw new AppError('Category name is required', 400);
  }

  return await Category.create({ name: name.trim() });
};

module.exports = { getAllCategories, createCategory };