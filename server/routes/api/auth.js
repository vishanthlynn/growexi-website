const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser } = require('../../controllers/authController');

const router = express.Router();

router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], registerUser);

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], loginUser);

module.exports = router;


