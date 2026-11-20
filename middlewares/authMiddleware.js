const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { User } = require('../models');

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new AppError('No token provided', 401));
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return next(new AppError('User no longer exists', 401));
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const restrictToAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(new AppError('Access denied: Admins only', 403));
  }
  next();
};

module.exports = { protect, restrictToAdmin };