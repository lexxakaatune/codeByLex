# Project Structure - CORRECT ORGANIZATION

## What You Should Download

**Download ONLY the `/mnt/okcomputer/output/portfolio/` folder.** 

The `/mnt/okcomputer/output/app/` folder was a temporary template - you can ignore it.

---

## Correct Folder Structure

```
portfolio/                          <-- DOWNLOAD THIS FOLDER
├── .github/
│   └── workflows/
│       ├── ci.yml                  # Runs tests on push
│       ├── deploy-backend.yml      # Backend deployment
│       └── deploy-frontend.yml     # Frontend deployment to GitHub Pages
├── backend/                        <-- SEPARATE: Express API
│   ├── config/
│   │   └── database.js             # MongoDB connection
│   ├── controllers/                <-- MVC: Business Logic
│   │   ├── authController.js       # Login/register logic
│   │   └── projectController.js    # CRUD logic for projects
│   ├── middleware/
│   │   ├── auth.js                 # JWT verification
│   │   └── errorHandler.js         # Error handling
│   ├── models/                     <-- MVC: Database Models
│   │   ├── Project.js              # Project schema
│   │   └── User.js                 # User schema
│   ├── routes/                     <-- MVC: Route Definitions
│   │   ├── auth.js                 # /api/auth routes
│   │   └── projects.js             # /api/projects routes
│   ├── .env                        # Backend environment (NOT in git)
│   ├── .env.example                # Example environment file
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js                   # Entry point
├── frontend/                       <-- SEPARATE: React App
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx          # Navigation component
│   │   │   ├── Footer.tsx          # Footer component
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── context/
│   │   │   ├── AuthContext.tsx     # Authentication state
│   │   │   └── ThemeContext.tsx    # Dark/light mode state
│   │   ├── css/                    <-- All CSS files here
│   │   │   ├── components/
│   │   │   │   ├── navbar.css
│   │   │   │   └── footer.css
│   │   │   ├── sections/
│   │   │   │   ├── about.css
│   │   │   │   ├── contact.css
│   │   │   │   ├── hero.css
│   │   │   │   └── projects.css
│   │   │   ├── pages/
│   │   │   │   └── admin.css
│   │   │   ├── base.css
│   │   │   ├── index.css           # Imports all CSS
│   │   │   └── variables.css
│   │   ├── pages/
│   │   │   ├── AdminDashboard.tsx  # Admin panel
│   │   │   └── AdminLogin.tsx      # Login page
│   │   ├── sections/
│   │   │   ├── About.tsx           # About section
│   │   │   ├── Contact.tsx         # Contact section
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   └── Projects.tsx        # Projects section
│   │   ├── services/
│   │   │   └── api.ts              # API calls
│   │   ├── App.tsx                 # Main app component
│   │   ├── App.css
│   │   ├── index.css               # Tailwind + custom CSS import
│   │   ├── main.tsx                # Entry point
│   │   └── lib/
│   │       └── utils.ts
│   ├── .env                        # Frontend environment (NOT in git)
│   ├── .env.example
│   ├── .gitignore
│   ├── components.json
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── .gitignore
├── DEPLOYMENT.md
├── README.md
├── STEPS.md
└── STRUCTURE.md                    # This file
```

---

## MVC Pattern Explained

### Model (Data Layer)
- **Location:** `backend/models/`
- **Files:** `User.js`, `Project.js`
- **Purpose:** Define database schemas with Mongoose

### View (Presentation Layer)
- **Location:** `frontend/src/`
- **Files:** React components, CSS files
- **Purpose:** Display UI to users

### Controller (Business Logic)
- **Location:** `backend/controllers/`
- **Files:** `authController.js`, `projectController.js`
- **Purpose:** Handle requests, process data, return responses

### Routes (URL Mapping)
- **Location:** `backend/routes/`
- **Files:** `auth.js`, `projects.js`
- **Purpose:** Map URLs to controller functions

---

## How Backend & Frontend Are Separate

### Backend (`backend/` folder)
- Runs on Node.js + Express
- Connects to MongoDB
- Serves API at `http://localhost:5000/api`
- Has its own `package.json`
- Deployed separately (Render, Railway, etc.)

### Frontend (`frontend/` folder)
- Runs on Vite + React
- Calls backend API
- Served at `http://localhost:5173`
- Has its own `package.json`
- Deployed to GitHub Pages

### They Communicate Via:
```
Frontend (React)  <--HTTP/JSON-->  Backend (Express)  <--Mongoose-->  MongoDB
```

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `backend/server.js` | Starts the Express server |
| `backend/controllers/*.js` | Contains business logic |
| `backend/routes/*.js` | Defines API endpoints |
| `frontend/src/App.tsx` | Main React component with routes |
| `frontend/src/services/api.ts` | All API calls to backend |
| `frontend/src/css/index.css` | Imports all CSS files |

---

## Running Locally

### Terminal 1 - Backend:
```bash
cd backend
npm install
npm run dev          # Starts on http://localhost:5000
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev          # Starts on http://localhost:5173
```

---

## Environment Variables

### Backend (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```
