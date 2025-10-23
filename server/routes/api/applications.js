const express = require('express');
const { body } = require('express-validator');
const {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication
} = require('../../controllers/applicationController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// Validation rules for application submission
const applicationValidation = [
  body('course').isMongoId().withMessage('Valid course ID is required'),
  body('applicantName').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('applicantEmail').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('reasonForApplying').trim().isLength({ min: 10, max: 1000 }).withMessage('Reason must be 10-1000 characters')
];

// Public route
router.post('/', applicationValidation, submitApplication);

// Admin routes (protected)
router.get('/admin/all', authMiddleware, getAllApplications);
router.put('/admin/:id/status', authMiddleware, [
  body('status').isIn(['Pending', 'Accepted', 'Rejected']).withMessage('Status must be Pending, Accepted, or Rejected')
], updateApplicationStatus);
router.delete('/admin/:id', authMiddleware, deleteApplication);

module.exports = router;
