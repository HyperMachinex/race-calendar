import { Router } from 'express';
import { EventController } from '@controllers/event.controller';
import { validateEvent, validateEventUpdate } from '@validators/event.validator';
import { validate } from '@middleware/validate';

const router = Router();
const eventController = new EventController();

/**
 * @route   GET /api/v1/events
 * @desc    Get all events with filters
 * @access  Public
 */
router.get('/', eventController.getEvents);

/**
 * @route   GET /api/v1/events/:id
 * @desc    Get event by ID
 * @access  Public
 */
router.get('/:id', eventController.getEventById);

/**
 * @route   POST /api/v1/events
 * @desc    Create new event
 * @access  Public
 */
router.post('/', validate(validateEvent), eventController.createEvent);

/**
 * @route   PATCH /api/v1/events/:id
 * @desc    Update event
 * @access  Public
 */
router.patch('/:id', validate(validateEventUpdate), eventController.updateEvent);

/**
 * @route   DELETE /api/v1/events/:id
 * @desc    Delete event
 * @access  Public
 */
router.delete('/:id', eventController.deleteEvent);

export default router;
