import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { logger } from '@config/logger';

export const initializeSocket = (httpServer: HttpServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    // Join event room for real-time updates
    socket.on('join:calendar', () => {
      socket.join('calendar');
      logger.info(`Client ${socket.id} joined calendar room`);
    });

    // Leave event room
    socket.on('leave:calendar', () => {
      socket.leave('calendar');
      logger.info(`Client ${socket.id} left calendar room`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Emit event updates to all connected clients
export const emitEventUpdate = (io: SocketIOServer, event: string, data: any) => {
  io.to('calendar').emit(event, data);
  logger.debug(`Emitted ${event} to calendar room`, data);
};
