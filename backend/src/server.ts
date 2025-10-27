import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createServer } from 'http';
import { connectMongoDB, closeConnections } from '@config/database';
import { corsOptions } from '@config/cors';
import { logger } from '@config/logger';
import { errorHandler, notFound } from '@middleware/errorHandler';
import { rateLimiter } from '@middleware/rateLimiter';
import { initializeSocket } from '@socket/index';
import routes from '@routes/index';

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
export const io = initializeSocket(httpServer);

// Middleware
app.use(helmet()); // Security headers
app.use(cors(corsOptions)); // CORS
app.use(compression()); // Gzip compression
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }));
}

// Rate limiting
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000');
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
app.use(rateLimiter(windowMs, maxRequests));

// API Routes
app.use(`/api/${process.env.API_VERSION || 'v1'}`, routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to databases
    await connectMongoDB();
    // await connectPostgreSQL(); // Uncomment if using PostgreSQL

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT}`);
      logger.info(`📍 Environment: ${process.env.NODE_ENV}`);
      logger.info(`🔌 Socket.IO initialized`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = async () => {
  logger.info('Shutting down gracefully...');

  httpServer.close(() => {
    logger.info('HTTP server closed');
  });

  await closeConnections();
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start the server
startServer();
