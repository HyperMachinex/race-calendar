"use client";

import { useState } from "react";
import { Calendar } from "@/components/calendar";
import { Sidebar } from "@/components/sidebar";
import { EventDialog } from "@/components/event-dialog";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
  type: "Formula 1" | "MotoGP" | "WEC" | "WRC";
  sessionType: "Race" | "Practice" | "Qualify" | "Sprint";
}

export default function EventCalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleAddEvent = (event: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, newEvent]);
    setIsEventDialogOpen(false);
  };

  const handleEditEvent = (event: Event) => {
    setEvents((prev) => prev.map((e) => (e.id === event.id ? event : e)));
    setEditingEvent(null);
    setIsEventDialogOpen(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setIsEventDialogOpen(false);
    setEditingEvent(null);
  };

  const openEventDialog = (date?: Date) => {
    if (date) setSelectedDate(date);
    setIsEventDialogOpen(true);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setIsEventDialogOpen(true);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        events={events}
        onEventClick={openEditDialog}
      />

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className=""
                aria-label={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">
                Race Calendar
              </h1>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          <Calendar
            events={events}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onDateDoubleClick={openEventDialog}
            onEventClick={openEditDialog}
          />
        </div>
      </main>

      <EventDialog
        isOpen={isEventDialogOpen}
        onClose={() => {
          setIsEventDialogOpen(false);
          setEditingEvent(null);
        }}
        onSave={(e) => ("id" in e ? handleEditEvent(e) : handleAddEvent(e))}
        onDelete={
          editingEvent ? () => handleDeleteEvent(editingEvent.id) : undefined
        }
        event={editingEvent}
        selectedDate={selectedDate}
      />
    </div>
  );
}
