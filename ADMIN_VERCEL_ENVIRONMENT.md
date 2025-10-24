# 🔧 Admin Portal Vercel Environment Setup

## Step 1: Go to Vercel Dashboard
1. Visit [vercel.com/dashboard](https://vercel.com/dashboard)
2. Find your **admin portal project** (should be named something like `admin-xxxxx`)

## Step 2: Add Environment Variable
1. Click on your admin project
2. Go to **Settings** tab
3. Click on **Environment Variables** in the left sidebar
4. Click **Add New**
5. Add this environment variable:

```
Name: VITE_API_URL
Value: https://growexi-api.onrender.com
Environment: Production, Preview, Development
```

## Step 3: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Wait for deployment to complete

## Step 4: Test Admin Portal
1. Visit `https://admin.growexi.org`
2. Login with:
   - **Email:** `admin@growexi.rw`
   - **Password:** `admin123`

## ✅ What This Fixes:
- ✅ Admin portal will connect to production API
- ✅ CORS errors will be resolved
- ✅ All admin functions will work properly

## 🔍 If Still Having Issues:
1. **Check browser console** for any remaining errors
2. **Verify Vercel deployment** completed successfully
3. **Clear browser cache** and try again
4. **Check Render logs** to see if API is receiving requests

---

**Note:** The admin portal now has a fallback URL built-in, so it should work even without the environment variable, but setting it explicitly is recommended for production.
