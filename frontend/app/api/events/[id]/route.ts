import { NextRequest, NextResponse } from 'next/server';
import type { Event, UpdateEventInput, ApiResponse } from '@/types';

// Mock in-memory storage (shared with events/route.ts)
// In production, replace with actual database
let events: Event[] = [];

/**
 * GET /api/events/[id]
 * Retrieve a specific event by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const event = events.find((e) => e.id === params.id);

    if (!event) {
      const response: ApiResponse<null> = {
        error: 'Event not found',
        success: false,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<Event> = {
      data: event,
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to fetch event',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * PATCH /api/events/[id]
 * Update an existing event
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: Partial<UpdateEventInput> = await request.json();
    const eventIndex = events.findIndex((e) => e.id === params.id);

    if (eventIndex === -1) {
      const response: ApiResponse<null> = {
        error: 'Event not found',
        success: false,
      };
      return NextResponse.json(response, { status: 404 });
    }

    const updatedEvent: Event = {
      ...events[eventIndex],
      ...body,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    events[eventIndex] = updatedEvent;

    const response: ApiResponse<Event> = {
      data: updatedEvent,
      message: 'Event updated successfully',
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to update event',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}

/**
 * DELETE /api/events/[id]
 * Delete an event
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventIndex = events.findIndex((e) => e.id === params.id);

    if (eventIndex === -1) {
      const response: ApiResponse<null> = {
        error: 'Event not found',
        success: false,
      };
      return NextResponse.json(response, { status: 404 });
    }

    events.splice(eventIndex, 1);

    const response: ApiResponse<null> = {
      message: 'Event deleted successfully',
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      error: 'Failed to delete event',
      success: false,
    };
    return NextResponse.json(response, { status: 500 });
  }
}
