# GROWEXI Website Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB Atlas account
- Gmail account with App Password
- Heroku account (for backend)
- Netlify account (for frontend)

### 1. Install Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

### 2. Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `server/` directory:

```env
# Database Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/growexi?retryWrites=true&w=majority

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_RECIPIENT=info@growexi.rw

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

#### Frontend Environment Variables
Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update the `MONGO_URI` in your `.env` file

### 4. Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings > Security > App Passwords
3. Generate an app password for "Mail"
4. Use this password in your `EMAIL_PASS` environment variable

### 5. Run Locally

```bash
# Start both frontend and backend
npm run dev

# Or start individually:
npm run client  # Frontend only (port 3000)
npm run server  # Backend only (port 5000)
```

## 🌐 Production Deployment

### Backend Deployment (Heroku)

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Or download from: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd server
   heroku create growexi-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URI="your-mongodb-connection-string"
   heroku config:set EMAIL_USER="your-email@gmail.com"
   heroku config:set EMAIL_PASS="your-app-password"
   heroku config:set EMAIL_RECIPIENT="info@growexi.rw"
   heroku config:set NODE_ENV="production"
   heroku config:set CLIENT_URL="https://your-frontend-url.netlify.app"
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Frontend Deployment (Netlify)

1. **Build the Frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `client/dist` folder
   - Or connect your GitHub repository

3. **Set Environment Variables**
   - In Netlify Dashboard > Site Settings > Environment Variables
   - Add: `VITE_API_URL` = `https://your-heroku-app.herokuapp.com`

4. **Custom Domain (Optional)**
   - Add your custom domain in Netlify settings
   - Update DNS records as instructed

## 🔧 Production Checklist

### Backend Checklist
- [ ] Environment variables set in Heroku
- [ ] MongoDB connection working
- [ ] Email service configured
- [ ] CORS configured for production URL
- [ ] Health check endpoint responding

### Frontend Checklist
- [ ] Environment variables set in Netlify
- [ ] API URL pointing to production backend
- [ ] Build successful
- [ ] All images and assets loading
- [ ] Contact form working
- [ ] Responsive design tested

### Security Checklist
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Input validation in place
- [ ] Error handling implemented
- [ ] HTTPS enabled

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure IP is whitelisted
   - Verify database user credentials

2. **Email Not Sending**
   - Check Gmail app password
   - Verify 2FA is enabled
   - Check spam folder

3. **CORS Errors**
   - Update `CLIENT_URL` in backend environment
   - Check frontend `VITE_API_URL` setting

4. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Optimize images
   - Use CDN for static assets
   - Implement lazy loading

2. **Backend**
   - Enable caching headers
   - Implement rate limiting
   - Use connection pooling
   - Monitor performance

## 📊 Monitoring

### Health Checks
- Backend: `https://your-app.herokuapp.com/health`
- Frontend: Check Netlify deployment status

### Analytics
- Set up Google Analytics
- Monitor form submissions
- Track user engagement

## 🔄 Updates and Maintenance

### Regular Updates
- Keep dependencies updated
- Monitor security vulnerabilities
- Backup database regularly
- Review and update content

### Scaling Considerations
- Database connection limits
- Email service quotas
- CDN usage
- Server resources

---

## 📞 Support

For technical support or questions:
- Email: info@growexi.rw
- Phone: +250 781184517

**GROWEXI Rwanda** - Empowering 5,000 learners in 5 years
