# Deployment Guide

This guide will help you deploy your portfolio website to GitHub Pages (frontend) and a cloud provider (backend).

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Backend Deployment](#backend-deployment)
  - [Option 1: Render (Recommended)](#option-1-render-recommended)
  - [Option 2: Railway](#option-2-railway)
  - [Option 3: Heroku](#option-3-heroku)
- [Frontend Deployment](#frontend-deployment)
  - [GitHub Pages Setup](#github-pages-setup)
  - [Custom Domain (Optional)](#custom-domain-optional)
- [Environment Variables](#environment-variables)
- [GitHub Secrets Configuration](#github-secrets-configuration)
- [Troubleshooting](#troubleshooting)

## Project Structure

```
portfolio/
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       ├── ci.yml          # Continuous Integration
│       ├── deploy-frontend.yml  # Frontend deployment
│       └── deploy-backend.yml   # Backend deployment
├── backend/                # Express + MongoDB API
│   ├── config/            # Database configuration
│   ├── controllers/       # Business logic
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── .env               # Environment variables (not in git)
│   ├── .env.example       # Example environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/              # React + Vite + TypeScript
│   ├── src/
│   ├── .env               # Environment variables (not in git)
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── DEPLOYMENT.md
└── README.md
```

## Prerequisites

1. **GitHub Account** - For repository hosting and GitHub Pages
2. **MongoDB Atlas Account** - For cloud database (free tier available)
3. **Backend Hosting Account** - Render, Railway, or Heroku
4. **Node.js 20+** installed locally

## Backend Deployment

### Option 1: Render (Recommended)

1. **Create a Render Account**
   - Go to [render.com](https://render.com) and sign up

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` directory as the root

3. **Configure the Service**
   ```
   Name: portfolio-api
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_super_secret_key
   FRONTEND_URL=https://your-username.github.io/portfolio
   ```

5. **Get Deploy Hook URL**
   - Go to Settings → Deploy Hook
   - Copy the URL for GitHub Actions

6. **Update GitHub Secrets**
   - Add `RENDER_DEPLOY_HOOK_URL` to your repository secrets
   - Enable the deploy-backend.yml workflow by setting `if: true`

### Option 2: Railway

1. **Create a Railway Account**
   - Go to [railway.app](https://railway.app) and sign up

2. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login and Create Project**
   ```bash
   railway login
   railway init
   ```

4. **Add MongoDB Plugin**
   - In Railway dashboard, click "New" → "Database" → "Add MongoDB"

5. **Deploy**
   ```bash
   cd backend
   railway up
   ```

6. **Configure GitHub Actions**
   - Add `RAILWAY_TOKEN` and `RAILWAY_SERVICE_NAME` to GitHub secrets
   - Enable the Railway job in deploy-backend.yml

### Option 3: Heroku

1. **Create a Heroku Account**
   - Go to [heroku.com](https://heroku.com) and sign up

2. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

3. **Create App**
   ```bash
   heroku create your-app-name
   ```

4. **Add MongoDB**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your_secret
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-username.github.io/portfolio
   ```

6. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

## Frontend Deployment

### GitHub Pages Setup

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/portfolio.git
   git push -u origin main
   ```

2. **Configure Repository Settings**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Source: "GitHub Actions"

3. **Add GitHub Secrets**
   - Go to "Settings" → "Secrets and variables" → "Actions"
   - Add `VITE_API_URL` with your backend URL:
     ```
     https://your-backend-url.onrender.com/api
     ```

4. **Update vite.config.ts**
   ```typescript
   base: '/portfolio/',  // Your repository name
   ```

5. **Push Changes**
   ```bash
   git add .
   git commit -m "Setup GitHub Pages deployment"
   git push
   ```

6. **Verify Deployment**
   - Go to "Actions" tab to see the workflow running
   - Once complete, visit: `https://your-username.github.io/portfolio`

### Custom Domain (Optional)

1. **Add Domain to GitHub Pages**
   - Go to Settings → Pages
   - Enter your custom domain (e.g., `yourdomain.com`)

2. **Configure DNS**
   - Add a CNAME record pointing to `your-username.github.io`

3. **Update vite.config.ts**
   ```typescript
   base: '/',  // Use root for custom domain
   ```

4. **Create CNAME file**
   ```bash
   echo "yourdomain.com" > frontend/public/CNAME
   ```

## Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your_super_secret_random_string
FRONTEND_URL=https://your-username.github.io/portfolio
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## GitHub Secrets Configuration

Add these secrets to your GitHub repository (Settings → Secrets → Actions):

| Secret Name | Description | Required For |
|-------------|-------------|--------------|
| `VITE_API_URL` | Your backend API URL | Frontend deployment |
| `RENDER_DEPLOY_HOOK_URL` | Render deploy hook | Render backend |
| `RAILWAY_TOKEN` | Railway API token | Railway backend |
| `RAILWAY_SERVICE_NAME` | Railway service name | Railway backend |
| `HEROKU_API_KEY` | Heroku API key | Heroku backend |
| `HEROKU_APP_NAME` | Heroku app name | Heroku backend |
| `HEROKU_EMAIL` | Heroku account email | Heroku backend |

## MongoDB Atlas Setup

1. **Create Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)

2. **Create Cluster**
   - Choose "Shared" (free tier)
   - Select your preferred region

3. **Configure Access**
   - Create a database user
   - Add IP whitelist (or `0.0.0.0/0` for all)

4. **Get Connection String**
   - Click "Connect" → "Connect your application"
   - Copy the URI and replace `<password>`

## Troubleshooting

### CORS Errors
If you see CORS errors in the browser:
1. Check `FRONTEND_URL` in backend environment variables
2. Ensure it matches your GitHub Pages URL exactly
3. Restart the backend server

### Build Failures
If GitHub Actions build fails:
1. Check the Actions logs for errors
2. Ensure all dependencies are in package.json
3. Verify Node.js version compatibility

### API Not Connecting
If frontend can't connect to backend:
1. Verify `VITE_API_URL` is set correctly in GitHub secrets
2. Check backend is running (visit `/api/health`)
3. Check CORS configuration in backend

### MongoDB Connection Issues
If backend can't connect to MongoDB:
1. Verify MONGODB_URI is correct
2. Check IP whitelist in Atlas
3. Ensure database user credentials are correct

## Useful Commands

```bash
# Test backend locally
cd backend
npm run dev

# Test frontend locally
cd frontend
npm run dev

# Build frontend
cd frontend
npm run build

# View build locally
cd frontend
npx serve dist
```

## Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend to Render/Railway/Heroku
3. ✅ Configure GitHub repository
4. ✅ Add GitHub secrets
5. ✅ Push code to trigger deployment
6. ✅ Verify everything works
7. ✅ Set up custom domain (optional)

## Support

If you encounter issues:
1. Check the GitHub Actions logs
2. Review your environment variables
3. Verify CORS settings
4. Check MongoDB connection
