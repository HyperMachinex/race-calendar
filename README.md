# Race Calendar - Motorsports Event Tracking

A modern, professional motorsports race calendar application focused exclusively on racing events from various championships worldwide.

## 🏁 About

Race Calendar is a specialized application designed for motorsports enthusiasts to track and manage racing events from major championships including Formula 1, MotoGP, NASCAR, WEC, Rally, IndyCar, and Formula E.

## 🏗️ Architecture

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful UI components

### Backend
- **Node.js & Express** - RESTful API server
- **TypeScript** - Type-safe backend code
- **MongoDB** - NoSQL database for races and categories
- **PostgreSQL** - Relational database (optional)
- **Socket.IO** - Real-time updates

### Infrastructure
- **Docker Compose** - Orchestrates all services
- **MongoDB 7.0** - Document database
- **PostgreSQL 16** - Relational database

## 📁 Project Structure

```
race-calendar/
├── frontend/               # Next.js frontend application
│   ├── app/               # Next.js App Router
│   ├── components/        # React components
│   ├── constants/         # Motorsports categories
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── services/          # API service layer
│   ├── types/             # TypeScript types
│   ├── public/            # Static assets
│   ├── Dockerfile         # Frontend Docker image
│   └── package.json       # Frontend dependencies
│
├── backend/               # Express backend API
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Request handlers
│   │   ├── database/     # DB init scripts with motorsports data
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
cd race-calendar
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

### Events API (Racing Events)

**Get all races**
```http
GET /events
Query Parameters:
  - categoryId: string (optional) - Filter by racing series
  - startDate: string (optional, ISO format)
  - endDate: string (optional, ISO format)
  - search: string (optional) - Search race names
```

**Get race by ID**
```http
GET /events/:id
```

**Create race event**
```http
POST /events
Content-Type: application/json

{
  "title": "Monaco Grand Prix",
  "description": "Formula 1 race in Monaco",
  "date": "2025-05-25",
  "startTime": "15:00",
  "endTime": "17:00",
  "categoryId": "formula1",
  "location": "Circuit de Monaco",
  "color": "#e10600",
  "isAllDay": false
}
```

**Update race event**
```http
PATCH /events/:id
Content-Type: application/json

{
  "title": "Updated Race Name"
}
```

**Delete race event**
```http
DELETE /events/:id
```

### Categories API (Racing Series)

**Get all categories**
```http
GET /categories
```

**Create category**
```http
POST /categories
Content-Type: application/json

{
  "name": "F2",
  "color": "#0066cc",
  "icon": "🏎️",
  "description": "Formula 2 Championship"
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
MONGODB_URI=mongodb://mongo:27017/race_calendar
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=race_calendar
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_APP_NAME="Race Calendar"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000/api/v1"
```

## 🏁 Motorsports Categories

The application comes pre-configured with these racing series:

- **Formula 1** - Grand Prix races
- **MotoGP** - Motorcycle Grand Prix
- **NASCAR** - Cup Series races
- **WEC** - World Endurance Championship
- **Rally** - WRC and rally championships
- **IndyCar** - IndyCar Series
- **Formula E** - Electric racing series
- **Other** - Additional motorsports events

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

- ✅ Track racing events from multiple championships
- ✅ Category management for different racing series
- ✅ Date filtering and search
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

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🏎️ Built for Motorsports Enthusiasts

Track your favorite racing series all in one place!

---

**Happy Racing! 🏁**
