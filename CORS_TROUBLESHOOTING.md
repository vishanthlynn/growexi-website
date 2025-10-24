# 🔧 CORS Troubleshooting Guide

## 🚨 **Current Issue:**
The admin portal is getting CORS errors when trying to connect to the Render API.

## ✅ **What I've Fixed:**

1. **Updated Vercel Configuration** - Added explicit build settings
2. **Updated Admin Portal** - Added fallback API URLs
3. **Created Admin User** - In production database
4. **Enhanced CORS Settings** - On Render service

## 🚀 **Next Steps:**

### **Step 1: Wait for Vercel Deployment**
- The admin portal should redeploy automatically
- Wait 2-3 minutes for deployment to complete
- Check Vercel dashboard for deployment status

### **Step 2: Test Admin Portal**
1. Go to `https://admin.growexi.org`
2. Try logging in with:
   - **Email:** `admin@growexi.rw`
   - **Password:** `admin123`

### **Step 3: If Still Having CORS Issues**

#### **Option A: Manual Vercel Environment Variable**
1. Go to Vercel Dashboard
2. Find your admin portal project
3. Go to **Settings** → **Environment Variables**
4. Add: `VITE_API_URL = https://growexi-api.onrender.com`
5. **Redeploy** the project

#### **Option B: Check Render Service**
1. Go to Render Dashboard
2. Check if the service is running
3. Look at the logs for any errors
4. Verify CORS configuration is applied

#### **Option C: Alternative API URL**
If the Render service is having issues, we can temporarily use a different approach:
- Use a CORS proxy service
- Or deploy to a different backend service

## 🔍 **Debugging Steps:**

1. **Check Browser Console** - Look for specific error messages
2. **Check Network Tab** - See if requests are being made
3. **Check Render Logs** - Verify API is receiving requests
4. **Test API Directly** - Use curl or Postman to test endpoints

## 📋 **Expected Result:**
- ✅ Admin portal loads without errors
- ✅ Login works successfully
- ✅ All admin functions work properly
- ✅ No CORS errors in console

---

**The deployment should fix the CORS issue. If it persists, we'll implement an alternative solution.**
