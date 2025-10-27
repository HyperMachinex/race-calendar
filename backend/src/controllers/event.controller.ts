import { Request, Response } from 'express';
import { EventModel } from '@models/event.mongo';
import { ApiResponse, EventQuery } from '@types';
import { logger } from '@config/logger';

export class EventController {
  // Get all events with filters
  async getEvents(req: Request<{}, {}, {}, EventQuery>, res: Response<ApiResponse>) {
    try {
      const { categoryId, startDate, endDate, search, page = 1, limit = 20 } = req.query;

      const query: any = {};

      if (categoryId) {
        query.categoryId = categoryId;
      }

      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate);
        if (endDate) query.date.$lte = new Date(endDate);
      }

      if (search) {
        query.$text = { $search: search };
      }

      const skip = (Number(page) - 1) * Number(limit);
      const events = await EventModel.find(query)
        .sort({ date: 1, startTime: 1 })
        .skip(skip)
        .limit(Number(limit));

      const total = await EventModel.countDocuments(query);

      res.json({
        success: true,
        data: events,
      });
    } catch (error) {
      logger.error('Error fetching events:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch events',
      });
    }
  }

  // Get event by ID
  async getEventById(req: Request, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;
      const event = await EventModel.findById(id);

      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Event not found',
        });
      }

      res.json({
        success: true,
        data: event,
      });
    } catch (error) {
      logger.error('Error fetching event:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch event',
      });
    }
  }

  // Create new event
  async createEvent(req: Request, res: Response<ApiResponse>) {
    try {
      const event = await EventModel.create(req.body);

      res.status(201).json({
        success: true,
        data: event,
        message: 'Event created successfully',
      });
    } catch (error: any) {
      logger.error('Error creating event:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to create event',
      });
    }
  }

  // Update event
  async updateEvent(req: Request, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;
      const event = await EventModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Event not found',
        });
      }

      res.json({
        success: true,
        data: event,
        message: 'Event updated successfully',
      });
    } catch (error: any) {
      logger.error('Error updating event:', error);
      res.status(400).json({
        success: false,
        error: error.message || 'Failed to update event',
      });
    }
  }

  // Delete event
  async deleteEvent(req: Request, res: Response<ApiResponse>) {
    try {
      const { id } = req.params;
      const event = await EventModel.findByIdAndDelete(id);

      if (!event) {
        return res.status(404).json({
          success: false,
          error: 'Event not found',
        });
      }

      res.json({
        success: true,
        message: 'Event deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting event:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to delete event',
      });
    }
  }
}
