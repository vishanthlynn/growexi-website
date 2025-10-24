# 🚀 Render.com Deployment Steps

## Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Connect your GitHub account

## Step 2: Create New Web Service
1. Click "New" → "Web Service"
2. Connect Repository: `vishanthlynn/growexi-website`
3. Configure:
   - **Name**: `growexi-api`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: Free

## Step 3: Environment Variables
Add these in Render dashboard:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://lynnvishanth:c6PwWlTUac3WdfbU@cluster0.fiyvrcn.mongodb.net/growexi?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
CLIENT_URL=https://growexi.org
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
```

## Step 4: Get Your API URL
After deployment, Render will give you:
`https://growexi-api.onrender.com`

**Save this URL** - you'll need it for frontend configuration!

## Step 5: Test Your API
Visit: `https://growexi-api.onrender.com/api/announcements`
You should see: `{"success":true,"data":[]}`

## Step 6: Create Admin User
Run this command locally (temporarily set MONGODB_URI to your production database):
```bash
cd server
MONGODB_URI="your-production-mongodb-uri" npm run create-admin
```

## Step 7: Update Frontend Environment Variables
In Vercel dashboard, add to both projects:
```
VITE_API_URL=https://growexi-api.onrender.com
```

## 🎉 You're Done!
Your production API will be live at: `https://growexi-api.onrender.com`
