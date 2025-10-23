const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 200
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  whatYoullLearn: [{
    type: String,
    required: true,
    trim: true
  }],
  whoCanJoin: [{
    type: String,
    required: true,
    trim: true
  }],
  outcome: {
    type: String,
    required: true,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  courseMaterialsLink: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Course', courseSchema);
