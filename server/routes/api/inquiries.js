const express = require('express');
const { body } = require('express-validator');
const {
  submitInquiry,
  getAllInquiries,
  updateInquiryStatus
} = require('../../controllers/inquiryController');

const router = express.Router();

// Validation middleware
const inquiryValidation = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters'),
  body('serviceInterest')
    .optional()
    .isIn([
      'Professional Development',
      'Entrepreneurship & Business Growth',
      'Data Analysis & Digital Tools',
      'Research & Methodology',
      'Digital Skills',
      'General Inquiry'
    ])
    .withMessage('Invalid service interest selection'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// Routes

// POST /api/inquiries - Submit new inquiry
router.post('/', inquiryValidation, submitInquiry);

// GET /api/inquiries - Get all inquiries (admin)
router.get('/', getAllInquiries);

// PUT /api/inquiries/:id - Update inquiry status (admin)
router.put('/:id', updateInquiryStatus);

module.exports = router;
