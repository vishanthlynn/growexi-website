const { validationResult } = require('express-validator');
const Announcement = require('../models/Announcement');

exports.getAnnouncements = async (req, res) => {
  try {
    const items = await Announcement.find().sort({ createdAt: -1 });
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
    const { title, content, isMarquee } = req.body;
    if (isMarquee) {
      await Announcement.updateMany({ isMarquee: true }, { $set: { isMarquee: false } });
    }
    const doc = await Announcement.create({ title, content, isMarquee: !!isMarquee });
    return res.status(201).json({ success: true, data: doc });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, isMarquee } = req.body;
    if (isMarquee) {
      await Announcement.updateMany({ isMarquee: true, _id: { $ne: id } }, { $set: { isMarquee: false } });
    }
    const doc = await Announcement.findByIdAndUpdate(
      id,
      { title, content, isMarquee: !!isMarquee, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: doc });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getMarquee = async (req, res) => {
  try {
    const doc = await Announcement.findOne({ isMarquee: true }).sort({ createdAt: -1 });
    return res.json({ success: true, data: doc || null });
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


