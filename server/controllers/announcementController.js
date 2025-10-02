const { validationResult } = require('express-validator');
const Announcement = require('../models/Announcement');

exports.getAnnouncements = async (req, res) => {
  try {
    const items = await Announcement.find().sort({ createdAt: -1 }).populate('author', 'name email');
    return res.json({ success: true, data: items });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: 'Validation failed', errors: errors.array() });
    }
    const { title, content } = req.body;
    const doc = await Announcement.create({ title, content, author: req.user._id });
    return res.status(201).json({ success: true, data: doc });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const doc = await Announcement.findByIdAndUpdate(id, { title, content, updatedAt: Date.now() }, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: doc });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Announcement.findByIdAndDelete(id);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


