const Application = require('../models/Application');
const Course = require('../models/Course');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send acceptance email
const sendAcceptanceEmail = async (application, course) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: application.applicantEmail,
      subject: `Congratulations! Your application for ${course.title} has been accepted`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0;">Congratulations!</h2>
          <p>Dear ${application.applicantName},</p>
          <p>Your application for <strong>${course.title}</strong> has been accepted!</p>
          <p>You can access the course materials here: <a href="${course.courseMaterialsLink}" style="color: #2c5aa0;">${course.courseMaterialsLink}</a></p>
          <p>We look forward to seeing you in the course!</p>
          <br>
          <p>Best regards,<br>GROWEXI Team</p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Acceptance email sent to ${application.applicantEmail}`);
  } catch (error) {
    console.error('Error sending acceptance email:', error);
    // Don't throw error - email failure shouldn't block status update
  }
};

// Submit application (public)
const submitApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation errors',
        errors: errors.array()
      });
    }

    const application = new Application(req.body);
    await application.save();
    
    res.status(201).json({
      success: true,
      data: application,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application'
    });
  }
};

// Admin: Get all applications
const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('course', 'title')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: applications
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications'
    });
  }
};

// Admin: Update application status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['Pending', 'Accepted', 'Rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be Pending, Accepted, or Rejected'
      });
    }

    const application = await Application.findById(req.params.id).populate('course');
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    const oldStatus = application.status;
    application.status = status;
    await application.save();
    
    // Send email if status changed to Accepted
    if (status === 'Accepted' && oldStatus !== 'Accepted') {
      await sendAcceptanceEmail(application, application.course);
    }
    
    res.json({
      success: true,
      data: application,
      message: `Application status updated to ${status}`
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating application status'
    });
  }
};

// Admin: Delete application
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    
    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Application deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting application'
    });
  }
};

module.exports = {
  submitApplication,
  getAllApplications,
  updateApplicationStatus,
  deleteApplication
};
