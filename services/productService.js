const { Product, Category } = require('../models');
const AppError = require('../utils/AppError');

const getAllProducts = async () => {
  return await Product.findAll({
    include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
  });
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id, {
    include: [{ model: Category, as: 'category', attributes: ['id', 'name'] }],
  });

  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
};

const createProduct = async ({ name, description, price, stock, categoryId }) => {
  if (!name || price === undefined || stock === undefined || !categoryId) {
    throw new AppError('name, price, stock, and categoryId are required', 400);
  }

  const category = await Category.findByPk(categoryId);
  if (!category) {
    throw new AppError('Category not found', 404);
  }

  const product = await Product.create({
    name,
    description,
    price,
    stock,
    categoryId,
  });

  return await getProductById(product.id);
};

const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  if (data.categoryId) {
    const category = await Category.findByPk(data.categoryId);
    if (!category) {
      throw new AppError('Category not found', 404);
    }
  }

  await product.update(data);
  return await getProductById(product.id);
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  await product.destroy();
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};