const express = require('express');
const { body } = require('express-validator');
const auth = require('../../middleware/authMiddleware');
const adminAuth = require('../../middleware/adminMiddleware');
const {
  getAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  getMarquee
} = require('../../controllers/announcementController');

const router = express.Router();

// Public
router.get('/', getAnnouncements);
router.get('/marquee', getMarquee);

// Protected - Admin only
router.post('/', adminAuth, [
  body('title').trim().isLength({ min: 3 }).withMessage('Title is required'),
  body('content').trim().isLength({ min: 3 }).withMessage('Content is required')
], createAnnouncement);

router.put('/:id', adminAuth, [
  body('title').optional().isLength({ min: 3 }),
  body('content').optional().isLength({ min: 3 })
], updateAnnouncement);

router.delete('/:id', adminAuth, deleteAnnouncement);

module.exports = router;


