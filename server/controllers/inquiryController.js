const Inquiry = require('../models/Inquiry');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const createNotificationEmail = (inquiry) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Inquiry - GROWEXI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1E3A8A; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1E3A8A; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GROWEXI Rwanda</h1>
          <h2>New Inquiry Received</h2>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Name:</div>
            <div class="value">${inquiry.name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${inquiry.email}</div>
          </div>
          ${inquiry.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${inquiry.phone}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Service Interest:</div>
            <div class="value">${inquiry.serviceInterest}</div>
          </div>
          <div class="field">
            <div class="label">Message:</div>
            <div class="value">${inquiry.message}</div>
          </div>
          <div class="field">
            <div class="label">Submitted:</div>
            <div class="value">${new Date(inquiry.createdAt).toLocaleString()}</div>
          </div>
        </div>
        <div class="footer">
          <p>This inquiry was submitted through the GROWEXI website contact form.</p>
          <p>Please respond to the customer within 24 hours.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

const createConfirmationEmail = (inquiry) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Thank You - GROWEXI</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #1E3A8A; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .footer { text-align: center; padding: 20px; color: #666; }
        .cta { background-color: #059669; color: white; padding: 15px; text-align: center; margin: 20px 0; }
        .cta a { color: white; text-decoration: none; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GROWEXI Rwanda</h1>
          <h2>Thank You for Your Interest!</h2>
        </div>
        <div class="content">
          <p>Dear ${inquiry.name},</p>
          <p>Thank you for reaching out to GROWEXI Rwanda! We have received your inquiry about our <strong>${inquiry.serviceInterest}</strong> services.</p>
          <p>Our team will review your message and respond within 24 hours. We're excited about the possibility of supporting your learning and professional development journey.</p>
          <div class="cta">
            <p>While you wait, explore our programs:</p>
            <p><a href="#">View All Services</a> | <a href="#">Join a Workshop</a></p>
          </div>
          <p>Best regards,<br>The GROWEXI Team</p>
        </div>
        <div class="footer">
          <p>GROWEXI Rwanda - Empowering 5,000 learners in 5 years</p>
          <p>Email: info@growexi.rw | Phone: +250 781184517</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Submit new inquiry
const submitInquiry = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, phone, serviceInterest, message } = req.body;

    // Create new inquiry
    const inquiry = new Inquiry({
      name,
      email,
      phone,
      serviceInterest,
      message
    });

    // Save to database
    await inquiry.save();

    // Send notification email to GROWEXI
    const transporter = createTransporter();
    
    const notificationMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT,
      subject: `New Inquiry from ${name} - ${serviceInterest}`,
      html: createNotificationEmail(inquiry)
    };

    // Send confirmation email to user
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank You for Contacting GROWEXI Rwanda',
      html: createConfirmationEmail(inquiry)
    };

    // Send both emails
    await transporter.sendMail(notificationMailOptions);
    await transporter.sendMail(confirmationMailOptions);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully. We will contact you within 24 hours.',
      data: {
        id: inquiry._id,
        name: inquiry.name,
        email: inquiry.email,
        serviceInterest: inquiry.serviceInterest,
        status: inquiry.status,
        createdAt: inquiry.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all inquiries (admin function)
const getAllInquiries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};
    if (status) {
      query.status = status;
    }

    const inquiries = await Inquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Inquiry.countDocuments(query);

    res.json({
      success: true,
      data: {
        inquiries,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update inquiry status (admin function)
const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: new, in-progress, resolved, closed'
      });
    }

    const inquiry = await Inquiry.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found'
      });
    }

    res.json({
      success: true,
      message: 'Inquiry status updated successfully',
      data: inquiry
    });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  submitInquiry,
  getAllInquiries,
  updateInquiryStatus
};
