# GROWEXI Rwanda Website

A transformative learning and innovation hub website committed to equipping Rwandans with future-ready skills across multiple sectors.

## 🚀 Project Overview

GROWEXI (Growing Rwanda's Opportunities & Workforce Expertise and Innovation) is a dynamic training and innovation company designed to bridge Rwanda's workforce readiness gap across multiple sectors. This website serves as the digital platform to showcase our services, connect with learners, and build strategic partnerships.

### Vision
To become Rwanda's leading center for lifelong learning and professional growth.

### Mission
To empower 5,000 learners in 5 years through accessible, relevant, and high-impact training.

## 🛠️ Technology Stack

- **Frontend:** React 18+ with Vite
- **Styling:** Tailwind CSS with custom Rwandan-inspired design
- **Backend:** Node.js with Express.js
- **Database:** MongoDB with Mongoose
- **Email Service:** Nodemailer with Gmail SMTP
- **Deployment:** Heroku (backend) + Netlify (frontend)

## 📁 Project Structure

```
growexi-website/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── server/                # Node.js backend API
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   └── routes/           # API routes
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account (for database)
- Gmail account (for email service)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd growexi-website
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server/` directory:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/growexi
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   EMAIL_RECIPIENT=info@growexi.rw
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   This will start both the frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## 🎨 Design System

### Color Palette (Rwandan-Inspired)
- **Primary Blue:** #1E3A8A (Peace and stability)
- **Secondary Green:** #059669 (Hope and prosperity)
- **Accent Yellow:** #F59E0B (Economic development)
- **Neutral Gray:** #6B7280 (Professional foundation)

### Typography
- **Primary Font:** Inter (modern, professional)
- **Headings:** Bold, clear hierarchy
- **Body Text:** Readable, accessible contrast

## 📋 Features

### Frontend Features
- Responsive design for all devices
- Rwandan-inspired visual design
- Interactive contact form
- Service showcase with enrollment links
- Success stories and testimonials
- Professional company information

### Backend Features
- RESTful API endpoints
- MongoDB integration
- Email notification system
- Form validation and error handling
- CORS configuration
- Environment-based configuration

## 🔧 Available Scripts

- `npm run dev` - Start both frontend and backend in development mode
- `npm run client` - Start only the frontend development server
- `npm run server` - Start only the backend development server
- `npm run build` - Build the frontend for production
- `npm start` - Start the production server

## 🌐 Deployment

### Backend (Heroku)
1. Create a Heroku app
2. Set environment variables in Heroku dashboard
3. Deploy using Git

### Frontend (Netlify)
1. Connect GitHub repository to Netlify
2. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `client/dist`
3. Set environment variables for API URL

## 📞 Contact

- **Email:** info@growexi.rw
- **Phone:** +250 781184517
- **Address:** Kigali Innovation City, Kigali, Rwanda

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Rwanda's Vision 2050
- Built with modern web technologies
- Designed with Rwandan cultural elements
- Committed to inclusive and accessible design

---

**GROWEXI Rwanda** - Empowering 5,000 learners in 5 years through accessible, relevant, and high-impact training.
