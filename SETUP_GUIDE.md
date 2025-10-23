# GROWEXI Setup Guide

This guide will help you set up the complete GROWEXI MERN application with all three projects.

## 🚀 Quick Setup

### 1. Prerequisites

Make sure you have the following installed:
- Node.js (>=16.0.0)
- MongoDB (local or cloud)
- Git

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd growexi-website

# Install all dependencies
npm run install-all
```

### 3. Environment Configuration

#### Server Environment
```bash
# Copy the example file
cp server/env.example server/.env

# Edit server/.env with your configuration:
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb://localhost:27017/growexi
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLIENT_URL=http://localhost:3000
```

#### Client Environment
```bash
# Copy the example file
cp client/env.example client/.env

# Edit client/.env:
VITE_API_URL=http://localhost:5001
```

#### Admin Environment
```bash
# Copy the example file
cp admin/env.example admin/.env

# Edit admin/.env:
VITE_API_URL=http://localhost:5001
```

### 4. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Compass
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGO_URI` in `server/.env`

### 5. Email Configuration (Optional but Recommended)

For email notifications to work:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate an App Password
   - Use your Gmail and App Password in `server/.env`

2. **Other Email Services:**
   - Update the transporter configuration in `server/controllers/applicationController.js`

### 6. Create Admin User

```bash
# Navigate to server directory
cd server

# Create the first admin user
npm run create-admin

# This will create:
# Email: admin@growexi.rw
# Password: admin123
```

### 7. Start Development Servers

```bash
# From the root directory, start all servers
npm run dev

# This will start:
# - Backend API: http://localhost:5001
# - Public Website: http://localhost:3000
# - Admin Portal: http://localhost:3001
```

## 🔧 Individual Server Commands

If you prefer to run servers individually:

```bash
# Backend API only
npm run server

# Public website only
npm run client

# Admin portal only
cd admin && npm run dev
```

## 📱 Access Points

After starting all servers:

1. **Public Website**: http://localhost:3000
   - Browse courses
   - Apply for courses
   - View announcements

2. **Admin Portal**: http://localhost:3001
   - Login with admin credentials
   - Manage courses
   - Review applications
   - Create announcements

3. **API Documentation**: http://localhost:5001/health
   - Check API status
   - View available endpoints

## 🗄️ Database Models

The application uses four main models:

### User (Admin Only)
- `name`: Admin's full name
- `email`: Unique email address
- `password`: Hashed password

### Course
- `title`: Course title
- `subtitle`: Course subtitle
- `description`: Detailed description
- `whatYoullLearn`: Array of learning outcomes
- `whoCanJoin`: Array of target audience
- `outcome`: Expected outcome
- `isActive`: Course availability
- `courseMaterialsLink`: Private materials link

### Application
- `course`: Reference to Course
- `applicantName`: Applicant's name
- `applicantEmail`: Applicant's email
- `reasonForApplying`: Application reason
- `status`: Pending/Accepted/Rejected

### Announcement
- `title`: Announcement title
- `content`: Announcement content
- `isMarquee`: Homepage marquee flag

## 🔐 Security Features

- **JWT Authentication**: Secure admin access
- **Password Hashing**: bcryptjs encryption
- **Input Validation**: Express-validator
- **Rate Limiting**: Prevents abuse
- **CORS Protection**: Configured origins
- **Helmet**: Security headers

## 📧 Email Notifications

When an application is accepted:
1. System retrieves course details
2. Sends email to applicant
3. Includes course materials link
4. Graceful error handling

## 🚀 Production Deployment

### Environment Variables
Update all `.env` files with production values:
- Use production MongoDB URI
- Set strong JWT secret
- Configure production email service
- Update CORS origins

### Build Commands
```bash
# Build both frontends
npm run build

# Start production server
npm start
```

## 🛠️ Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check MongoDB is running
   - Verify MONGO_URI in .env
   - Ensure database exists

2. **Email Not Sending**
   - Verify EMAIL_USER and EMAIL_PASS
   - Check Gmail App Password
   - Test email configuration

3. **CORS Errors**
   - Update CLIENT_URL in server/.env
   - Check allowed origins

4. **Port Already in Use**
   - Change PORT in server/.env
   - Kill existing processes

### Logs and Debugging

```bash
# Check server logs
cd server && npm run dev

# Check client logs
cd client && npm run dev

# Check admin logs
cd admin && npm run dev
```

## 📞 Support

For technical support:
- Email: info@growexi.rw
- Phone: +250 781184517

## 🎯 Next Steps

1. **Create your first course** in the admin portal
2. **Set up announcements** for the homepage
3. **Test the application flow** by applying for a course
4. **Configure email notifications**
5. **Customize the design** to match your branding

---

**GROWEXI Rwanda** - Growing Rwanda's Opportunities & Workforce Expertise and Innovation
