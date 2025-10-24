const express = require('express');
const { body } = require('express-validator');
const {
  getAllCourses,
  getCourseById,
  getAllCoursesAdmin,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../../controllers/courseController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const courseValidation = [
  body('title').trim().isLength({ min: 3, max: 200 }).withMessage('Title must be 3-200 characters'),
  body('subtitle').trim().isLength({ min: 3, max: 300 }).withMessage('Subtitle must be 3-300 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('whatYoullLearn').isArray({ min: 1 }).withMessage('What you\'ll learn must be an array with at least 1 item'),
  body('whoCanJoin').isArray({ min: 1 }).withMessage('Who can join must be an array with at least 1 item'),
  body('outcome').trim().isLength({ min: 10 }).withMessage('Outcome must be at least 10 characters'),
  body('courseMaterialsLink').optional().isURL().withMessage('Course materials link must be a valid URL')
];

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Admin routes (protected)
router.get('/admin/all', authMiddleware, getAllCoursesAdmin);
router.post('/admin', authMiddleware, courseValidation, createCourse);
router.put('/admin/:id', authMiddleware, courseValidation, updateCourse);
router.delete('/admin/:id', authMiddleware, deleteCourse);

module.exports = router;
