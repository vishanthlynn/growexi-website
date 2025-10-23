# 🚀 GROWEXI Production Deployment Guide

## Overview
This guide will help you deploy your GROWEXI application to production with three separate services:

1. **Backend API** → Render.com
2. **Public Website** → Vercel (growexi.org)
3. **Admin Portal** → Vercel (private URL)

## Step 1: Deploy Backend API to Render

### 1.1 Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub
- Connect your GitHub repository

### 1.2 Deploy Backend
- Click "New" → "Web Service"
- Connect your GitHub repository: `vishanthlynn/growexi-website`
- Configure:
  - **Name**: `growexi-api`
  - **Environment**: `Node`
  - **Build Command**: `cd server && npm install`
  - **Start Command**: `cd server && npm start`
  - **Plan**: Free

### 1.3 Environment Variables
Add these environment variables in Render dashboard:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/growexi
JWT_SECRET=your-super-secret-jwt-key-here
CLIENT_URL=https://growexi.org
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### 1.4 Get API URL
After deployment, Render will give you a URL like:
`https://growexi-api.onrender.com`

**Save this URL** - you'll need it for the frontend deployments.

## Step 2: Deploy Public Website to Vercel

### 2.1 Update Client Environment
Create `.env.production` in the client folder:
```
VITE_API_URL=https://growexi-api.onrender.com
```

### 2.2 Deploy to Vercel
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Configure:
  - **Framework Preset**: Vite
  - **Root Directory**: `client`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

### 2.3 Custom Domain
- Add your domain `growexi.org` in Vercel dashboard
- Update DNS records as instructed by Vercel

## Step 3: Deploy Admin Portal to Vercel

### 3.1 Update Admin Environment
Create `.env.production` in the admin folder:
```
VITE_API_URL=https://growexi-api.onrender.com
```

### 3.2 Deploy to Vercel
- Create a new Vercel project
- Import your GitHub repository
- Configure:
  - **Framework Preset**: Vite
  - **Root Directory**: `admin`
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

### 3.3 Get Admin URL
Vercel will give you a URL like:
`https://growexi-admin-xyz.vercel.app`

**This is your private admin URL** - share this with authorized users only.

## Step 4: Create Admin User

### 4.1 Connect to Production Database
You'll need to run the admin creation script against your production database:

```bash
# Set your production MongoDB URI
export MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/growexi"

# Run the admin creation script
cd server
npm run create-admin
```

### 4.2 Admin Credentials
The script will create an admin user. Save these credentials securely.

## Step 5: Test Everything

### 5.1 Test Public Website
- Visit `https://growexi.org`
- Check that courses, announcements load
- Test application form

### 5.2 Test Admin Portal
- Visit your admin URL
- Login with admin credentials
- Create a test announcement
- Verify it appears on the public website

## Step 6: Final Configuration

### 6.1 Update CORS
Make sure your Render API allows requests from:
- `https://growexi.org`
- `https://your-admin-url.vercel.app`

### 6.2 Email Configuration
Set up Gmail App Password for email notifications:
1. Enable 2FA on Gmail
2. Generate App Password
3. Use App Password in `EMAIL_PASS` variable

## 🎉 You're Live!

Your GROWEXI application is now fully deployed and production-ready:

- **Public Website**: https://growexi.org
- **Admin Portal**: https://your-admin-url.vercel.app
- **API**: https://growexi-api.onrender.com

## Support

If you encounter any issues:
1. Check Render logs for API issues
2. Check Vercel logs for frontend issues
3. Verify environment variables are set correctly
4. Test database connection

## Security Notes

- Keep admin URL private
- Use strong JWT secrets
- Regularly update dependencies
- Monitor usage and performance
