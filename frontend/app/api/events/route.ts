import { NextRequest, NextResponse } from 'next/server';
import type { Event, CreateEventInput, ApiResponse } from '@/types';

// This is a mock implementation. Replace with actual database operations.
// For now, we'll use in-memory storage (will be lost on server restart)
let events: Event[] = [];

/**
 * GET /api/events
 * Retrieve all events or filter by query parameters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let filteredEvents = [...events];

    // Filter by category
    if (categoryId) {
      filteredEvents = filteredEvents.filter(
        (event) => event.categoryId === categoryId
      );
    }

    // Filter by date range
    if (startDate) {
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filteredEvents = filteredEvents.filter(
        (event) => new Date(event.date) <= new Date(endDate)
      );
    }

    const response: ApiResponse<Event[]> = {
      data: filteredEvents,
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to fetch events',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * POST /api/events
 * Create a new event
 */
export async function POST(request: NextRequest) {
  try {
    const body: CreateEventInput = await request.json();

    // Validate required fields
    if (!body.title || !body.date || !body.categoryId) {
      const response: ApiResponse<null> = {
        error: 'Missing required fields: title, date, categoryId',
        success: false,
      };
      return NextResponse.json(response, { status: 400 });
    }

    const newEvent: Event = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    events.push(newEvent);

    const response: ApiResponse<Event> = {
      data: newEvent,
      message: 'Event created successfully',
      success: true,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to create event',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
