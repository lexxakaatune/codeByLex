# Portfolio Website - MERN Stack

A full-stack portfolio website with an admin dashboard for managing projects. Built with the MERN stack (MongoDB, Express, React, Node.js).

![CI](https://github.com/your-username/portfolio/workflows/CI/badge.svg)
![Deploy Frontend](https://github.com/your-username/portfolio/workflows/Deploy%20Frontend%20to%20GitHub%20Pages/badge.svg)

## Features

- **Portfolio Display**: Beautiful, responsive portfolio with Hero, About, Projects, and Contact sections
- **Admin Dashboard**: Secure admin panel to add, edit, and delete projects
- **Dark/Light Mode**: Toggle between dark and light themes
- **Project Management**: Full CRUD operations for projects with image URLs, technologies, and links
- **Authentication**: JWT-based authentication system
- **Responsive Design**: Mobile-friendly design using Tailwind CSS

## Tech Stack

### Frontend
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- Context API for state management

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS enabled
- MVC Architecture

## Project Structure (MVC Pattern)

```
portfolio/
├── .github/
│   └── workflows/              # GitHub Actions workflows
│       ├── ci.yml              # Continuous Integration
│       ├── deploy-frontend.yml # Frontend deployment to GitHub Pages
│       └── deploy-backend.yml  # Backend deployment
├── backend/                    # Express + MongoDB API
│   ├── config/
│   │   └── database.js         # Database configuration
│   ├── controllers/
│   │   ├── authController.js   # Auth business logic
│   │   └── projectController.js # Project business logic
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   └── errorHandler.js     # Error handling middleware
│   ├── models/
│   │   ├── Project.js          # Project model
│   │   └── User.js             # User model
│   ├── routes/
│   │   ├── auth.js             # Auth routes
│   │   └── projects.js         # Project routes
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example            # Example environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js               # Express server entry
├── frontend/                   # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── context/            # React contexts (Theme, Auth)
│   │   ├── css/                # CSS folder structure
│   │   ├── pages/              # Page components
│   │   ├── sections/           # Portfolio sections
│   │   ├── services/           # API services
│   │   └── App.tsx
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
├── DEPLOYMENT.md               # Detailed deployment guide
└── README.md
```

## Quick Start

### Prerequisites
- Node.js (v20 or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up Environment Variables**

   Backend `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your-super-secret-jwt-key
   FRONTEND_URL=http://localhost:5173
   ```

   Frontend `.env`:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Create Default Admin User**

   Start the backend server and make a POST request:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","email":"admin@example.com","password":"admin123"}'
   ```

### Running the Application

1. **Start MongoDB**
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Access the Application**
   - Portfolio: http://localhost:5173
   - Admin Login: http://localhost:5173/admin/login
   - Default credentials: `admin` / `admin123`

## API Endpoints

### Authentication
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/featured` | Get featured projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create project | Private |
| PUT | `/api/projects/:id` | Update project | Private |
| DELETE | `/api/projects/:id` | Delete project | Private |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health status |

## CSS Structure

All CSS files are organized in the `src/css/` folder:

```
css/
├── variables.css      # CSS variables for theming
├── base.css          # Base styles and typography
├── components/       # Component styles
│   ├── navbar.css
│   └── footer.css
├── sections/         # Section styles
│   ├── hero.css
│   ├── about.css
│   ├── projects.css
│   └── contact.css
├── pages/           # Page-specific styles
│   └── admin.css
└── index.css        # Main importer
```

The main `src/index.css` imports all CSS from the `css/` folder.

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

### Quick Deploy

1. **Backend** (Render/Railway/Heroku):
   - Push to GitHub
   - Connect your repository
   - Add environment variables
   - Deploy

2. **Frontend** (GitHub Pages):
   - Push to GitHub
   - Configure GitHub Pages (Settings → Pages → GitHub Actions)
   - Add `VITE_API_URL` secret
   - Workflow auto-deploys on push

## GitHub Actions Workflows

- **CI** (`.github/workflows/ci.yml`): Runs tests on push/PR
- **Deploy Frontend** (`.github/workflows/deploy-frontend.yml`): Deploys to GitHub Pages
- **Deploy Backend** (`.github/workflows/deploy-backend.yml`): Deploys to cloud provider

## Environment Variables

### Backend
| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment (development/production) | Yes |
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | JWT signing secret | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |

### Frontend
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |

## Features in Detail

### Dark/Light Mode
- Toggle button in navbar
- Persists preference in localStorage
- Respects system preference on first visit
- Smooth transitions between themes

### Admin Dashboard
- Secure login with JWT
- Add new projects with form
- Edit existing projects
- Delete projects with confirmation
- Set featured projects
- Reorder projects
- Add/remove technologies

### Project Cards
- Image with hover overlay
- Live and GitHub links
- Technology tags
- Featured badge
- Responsive grid layout

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own portfolio!

## Support

If you encounter any issues:
1. Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
2. Review GitHub Actions logs
3. Verify environment variables
4. Check CORS configuration

---

**Happy coding!** 🚀
