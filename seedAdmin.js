require('dotenv').config();
const bcrypt = require('bcryptjs');
const { sequelize, User } = require('./models');

const seedAdmin = async () => {
  try {
    await sequelize.sync();
    const existing = await User.findOne({ where: { email: 'admin@store.com' } });

    if (existing) {
      console.log('Admin already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin',
      email: 'admin@store.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin created: admin@store.com / admin123');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedAdmin();