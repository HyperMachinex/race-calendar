# Event Calendar - Fullstack Application

A modern, professional event calendar application with separated frontend and backend architecture.

## 🏗️ Architecture

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components

### Backend
- **Node.js & Express** - RESTful API server
- **TypeScript** - Type-safe backend code
- **MongoDB** - NoSQL database for events and categories
- **PostgreSQL** - Relational database (optional)
- **Socket.IO** - Real-time updates

### Infrastructure
- **Docker Compose** - Orchestrates all services
- **MongoDB 7.0** - Document database
- **PostgreSQL 16** - Relational database

## 📁 Project Structure

```
event-calendar/
├── frontend/               # Next.js frontend application
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── services/          # API service layer
│   ├── public/            # Static assets
│   ├── Dockerfile         # Frontend Docker image
│   └── package.json       # Frontend dependencies
│
├── backend/               # Express backend API
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── database/     # DB init scripts
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   ├── socket/       # Socket.IO handlers
│   │   ├── types/        # TypeScript types
│   │   ├── utils/        # Utility functions
│   │   ├── validators/   # Input validation
│   │   └── server.ts     # Entry point
│   ├── Dockerfile        # Backend Docker image
│   └── package.json      # Backend dependencies
│
├── docs/                  # Documentation
│   ├── INDEX.md          # Documentation index
│   ├── QUICKSTART.md     # Quick start guide
│   ├── ARCHITECTURE.md   # Architecture details
│   └── ... (more docs)
│
└── docker-compose.yml    # Multi-container setup
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

### Using Docker (Recommended)

1. **Clone the repository**
```bash
git clone <repository-url>
cd event-calendar
```

2. **Start all services**
```bash
docker-compose up -d
```

3. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017
- PostgreSQL: postgresql://localhost:5432

4. **View logs**
```bash
docker-compose logs -f
```

5. **Stop all services**
```bash
docker-compose down
```

### Local Development

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start development server
npm run dev

# Backend runs on http://localhost:5000
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev

# Frontend runs on http://localhost:3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Events API

**Get all events**
```http
GET /events
Query Parameters:
  - categoryId: string (optional)
  - startDate: string (optional, ISO format)
  - endDate: string (optional, ISO format)
  - search: string (optional)
```

**Get event by ID**
```http
GET /events/:id
```

**Create event**
```http
POST /events
Content-Type: application/json

{
  "title": "Event Title",
  "description": "Event description",
  "date": "2025-10-27",
  "startTime": "14:00",
  "endTime": "16:00",
  "categoryId": "category-id",
  "location": "Event location",
  "color": "#3b82f6",
  "isAllDay": false
}
```

**Update event**
```http
PATCH /events/:id
Content-Type: application/json

{
  "title": "Updated Title"
}
```

**Delete event**
```http
DELETE /events/:id
```

### Categories API

**Get all categories**
```http
GET /categories
```

**Create category**
```http
POST /categories
Content-Type: application/json

{
  "name": "Category Name",
  "color": "#3b82f6",
  "icon": "📅",
  "description": "Category description"
}
```

**Update category**
```http
PATCH /categories/:id
```

**Delete category**
```http
DELETE /categories/:id
```

### Health Check
```http
GET /health
```

## 🔧 Configuration

### Backend Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://mongo:27017/event_calendar
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=event_calendar
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_APP_NAME="Event Calendar"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
npm run test:watch
```

### Frontend Tests
```bash
cd frontend
npm run test
```

## 📦 Building for Production

### Build all services
```bash
docker-compose -f docker-compose.yml build
```

### Build individually

**Backend**
```bash
cd backend
npm run build
npm start
```

**Frontend**
```bash
cd frontend
npm run build
npm start
```

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ Environment variable management
- ✅ Non-root Docker users

## 🌟 Features

- ✅ Create, read, update, delete events
- ✅ Category management
- ✅ Date filtering
- ✅ Search functionality
- ✅ Real-time updates via Socket.IO
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Docker containerization
- ✅ MongoDB + PostgreSQL support
- ✅ RESTful API
- ✅ TypeScript throughout
- ✅ Comprehensive error handling
- ✅ Request validation
- ✅ Logging with Winston

## 🛠️ Tech Stack

### Frontend
- Next.js 14.2.16
- React 18
- TypeScript 5
- Tailwind CSS 4.1.9
- shadcn/ui
- Radix UI
- date-fns

### Backend
- Node.js 20
- Express 4.18
- TypeScript 5
- MongoDB 7 with Mongoose
- PostgreSQL 16 with Sequelize
- Socket.IO 4.6
- Winston (logging)
- Helmet (security)
- express-validator

### DevOps
- Docker
- Docker Compose
- Multi-stage builds

## 📖 Documentation

### Quick Links
- ⭐ [**Reading Order Guide**](./docs/READING_ORDER.md) - **START HERE** - Choose your learning path
- 📚 [**Documentation Index**](./docs/INDEX.md) - Complete documentation guide
- 🚀 [**Quick Start Guide**](./docs/QUICKSTART.md) - Get started in 5 minutes
- 🏗️ [**Architecture**](./docs/ARCHITECTURE.md) - System architecture details
- 📋 [**Project Status**](./docs/PROJECT_STATUS.md) - Current project status

### Detailed Documentation
- [Complete Summary](./docs/SUMMARY.md) - Full refactoring overview
- [Removed Items & Changes](./docs/REMOVED_ITEMS.md) - What was removed and why
- [Tech Stack Details](./docs/TECH_STACK.md) - Technology stack breakdown
- [Project Structure](./docs/PROJECT_STRUCTURE.md) - Code organization
- [Setup Guide](./docs/SETUP.md) - Detailed setup instructions
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deployment options
- [Contributing Guidelines](./docs/CONTRIBUTING.md) - How to contribute
- [Changelog](./docs/CHANGELOG.md) - Version history

### Component Documentation
- [Backend API](./backend/README.md) - Backend development guide
- [Frontend Guide](./frontend/README.md) - Frontend development guide

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

Your Name - [@yourhandle](https://twitter.com/yourhandle)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- shadcn for the beautiful UI components
- Express.js community
- MongoDB and PostgreSQL teams

---

**Happy Coding! 🚀**
