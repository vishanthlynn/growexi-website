# 🗄️ MongoDB Atlas Setup

## Step 1: Create MongoDB Atlas Account
1. Go to https://cloud.mongodb.com
2. Sign up for free account
3. Create a new project: "GROWEXI"

## Step 2: Create Database Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select region closest to you
4. Name your cluster: `growexi-cluster`

## Step 3: Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `growexi-user`
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"

## Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Driver: "Node.js"
4. Version: "4.1 or later"
5. Copy the connection string

## Step 6: Update Connection String
Replace `<password>` with your database user password:
```
mongodb+srv://growexi-user:YOUR_PASSWORD@growexi-cluster.xxxxx.mongodb.net/growexi?retryWrites=true&w=majority
```

## Step 7: Use in Render
Add this as `MONGODB_URI` environment variable in Render dashboard.

## 🎉 Your Database is Ready!
Your MongoDB Atlas database will be accessible from Render.com
