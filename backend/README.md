# Event Calendar Backend

Express.js backend API with TypeScript, MongoDB, and PostgreSQL support.

## 🏗️ Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # Database connections
│   │   ├── logger.ts    # Winston logger setup
│   │   └── cors.ts      # CORS configuration
│   ├── controllers/     # Request handlers
│   │   ├── event.controller.ts
│   │   └── category.controller.ts
│   ├── database/        # Database initialization
│   │   ├── mongo-init.js
│   │   └── postgres-init.sql
│   ├── middleware/      # Express middleware
│   │   ├── errorHandler.ts
│   │   ├── validate.ts
│   │   └── rateLimiter.ts
│   ├── models/          # Database models
│   │   ├── event.mongo.ts
│   │   └── category.mongo.ts
│   ├── routes/          # API routes
│   │   ├── event.routes.ts
│   │   ├── category.routes.ts
│   │   └── index.ts
│   ├── services/        # Business logic (future)
│   ├── socket/          # Socket.IO handlers
│   │   └── index.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── utils/           # Utility functions (future)
│   ├── validators/      # Input validation
│   │   ├── event.validator.ts
│   │   └── category.validator.ts
│   └── server.ts        # Application entry point
├── logs/                # Application logs
├── Dockerfile           # Docker configuration
├── .env.example         # Environment variables template
├── package.json         # Dependencies
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Docker)
- PostgreSQL (optional)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Server runs on http://localhost:5000
```

### Production

```bash
# Build TypeScript
npm run build

# Start production server
npm start
```

## 📡 API Endpoints

### Events
- `GET /api/v1/events` - Get all events
- `GET /api/v1/events/:id` - Get event by ID
- `POST /api/v1/events` - Create event
- `PATCH /api/v1/events/:id` - Update event
- `DELETE /api/v1/events/:id` - Delete event

### Categories
- `GET /api/v1/categories` - Get all categories
- `GET /api/v1/categories/:id` - Get category by ID
- `POST /api/v1/categories` - Create category
- `PATCH /api/v1/categories/:id` - Update category
- `DELETE /api/v1/categories/:id` - Delete category

### Health
- `GET /api/v1/health` - Health check

## 🗄️ Database

### MongoDB (Primary)
The application uses MongoDB as the primary database with Mongoose ODM.

**Models:**
- Events
- Categories

**Indexes:**
- `events`: `{ date: 1, categoryId: 1 }`
- `events`: Text index on `title` and `description`
- `categories`: `{ name: 1 }` (unique)

### PostgreSQL (Optional)
PostgreSQL support is included via Sequelize. Uncomment in `server.ts` to enable.

## 🔐 Security

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevents abuse
- **Input Validation** - express-validator
- **Error Handling** - Centralized error middleware

## 📝 Logging

Winston logger with multiple transports:
- Console (formatted)
- File (`logs/app.log`)
- Error file (`logs/error.log`)
- Exception file (`logs/exceptions.log`)

Log levels: error, warn, info, debug

## 🔌 Socket.IO

Real-time updates for:
- Event created
- Event updated
- Event deleted

Clients can join the `calendar` room to receive updates.

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🐳 Docker

```bash
# Build Docker image
docker build -t event-calendar-backend .

# Run container
docker run -p 5000:5000 --env-file .env event-calendar-backend
```

## 🔧 Environment Variables

```env
NODE_ENV=development
PORT=5000
API_VERSION=v1

MONGODB_URI=mongodb://localhost:27017/event_calendar
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=event_calendar
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

LOG_LEVEL=info
SOCKET_CORS_ORIGIN=http://localhost:3000
```

## 📖 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

### Validation Error
```json
{
  "success": false,
  "error": "Validation failed",
  "data": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ]
}
```

## 🔄 Path Aliases

TypeScript path aliases configured:
- `@config/*` → `src/config/*`
- `@controllers/*` → `src/controllers/*`
- `@middleware/*` → `src/middleware/*`
- `@models/*` → `src/models/*`
- `@routes/*` → `src/routes/*`
- `@services/*` → `src/services/*`
- `@types/*` → `src/types/*`
- `@utils/*` → `src/utils/*`
- `@validators/*` → `src/validators/*`

## 🛠️ Scripts

- `npm run dev` - Start development server
- `npm run build` - Build TypeScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix lint issues
- `npm test` - Run tests

## 📦 Dependencies

### Production
- express
- mongoose
- sequelize & pg
- socket.io
- cors
- helmet
- compression
- morgan
- winston
- dotenv
- bcryptjs
- jsonwebtoken
- express-validator

### Development
- typescript
- ts-node
- nodemon
- @types packages
- eslint
- jest

## 🚦 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## 💡 Best Practices

1. **Controllers** - Handle HTTP requests/responses only
2. **Services** - Business logic (future implementation)
3. **Models** - Database schema and validation
4. **Validators** - Input validation rules
5. **Middleware** - Request/response transformation
6. **Types** - Shared TypeScript interfaces

## 🔜 Future Enhancements

- [ ] User authentication
- [ ] Role-based access control
- [ ] Event reminders
- [ ] Email notifications
- [ ] File uploads
- [ ] Event recurrence
- [ ] Calendar sharing
- [ ] WebSocket improvements
- [ ] Caching with Redis
- [ ] GraphQL API

---

For questions or issues, please open an issue on GitHub.
