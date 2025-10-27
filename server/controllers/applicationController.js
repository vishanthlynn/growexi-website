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

// Send notification email to admin when new application is submitted
const sendNotificationEmail = async (application, course) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || 'info@growexi.rw',
      subject: `New Course Application - ${course.title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5aa0;">New Course Application</h2>
          <p>You have received a new application for a course.</p>
          
          <h3 style="color: #333; margin-top: 20px;">Course Details:</h3>
          <p><strong>Course:</strong> ${course.title}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Applicant Details:</h3>
          <p><strong>Name:</strong> ${application.applicantName}</p>
          <p><strong>Email:</strong> ${application.applicantEmail}</p>
          
          <h3 style="color: #333; margin-top: 20px;">Reason for Applying:</h3>
          <p>${application.reasonForApplying}</p>
          
          <p style="margin-top: 30px;">
            <a href="${process.env.CLIENT_URL || 'https://admin.growexi.org'}/applications" 
               style="background-color: #2c5aa0; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              View in Admin Portal
            </a>
          </p>
          
          <br>
          <p>Best regards,<br>GROWEXI System</p>
        </div>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to admin about new application`);
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw error - email failure shouldn't block application submission
  }
};

// Send acceptance email to student when application is accepted
const sendAcceptanceEmail = async (application, course) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: application.applicantEmail,
      subject: `Congratulations! Your application for ${course.title} is accepted!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p>Dear ${application.applicantName},</p>
          <p>We are excited to inform you that your application for the course "<strong>${course.title}</strong>" has been accepted.</p>
          <p>You can access all the course materials, including video links, at the private link below:</p>
          <p style="margin: 20px 0;">
            <a href="${course.courseMaterialsLink}" 
               style="background-color: #2c5aa0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Start Learning Now
            </a>
          </p>
          <p>Best regards,<br>The GROWEXI Team</p>
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
    
    // Send notification email to admin
    try {
      const course = await Course.findById(req.body.course);
      if (course) {
        await sendNotificationEmail(application, course);
      }
    } catch (emailError) {
      console.error('Error sending notification email:', emailError);
      // Don't fail the request if email fails
    }
    
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
