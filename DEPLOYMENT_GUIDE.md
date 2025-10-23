# GROWEXI Deployment Guide

This guide will help you deploy all three GROWEXI projects to production.

## 🏗️ Architecture Overview

- **Backend API**: Node.js/Express (Deploy to Railway/Render)
- **Public Website**: React (Deploy to Vercel)
- **Admin Portal**: React (Deploy to Vercel)

## 🚀 Step-by-Step Deployment

### 1. Backend API Deployment (Railway - Recommended)

#### Option A: Railway (Free tier available)
1. **Sign up at [Railway.app](https://railway.app)**
2. **Connect your GitHub repository**
3. **Deploy the server folder**:
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Set root directory to `/server`
   - Add environment variables:
     ```
     NODE_ENV=production
     PORT=5001
     MONGO_URI=your_mongodb_atlas_uri
     JWT_SECRET=your_strong_jwt_secret
     EMAIL_USER=your_email@gmail.com
     EMAIL_PASS=your_app_password
     CLIENT_URL=https://your-client-domain.vercel.app
     ```

#### Option B: Render (Alternative)
1. **Sign up at [Render.com](https://render.com)**
2. **Create a new Web Service**
3. **Connect GitHub and select server folder**
4. **Configure environment variables** (same as above)

### 2. Public Website Deployment (Vercel)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy from client directory**:
   ```bash
   cd client
   vercel
   ```

3. **Configure environment variables**:
   - `VITE_API_URL=https://your-backend-api-url.railway.app`

4. **Or deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `/client`
   - Add environment variable: `VITE_API_URL`

### 3. Admin Portal Deployment (Vercel)

1. **Deploy from admin directory**:
   ```bash
   cd admin
   vercel
   ```

2. **Configure environment variables**:
   - `VITE_API_URL=https://your-backend-api-url.railway.app`

3. **Or deploy via Vercel Dashboard**:
   - Import your GitHub repository again
   - Set root directory to `/admin`
   - Add environment variable: `VITE_API_URL`

## 🔧 Environment Variables Setup

### Backend API (Railway/Render)
```env
NODE_ENV=production
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/growexi
JWT_SECRET=your_very_strong_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=https://your-client-domain.vercel.app
```

### Frontend Projects (Vercel)
```env
VITE_API_URL=https://your-backend-api-url.railway.app
```

## 📱 Quick Deployment Commands

### Deploy All Frontend Projects
```bash
# Deploy public website
cd client
vercel --prod

# Deploy admin portal
cd ../admin
vercel --prod
```

### Update Environment Variables
After deployment, update the environment variables in each platform:
- **Railway/Render**: Backend environment variables
- **Vercel**: Frontend environment variables

## 🔗 Final URLs

After deployment, you'll have:
- **Public Website**: `https://your-client-domain.vercel.app`
- **Admin Portal**: `https://your-admin-domain.vercel.app`
- **Backend API**: `https://your-backend-api.railway.app`

## 🛠️ Post-Deployment Steps

1. **Update CORS settings** in backend for production domains
2. **Create admin user** in production database
3. **Test all functionality** across all three applications
4. **Configure custom domains** (optional)

## 🔒 Security Considerations

1. **Use strong JWT secrets** in production
2. **Enable HTTPS** for all applications
3. **Configure proper CORS** origins
4. **Use environment variables** for all sensitive data
5. **Regular database backups**

## 📊 Monitoring

- **Railway/Render**: Built-in monitoring and logs
- **Vercel**: Analytics and performance monitoring
- **MongoDB Atlas**: Database monitoring

## 🆘 Troubleshooting

### Common Issues:
1. **CORS errors**: Update CLIENT_URL in backend
2. **API not found**: Check VITE_API_URL in frontend
3. **Database connection**: Verify MONGO_URI
4. **Email not working**: Check EMAIL_USER and EMAIL_PASS

### Debug Commands:
```bash
# Check backend logs
railway logs

# Check frontend builds
vercel logs

# Test API endpoints
curl https://your-backend-api.railway.app/health
```

---

**GROWEXI Rwanda** - Growing Rwanda's Opportunities & Workforce Expertise and Innovation