import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import { logger } from './logger';

// MongoDB Connection
export const connectMongoDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/event_calendar';

    await mongoose.connect(mongoUri);

    logger.info('MongoDB connected successfully');

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });
  } catch (error) {
    logger.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

// PostgreSQL Connection
export const sequelize = new Sequelize({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'event_calendar',
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? (msg) => logger.debug(msg) : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const connectPostgreSQL = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('PostgreSQL connected successfully');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      logger.info('PostgreSQL models synchronized');
    }
  } catch (error) {
    logger.error('Failed to connect to PostgreSQL:', error);
    process.exit(1);
  }
};

// Close connections gracefully
export const closeConnections = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    await sequelize.close();
    logger.info('Database connections closed');
  } catch (error) {
    logger.error('Error closing database connections:', error);
  }
};
