"use client";

import { useState } from "react";
import { DayEventsDialog } from "@/components/day-events-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Event } from "@/app/page";

interface CalendarProps {
  events: Event[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onDateDoubleClick: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

const eventTypeColors = {
  formula1: "bg-red-600 text-white",
  motogp: "bg-orange-600 text-white",
  wec: "bg-blue-600 text-white",
  rally: "bg-green-600 text-white",
  nascar: "bg-yellow-500 text-white",
  indycar: "bg-blue-900 text-white",
  formulae: "bg-cyan-500 text-white",
  other: "bg-gray-500 text-white",
};

const typeToColorKey: Record<Event["type"], keyof typeof eventTypeColors> = {
  "Formula 1": "formula1",
  MotoGP: "motogp",
  WEC: "wec",
  Rally: "rally",
  NASCAR: "nascar",
  IndyCar: "indycar",
  "Formula E": "formulae",
};

export function Calendar({
  events,
  selectedDate,
  onDateSelect,
  onDateDoubleClick,
  onEventClick,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDayDialogOpen, setIsDayDialogOpen] = useState(false);

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7; // Monday as 0
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  const renderCalendarDays = () => {
    const days = [];

    // Previous month's trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(
        <div
          key={`prev-${date.getDate()}`}
          className="p-2 text-muted-foreground"
        >
          <span className="text-sm">{date.getDate()}</span>
        </div>
      );
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const hasRace = dayEvents.some((ev) => ev.sessionType === "Race");

      days.push(
        <Card
          key={day}
          className={cn(
            "p-2 cursor-pointer hover:bg-accent/50 transition-colors min-h-[100px]",
            isSelected(date) && "ring-2 ring-primary",
            isToday(date) && "bg-primary/10"
          )}
          style={
            hasRace
              ? {
                  backgroundColor: "#fff",
                  backgroundImage:
                    "linear-gradient(45deg, rgba(0,0,0,0.08) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,0.08) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.08) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.08) 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                }
              : undefined
          }
          onClick={() => {
            onDateSelect(date);
            setIsDayDialogOpen(true);
          }}
          onDoubleClick={() => onDateDoubleClick(date)}
        >
          <div className="flex items-center justify-between mb-2">
            <span
              className={cn(
                "text-sm font-medium",
                isToday(date) && "text-primary font-bold"
              )}
            >
              {day}
            </span>
            {dayEvents.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onDateDoubleClick(date);
                }}
              >
                <Plus className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <Badge
                key={event.id}
                className={cn(
                  "text-xs px-2 py-0.5 cursor-pointer truncate block",
                  eventTypeColors[typeToColorKey[event.type]]
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
              >
                {event.time} – {event.title}
              </Badge>
            ))}
            {dayEvents.length > 2 && (
              <Badge variant="secondary" className="text-xs">
                +{dayEvents.length - 2} more
              </Badge>
            )}
          </div>
        </Card>
      );
    }

    return days;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const now = new Date();
              setCurrentDate(now);
              onDateSelect(now);
            }}
          >
            Today
          </Button>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4">
        {dayNames.map((day) => (
          <div
            key={day}
            className="p-2 text-center font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
      <DayEventsDialog
        isOpen={isDayDialogOpen}
        onClose={() => setIsDayDialogOpen(false)}
        date={selectedDate}
        events={getEventsForDate(selectedDate)}
        onAddEvent={(d) => onDateDoubleClick(d)}
        onEventClick={onEventClick}
      />
    </div>
  );
}
