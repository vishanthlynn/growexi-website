# 👤 Create Admin User

## Step 1: Set Production Database URI
```bash
export MONGODB_URI="mongodb+srv://growexi-user:YOUR_PASSWORD@growexi-cluster.xxxxx.mongodb.net/growexi?retryWrites=true&w=majority"
```

## Step 2: Run Admin Creation Script
```bash
cd server
npm run create-admin
```

## Step 3: Follow the Prompts
- Enter admin name: `Admin User`
- Enter admin email: `admin@growexi.org`
- Enter admin password: `YourSecurePassword123!`

## Step 4: Save Credentials
**IMPORTANT**: Save these credentials securely:
- **Email**: admin@growexi.org
- **Password**: YourSecurePassword123!

## Step 5: Test Login
1. Go to https://admin.growexi.org
2. Login with the credentials above
3. You should see the admin dashboard

## 🎉 Admin User Created!
You can now access the admin portal with full permissions!
