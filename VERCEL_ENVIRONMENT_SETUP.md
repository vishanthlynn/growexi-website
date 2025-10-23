# ⚙️ Vercel Environment Variables Setup

## For Client Project (Public Website)
1. Go to Vercel Dashboard → Client Project → Settings → Environment Variables
2. Add:
```
VITE_API_URL=https://growexi-api.onrender.com
```

## For Admin Project (Admin Portal)
1. Go to Vercel Dashboard → Admin Project → Settings → Environment Variables
2. Add:
```
VITE_API_URL=https://growexi-api.onrender.com
```

## After Adding Variables
1. Go to "Deployments" tab
2. Click "Redeploy" on the latest deployment
3. This will apply the new environment variables

## Test Your Setup
1. **Public Website**: https://growexi.org
   - Should load without errors
   - API calls should go to Render.com

2. **Admin Portal**: https://admin.growexi.org
   - Should load login page
   - API calls should go to Render.com

## 🎉 Environment Variables Applied!
Both frontends will now connect to your production API!
