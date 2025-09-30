const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

const connectDB = require('./config/db');
const inquiryRoutes = require('./routes/api/inquiries');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration - allow env origin and any localhost port
const allowedOrigins = [process.env.CLIENT_URL].filter(Boolean);
const isLocalhostOrigin = (origin) => {
  try {
    const url = new URL(origin);
    return url.hostname === 'localhost';
  } catch {
    return false;
  }
};

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || isLocalhostOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Logging middleware
app.use(morgan('combined'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limit contact form submissions
const inquiriesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per window
  standardHeaders: true,
  legacyHeaders: false
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'GROWEXI API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
app.use('/api/inquiries', inquiriesLimiter, inquiryRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GROWEXI Server running on port ${PORT}`);
  console.log(`📧 Email notifications: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🗄️ Database: ${process.env.MONGO_URI ? 'Configured' : 'Not configured'}`);

  // Verify email transporter if credentials are present
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    transporter.verify((error, success) => {
      if (error) {
        console.error('📧 Email transporter verification failed:', error.message);
      } else {
        console.log('📧 Email transporter is ready to send messages');
      }
    });
  } else {
    console.warn('📧 Email credentials not set; inquiry emails will be skipped.');
  }
});
