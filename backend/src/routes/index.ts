import { Router } from 'express';
import eventRoutes from './event.routes';
import categoryRoutes from './category.routes';

const router = Router();

// API Routes
router.use('/events', eventRoutes);
router.use('/categories', categoryRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
