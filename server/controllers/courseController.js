const Course = require('../models/Course');
const { validationResult } = require('express-validator');

// Get all courses (public)
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true })
      .select('-courseMaterialsLink') // Exclude sensitive data from public API
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses'
    });
  }
};

// Get single course (public)
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .select('-courseMaterialsLink'); // Exclude sensitive data from public API
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course'
    });
  }
};

// Admin: Get all courses with sensitive data
const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses'
    });
  }
};

// Admin: Create course
const createCourse = async (req, res) => {
  try {
    console.log('Creating course with data:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Filter out empty strings from arrays
    const courseData = {
      ...req.body,
      whatYoullLearn: req.body.whatYoullLearn.filter(item => item && item.trim() !== ''),
      whoCanJoin: req.body.whoCanJoin.filter(item => item && item.trim() !== '')
    };
    
    const course = new Course(courseData);
    await course.save();
    
    console.log('Course created successfully:', course._id);
    res.status(201).json({
      success: true,
      data: course,
      message: 'Course created successfully'
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
};

// Admin: Update course
const updateCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    // Filter out empty strings from arrays
    const courseData = {
      ...req.body,
      whatYoullLearn: req.body.whatYoullLearn.filter(item => item && item.trim() !== ''),
      whoCanJoin: req.body.whoCanJoin.filter(item => item && item.trim() !== '')
    };
    
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      courseData,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course,
      message: 'Course updated successfully'
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course'
    });
  }
};

// Admin: Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting course'
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  getAllCoursesAdmin,
  createCourse,
  updateCourse,
  deleteCourse
};
