const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import User model
const User = require('../models/User');

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@growexi.rw' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      name: 'GROWEXI Admin',
      email: 'admin@growexi.rw',
      password: 'admin123' // This will be hashed by the pre-save middleware
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@growexi.rw');
    console.log('Password: admin123');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();