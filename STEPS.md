# Steps to Complete Your Portfolio Project

Follow these steps to get your portfolio website fully deployed and running.

## Phase 1: Local Development Setup

### Step 1: Install Dependencies
```bash
# Navigate to project root
cd portfolio

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Set Up Environment Variables

**Backend (`backend/.env`):**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
FRONTEND_URL=http://localhost:5173
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### Step 4: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 5: Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123"}'
```

### Step 6: Test Locally
- Portfolio: http://localhost:5173
- Admin Login: http://localhost:5173/admin/login
- API Health: http://localhost:5000/api/health

---

## Phase 2: MongoDB Atlas Setup (Production Database)

### Step 1: Create MongoDB Atlas Account
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (Shared - Free tier)

### Step 2: Configure Database Access
1. Click "Database Access" in the sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Set privileges to "Read and write to any database"

### Step 3: Configure Network Access
1. Click "Network Access" in the sidebar
2. Click "Add IP Address"
3. Choose "Allow access from anywhere" (or add specific IPs)

### Step 4: Get Connection String
1. Click "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user's password

**Your connection string will look like:**
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Phase 3: Backend Deployment (Render - Recommended)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub

### Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** `portfolio-api`
   - **Environment:** `Node`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### Step 3: Add Environment Variables
Click "Environment" and add:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
FRONTEND_URL=https://your-username.github.io/portfolio
```

### Step 4: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy your service URL (e.g., `https://portfolio-api.onrender.com`)

### Step 5: Get Deploy Hook (Optional - for auto-deploy)
1. Go to Settings → Deploy Hook
2. Create a deploy hook
3. Copy the URL for GitHub Actions

---

## Phase 4: GitHub Repository Setup

### Step 1: Initialize Git Repository
```bash
cd portfolio
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New Repository"
3. Name it `portfolio`
4. Make it Public
5. Don't initialize with README (we already have one)

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 4: Add GitHub Secrets
1. Go to your repository on GitHub
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com/api` |
| `RENDER_DEPLOY_HOOK_URL` | Your Render deploy hook URL (optional) |

---

## Phase 5: Frontend Deployment (GitHub Pages)

### Step 1: Configure GitHub Pages
1. Go to repository "Settings"
2. Click "Pages" in the sidebar
3. Under "Source", select "GitHub Actions"

### Step 2: Update vite.config.ts
```typescript
// frontend/vite.config.ts
export default defineConfig({
  base: '/portfolio/',  // Your repository name
  // ... rest of config
});
```

### Step 3: Commit and Push
```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push
```

### Step 4: Verify Deployment
1. Go to "Actions" tab in your repository
2. Watch the "Deploy Frontend to GitHub Pages" workflow
3. Once complete, visit: `https://YOUR_USERNAME.github.io/portfolio`

---

## Phase 6: Post-Deployment Setup

### Step 1: Create Admin User on Production
```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"your-secure-password"}'
```

### Step 2: Add Your Projects
1. Go to `https://YOUR_USERNAME.github.io/portfolio/admin/login`
2. Login with your admin credentials
3. Click "Add Project" and add your portfolio projects

### Step 3: Customize Content
1. Edit `frontend/src/sections/Hero.tsx` - Update your name and stats
2. Edit `frontend/src/sections/About.tsx` - Update your about section and skills
3. Edit `frontend/src/sections/Contact.tsx` - Update your contact information

### Step 4: Commit Changes
```bash
git add .
git commit -m "Customize portfolio content"
git push
```

---

## Phase 7: Custom Domain (Optional)

### Step 1: Buy a Domain
Purchase from Namecheap, GoDaddy, Google Domains, etc.

### Step 2: Configure GitHub Pages
1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Click "Save"

### Step 3: Configure DNS
Add these records at your domain registrar:

| Type | Host | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

### Step 4: Update Backend CORS
Update `FRONTEND_URL` in Render environment variables to your custom domain.

### Step 5: Update vite.config.ts
```typescript
base: '/',  // Use root for custom domain
```

---

## Troubleshooting

### CORS Errors
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Solution:** Update `FRONTEND_URL` in backend environment variables to match your frontend URL exactly.

### Build Failures
Check GitHub Actions logs:
1. Go to "Actions" tab
2. Click on the failed workflow
3. Review the error message

### API Not Connecting
1. Verify `VITE_API_URL` secret is set correctly
2. Check backend is running: `https://your-api.com/api/health`
3. Check CORS configuration

### MongoDB Connection Issues
1. Verify `MONGODB_URI` is correct
2. Check IP whitelist in Atlas (use `0.0.0.0/0` for all IPs)
3. Ensure database user credentials are correct

---

## Summary Checklist

- [ ] Local development working
- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render
- [ ] GitHub repository created
- [ ] GitHub secrets configured
- [ ] Frontend deployed to GitHub Pages
- [ ] Admin user created on production
- [ ] Projects added via admin panel
- [ ] Content customized
- [ ] Custom domain configured (optional)

---

## Next Steps

1. **Add Analytics**: Google Analytics or Plausible
2. **SEO Optimization**: Add meta tags, sitemap.xml
3. **Blog Section**: Add a blog to share your knowledge
4. **Testimonials**: Add client testimonials
5. **Resume Download**: Add PDF resume download

**You're all set!** 🎉 Your portfolio is now live and ready to showcase your work.
