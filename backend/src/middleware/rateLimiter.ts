import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

export const rateLimiter = (
  windowMs: number = 15 * 60 * 1000, // 15 minutes
  max: number = 100 // limit each IP to 100 requests per windowMs
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // Clean up expired entries
    Object.keys(store).forEach((key) => {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    });

    if (!store[ip]) {
      store[ip] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return next();
    }

    if (store[ip].resetTime < now) {
      store[ip] = {
        count: 1,
        resetTime: now + windowMs,
      };
      return next();
    }

    store[ip].count++;

    if (store[ip].count > max) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests, please try again later',
      });
    }

    next();
  };
};
