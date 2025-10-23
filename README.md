# GROWEXI - Complete MERN Application

A comprehensive MERN stack application for GROWEXI Rwanda, featuring a public client website, private admin portal, and backend API for course management and application handling.

## 🏗️ Architecture

This application consists of three separate projects:

1. **Backend API** (`/server`) - Node.js/Express API with MongoDB
2. **Public Client Website** (`/client`) - React frontend for public users
3. **Admin Portal** (`/admin`) - React frontend for administrators

## 🚀 Quick Start

### Prerequisites

- Node.js (>=16.0.0)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd growexi-website
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Copy the example environment files and configure them:
   ```bash
   # Server environment
   cp server/env.example server/.env
   
   # Client environment  
   cp client/env.example client/.env
   
   # Admin environment
   cp admin/env.example admin/.env
   ```

4. **Configure your environment variables**
   
   Edit `server/.env`:
   ```env
   NODE_ENV=development
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/growexi
   JWT_SECRET=your_jwt_secret_here
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   CLIENT_URL=http://localhost:3000
   ```

   Edit `client/.env` and `admin/.env`:
   ```env
   VITE_API_URL=http://localhost:5001
   ```

5. **Start the development servers**
   ```bash
   # Start all servers concurrently
   npm run dev
   
   # Or start individually:
   npm run server    # Backend API (port 5001)
   npm run client    # Public website (port 3000)
   cd admin && npm run dev  # Admin portal (port 3001)
   ```

## 📁 Project Structure

```
growexi-website/
├── server/                 # Backend API
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Authentication middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── client/               # Public website
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   └── App.jsx       # Main app component
│   └── package.json
├── admin/                # Admin portal
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Admin pages
│   │   └── utils/        # Auth context
│   └── package.json
└── package.json          # Root package.json
```

## 🔧 Features

### Backend API Features
- **Authentication**: JWT-based admin authentication
- **Models**: User, Course, Application, Announcement
- **Email Notifications**: Automatic emails for accepted applications
- **Security**: Rate limiting, CORS, input validation
- **Public/Protected Routes**: Separate endpoints for public and admin access

### Public Website Features
- **Course Browsing**: View all available courses
- **Course Details**: Detailed course information
- **Application System**: Apply for courses without registration
- **Announcements**: Display site announcements and marquee
- **Responsive Design**: Mobile-friendly interface

### Admin Portal Features
- **Dashboard**: Overview of courses and applications
- **Course Management**: Full CRUD operations for courses
- **Application Management**: Review and update application status
- **Announcement Management**: Create and manage site announcements
- **Email Integration**: Automatic notifications for accepted applications

## 🗄️ Database Models

### User Model
- `name`: Admin's full name
- `email`: Unique email address
- `password`: Hashed password
- `createdAt`: Account creation date

### Course Model
- `title`: Course title
- `subtitle`: Course subtitle
- `description`: Detailed description
- `whatYoullLearn`: Array of learning outcomes
- `whoCanJoin`: Array of target audience
- `outcome`: Expected outcome
- `isActive`: Course availability status
- `courseMaterialsLink`: Private link to course materials

### Application Model
- `course`: Reference to Course model
- `applicantName`: Applicant's full name
- `applicantEmail`: Applicant's email
- `reasonForApplying`: Application reason
- `status`: Pending/Accepted/Rejected
- `createdAt`: Application date

### Announcement Model
- `title`: Announcement title
- `content`: Announcement content
- `isMarquee`: Display as homepage marquee
- `createdAt`: Creation date

## 🔐 Authentication

- **Admin Access Only**: No public registration
- **JWT Tokens**: Secure authentication
- **Manual Admin Creation**: Admins created directly in database
- **Protected Routes**: Admin-only endpoints

## 📧 Email Notifications

When an application status is updated to "Accepted":
1. System retrieves course details
2. Sends email to applicant with course materials link
3. Email includes course title and access instructions
4. Graceful error handling for email failures

## 🚀 Deployment

### Environment Setup
1. Set up MongoDB (local or cloud)
2. Configure email service (Gmail recommended)
3. Set production environment variables
4. Update CORS settings for production domains

### Build Commands
```bash
# Build client website
npm run build

# Start production server
npm start
```

## 🛠️ Development

### Available Scripts

**Root Level:**
- `npm run dev` - Start all development servers
- `npm run server` - Start backend API only
- `npm run client` - Start public website only
- `npm run install-all` - Install all dependencies

**Individual Projects:**
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm start` - Production server

### API Endpoints

**Public Endpoints:**
- `GET /api/courses` - Get all active courses
- `GET /api/courses/:id` - Get single course
- `POST /api/applications` - Submit application
- `GET /api/announcements` - Get announcements

**Admin Endpoints:**
- `POST /api/auth/login` - Admin login
- `GET /api/courses/admin/all` - Get all courses (with sensitive data)
- `POST /api/courses/admin` - Create course
- `PUT /api/courses/admin/:id` - Update course
- `DELETE /api/courses/admin/:id` - Delete course
- `GET /api/applications/admin/all` - Get all applications
- `PUT /api/applications/admin/:id/status` - Update application status
- `DELETE /api/applications/admin/:id` - Delete application

## 🔒 Security Features

- **Input Validation**: Express-validator for all inputs
- **Rate Limiting**: Prevents abuse of contact forms
- **CORS Protection**: Configured for specific origins
- **Helmet**: Security headers
- **Password Hashing**: bcryptjs for secure passwords
- **JWT Tokens**: Secure authentication

## 📱 Responsive Design

All three applications are fully responsive and mobile-friendly:
- Mobile-first design approach
- Touch-friendly interfaces
- Optimized for all screen sizes
- Modern UI/UX patterns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Email: info@growexi.rw
- Phone: +250 781184517
- Address: Norrsken House Kigali, Kigali, Rwanda

---

**GROWEXI Rwanda** - Growing Rwanda's Opportunities & Workforce Expertise and Innovation