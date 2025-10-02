const express = require('express');
const { body } = require('express-validator');
const auth = require('../../middleware/authMiddleware');
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

// Protected
router.post('/', auth, [
  body('title').trim().isLength({ min: 3 }).withMessage('Title is required'),
  body('content').trim().isLength({ min: 3 }).withMessage('Content is required')
], createAnnouncement);

router.put('/:id', auth, [
  body('title').optional().isLength({ min: 3 }),
  body('content').optional().isLength({ min: 3 })
], updateAnnouncement);

router.delete('/:id', auth, deleteAnnouncement);

module.exports = router;


