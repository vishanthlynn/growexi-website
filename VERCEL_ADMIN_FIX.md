# 🔧 Fix Vercel Admin Portal Deployment

## 🚨 **Current Issue:**
Vercel is trying to build from the root directory instead of the admin directory, causing the "No Output Directory named 'dist'" error.

## ✅ **Solution: Manual Vercel Configuration**

### **Step 1: Go to Vercel Dashboard**
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your **admin portal project** (should be named something like `admin-xxxxx`)

### **Step 2: Update Project Settings**
1. Click on your admin project
2. Go to **Settings** tab
3. Scroll down to **Build & Development Settings**
4. Update these settings:

```
Root Directory: admin
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Framework Preset: Vite
```

### **Step 3: Add Environment Variable**
1. Go to **Environment Variables** in the left sidebar
2. Click **Add New**
3. Add this environment variable:

```
Name: VITE_API_URL
Value: https://growexi-api.onrender.com
Environment: Production, Preview, Development
```

### **Step 4: Redeploy**
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete

## 🎯 **Alternative: Create New Vercel Project**

If the above doesn't work, create a new Vercel project:

### **Step 1: Import from GitHub**
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import from GitHub: `vishanthlynn/growexi-website`
3. **Important:** Set **Root Directory** to `admin`

### **Step 2: Configure Settings**
```
Root Directory: admin
Build Command: npm run build
Output Directory: dist
Framework Preset: Vite
```

### **Step 3: Add Environment Variable**
```
VITE_API_URL = https://growexi-api.onrender.com
```

### **Step 4: Deploy**
1. Click **Deploy**
2. Wait for deployment to complete
3. Test the admin portal

## ✅ **Expected Result:**
- ✅ Admin portal builds successfully
- ✅ No "dist" directory error
- ✅ Admin portal accessible at `https://admin.growexi.org`
- ✅ CORS errors resolved

## 🔍 **If Still Having Issues:**
1. **Check Vercel logs** for specific error messages
2. **Verify Root Directory** is set to `admin`
3. **Confirm Build Command** is `npm run build`
4. **Check Output Directory** is `dist`

---

**The manual configuration should resolve the deployment issue!** 🎉
